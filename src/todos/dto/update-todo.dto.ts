import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatus } from '@prisma/client';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  status: TodoStatus;
}
