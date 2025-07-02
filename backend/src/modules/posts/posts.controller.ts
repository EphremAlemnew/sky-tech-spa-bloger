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
  UnauthorizedException,
  UploadedFiles,
  UseInterceptors,
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

import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Posts')
@Controller('posts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PostsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  // CREATE POST with optional images
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req,
  ) {
    const userId = req.user.id;
    // Map files to relative URLs
    const imageUrls = files?.map((file) => `/upload/${file.filename}`) || [];
    // Add imageUrls to dto or pass separately
    dto.imageUrls = imageUrls.length > 0 ? imageUrls : undefined;

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
    return this.commandBus.execute(new UpdatePostCommand(id, dto, req.user.id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.commandBus.execute(new DeletePostCommand(id, req.user.id));
  }
}
