import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentDto } from '../../dto/update-comment.dto';
import { CommentsRepository } from '../../infrastructure/comments.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class UpdateCommentCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateCommentDto,
    public readonly userId: number,
  ) {}
}

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  constructor(private readonly repo: CommentsRepository) {}

  async execute(command: UpdateCommentCommand) {
    const comment = await this.repo.findById(Number(command.id));
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.author.id !== command.userId)
      throw new ForbiddenException('Not authorized');

    Object.assign(comment, command.dto);
    return this.repo.save(comment);
  }
}
