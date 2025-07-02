import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../domain/entities/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  create(data: Partial<Comment>) {
    const comment = this.repo.create(data);
    return this.repo.save(comment);
  }

  findByPostId(postId: number) {
    return this.repo.find({
      where: { post: { id: postId } },
      relations: ['author', 'post'],
    });
  }

  async findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['author', 'post'],
    });
  }

  async save(comment: Comment) {
    return this.repo.save(comment);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
