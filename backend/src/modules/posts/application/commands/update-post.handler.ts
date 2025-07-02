import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostDto } from '../../dto/update-post.dto';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class UpdatePostCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdatePostDto,
    public readonly userId: number,
  ) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(private readonly repo: PostsRepository) {}

  async execute(command: UpdatePostCommand) {
    const postId = Number(command.id);
    const post = await this.repo.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (post.author.id !== command.userId)
      throw new ForbiddenException('Not authorized');

    Object.assign(post, command.dto);
    return this.repo.save(post);
  }
}
