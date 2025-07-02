import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ephy',
      password: 'ephy@123',
      database: 'blog',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
