import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './domain/entities/post.enitity';
import { PostsRepository } from './infrastructure/posts.repository';
import { PostsController } from './posts.controller';
import { CqrsModule } from '@nestjs/cqrs';

// Import all your command and query handlers:
import { CreatePostHandler } from './application/commands/create-post.handler';
import { UpdatePostHandler } from './application/commands/update-post.handler';
import { DeletePostHandler } from './application/commands/delete-post.handler';
import { GetPostsHandler } from './application/queries/get-posts.handler';
import { GetPostByIdHandler } from './application/queries/get-post-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CqrsModule],
  controllers: [PostsController],
  providers: [
    PostsRepository,
    CreatePostHandler,
    UpdatePostHandler,
    DeletePostHandler,
    GetPostsHandler,
    GetPostByIdHandler,
  ],
})
export class PostsModule {}
