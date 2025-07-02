import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {
  @ApiProperty({
    example: 'Nice post!',
    description: 'The content of the comment',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: '2',
    description: 'ID of the post being commented on',
  })
  @IsString()
  postId: string;
}
