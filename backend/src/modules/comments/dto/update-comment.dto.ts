import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiPropertyOptional({ example: 'Updated comment text' })
  @IsOptional()
  @IsString()
  content?: string;
}
