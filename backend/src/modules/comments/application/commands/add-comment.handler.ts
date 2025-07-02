import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { AddCommentDto } from '../../dto/add-comment.dto';
import { CommentsRepository } from '../../infrastructure/comments.repository';
import { User } from 'src/modules/users/entities/users.entity';
import { Post } from 'src/modules/posts/domain/entities/post.enitity';
export class AddCommentCommand implements ICommand {
  constructor(
    public readonly dto: AddCommentDto,
    public readonly authorId: string, // ✅ pass it separately
  ) {}
}

@CommandHandler(AddCommentCommand)
export class AddCommentHandler implements ICommandHandler<AddCommentCommand> {
  constructor(private repo: CommentsRepository) {}

  async execute(command: AddCommentCommand) {
    const { content, postId } = command.dto;

    const user = new User();
    user.id = Number(command.authorId); // ✅ Use from command, not dto

    const post = new Post();
    post.id = Number(postId);

    return this.repo.create({
      content,
      author: user,
      post: post,
    });
  }
}
