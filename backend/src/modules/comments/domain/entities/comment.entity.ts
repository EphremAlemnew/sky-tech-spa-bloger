import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/modules/users/entities/users.entity';
import { Post } from 'src/modules/posts/domain/entities/post.enitity';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
