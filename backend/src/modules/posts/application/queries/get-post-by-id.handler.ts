import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../infrastructure/posts.repository';
import { NotFoundException } from '@nestjs/common';

export class GetPostByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(private readonly repo: PostsRepository) {}

  async execute(query: GetPostByIdQuery) {
    const postId = Number(query.id);
    const post = await this.repo.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }
}
