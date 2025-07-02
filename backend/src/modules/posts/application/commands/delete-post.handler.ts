import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class DeletePostCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: number,
  ) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(private readonly repo: PostsRepository) {}

  async execute(command: DeletePostCommand) {
    const postId = Number(command.id);
    const post = await this.repo.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (post.author.id !== command.userId)
      throw new ForbiddenException('Not authorized');

    await this.repo.delete(postId);
    return { message: 'Post deleted' };
  }
}
