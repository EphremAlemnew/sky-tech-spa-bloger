import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../domain/entities/post.enitity';

@Injectable()
export class PostsRepository {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(data: Partial<Post>) {
    console.log('Creating post with data:', data);
    const post = this.repo.create(data);
    return this.repo.save(post);
  }

  async findAll() {
    const posts = await this.repo.find({ relations: ['author'] });

    return posts.map((post) => ({
      ...post,
      author: {
        id: post.author.id,
        name: post.author.name,
        email: post.author.email,
      },
    }));
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['author'] });
  }

  update(id: number, data: Partial<Post>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  save(post: Post) {
    return this.repo.save(post); // ✅ This fixes your error
  }
}
