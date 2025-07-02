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
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { CreatePostCommand } from './application/commands/create-post.handler';
import { UpdatePostCommand } from './application/commands/update-post.handler';

import { DeletePostCommand } from './application/commands/delete-post.handler';
import { GetPostsQuery } from './application/queries/get-posts.handler';
import { GetPostByIdQuery } from './application/queries/get-post-by-id.handler';

@ApiTags('Posts')
@Controller('posts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PostsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async create(@Body() dto: CreatePostDto, @Request() req) {
    const userId = req?.user?.id;
    console.log(req.user);
    if (!userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    return this.commandBus.execute(new CreatePostCommand(dto, userId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetPostsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.queryBus.execute(new GetPostByIdQuery(id));
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Request() req,
  ) {
    // Pass userId for ownership check inside handler
    return this.commandBus.execute(new UpdatePostCommand(id, dto, req.user.id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.commandBus.execute(new DeletePostCommand(id, req.user.id));
  }
}
