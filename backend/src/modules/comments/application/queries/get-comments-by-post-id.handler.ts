import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommentsRepository } from '../../infrastructure/comments.repository';

export class GetCommentsByPostIdQuery implements IQuery {
  constructor(public readonly postId: number) {}
}

@QueryHandler(GetCommentsByPostIdQuery)
export class GetCommentsByPostIdHandler
  implements IQueryHandler<GetCommentsByPostIdQuery>
{
  constructor(private repo: CommentsRepository) {}

  execute(query: GetCommentsByPostIdQuery) {
    return this.repo.findByPostId(query.postId);
  }
}
