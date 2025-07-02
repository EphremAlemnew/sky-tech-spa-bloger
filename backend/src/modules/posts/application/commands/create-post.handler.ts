import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { CreatePostDto } from '../../dto/create-post.dto';
import { User } from 'src/modules/users/entities/users.entity';

export class CreatePostCommand implements ICommand {
  constructor(
    public readonly dto: CreatePostDto,
    public readonly authorId: number,
    public readonly imageUrls: string[] = [],
  ) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private repo: PostsRepository) {}

  async execute(command: CreatePostCommand) {
    const { title, content, imageUrls } = command.dto;

    const author = new User();
    author.id = command.authorId;

    return this.repo.create({
      title,
      content,
      author,
      imageUrls,
    });
  }
}
