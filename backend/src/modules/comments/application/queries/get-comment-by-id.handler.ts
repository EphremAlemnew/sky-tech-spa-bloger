import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommentsRepository } from '../../infrastructure/comments.repository';
import { NotFoundException } from '@nestjs/common';

export class GetCommentByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetCommentByIdQuery)
export class GetCommentByIdHandler
  implements IQueryHandler<GetCommentByIdQuery>
{
  constructor(private readonly repo: CommentsRepository) {}

  async execute(query: GetCommentByIdQuery) {
    const comment = await this.repo.findById(Number(query.id));
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }
}
