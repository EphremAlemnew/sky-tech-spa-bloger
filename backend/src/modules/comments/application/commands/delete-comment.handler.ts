import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommentsRepository } from '../../infrastructure/comments.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class DeleteCommentCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: number,
  ) {}
}

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  constructor(private readonly repo: CommentsRepository) {}

  async execute(command: DeleteCommentCommand) {
    const comment = await this.repo.findById(Number(command.id));
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.author.id !== command.userId)
      throw new ForbiddenException('Not authorized');

    await this.repo.delete(Number(command.id));
    return { message: 'Comment deleted' };
  }
}
