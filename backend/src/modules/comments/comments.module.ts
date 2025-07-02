import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Comment } from './domain/entities/comment.entity';
import { CommentsRepository } from './infrastructure/comments.repository';
import { CommentsController } from './comments.controller';

import { AddCommentHandler } from './application/commands/add-comment.handler';
import { UpdateCommentHandler } from './application/commands/update-comment.handler';
import { DeleteCommentHandler } from './application/commands/delete-comment.handler';

import { GetCommentsByPostIdHandler } from './application/queries/get-comments-by-post-id.handler';
import { GetCommentByIdHandler } from './application/queries/get-comment-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentsController],
  providers: [
    CommentsRepository,
    AddCommentHandler,
    UpdateCommentHandler,
    DeleteCommentHandler,
    GetCommentsByPostIdHandler,
    GetCommentByIdHandler,
  ],
})
export class CommentsModule {}
