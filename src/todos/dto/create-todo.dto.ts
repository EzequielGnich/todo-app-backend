import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength } from 'class-validator';
import { Todo } from '../entities/todo.entity';

export class CreateTodoDto extends Todo {
  @ApiProperty({
    example: 'Todo 1',
    description: 'This is the title of the todo.'
  })
  @IsString()
  title: string;

  @IsString()
  @MaxLength(244, {
    message: 'Content must be less than 244'
  })
  @ApiProperty({
    example: 'Content of the todo',
    description: 'This is the content of the todo.'
  })
  content: string;

  @IsUUID()
  @ApiProperty({
    example: '1',
    description: 'This is the id of the user that owns the todo.'
  })
  userId: string;
}
