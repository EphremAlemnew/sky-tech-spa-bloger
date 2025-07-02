import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { AddCommentCommand } from './application/commands/add-comment.handler';
import { UpdateCommentCommand } from './application/commands/update-comment.handler';
import { DeleteCommentCommand } from './application/commands/delete-comment.handler';

import { GetCommentsByPostIdQuery } from './application/queries/get-comments-by-post-id.handler';
import { GetCommentByIdQuery } from './application/queries/get-comment-by-id.handler';

@ApiTags('Comments')
@Controller('comments')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommentsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: AddCommentDto, @Request() req) {
    // Inject authorId from JWT user
    return this.commandBus.execute(
      new AddCommentCommand({ ...dto, authorId: req.user.id }),
    );
  }

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    return this.queryBus.execute(new GetCommentsByPostIdQuery(Number(postId)));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.queryBus.execute(new GetCommentByIdQuery(id));
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Request() req,
  ) {
    return this.commandBus.execute(
      new UpdateCommentCommand(id, dto, req.user.id),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.commandBus.execute(new DeleteCommentCommand(id, req.user.id));
  }
}
