import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../infrastructure/posts.repository';

export class GetPostsQuery implements IQuery {}

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(private readonly repo: PostsRepository) {}

  execute() {
    return this.repo.findAll();
  }
}
