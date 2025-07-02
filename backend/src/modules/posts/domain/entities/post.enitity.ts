import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/users.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;
  @Column('text', { array: true, nullable: true })
  imageUrls?: string[];

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}
