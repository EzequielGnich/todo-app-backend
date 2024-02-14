import { TodoStatus } from '@prisma/client';

export class Todo {
  id: string;
  title: string;
  content: string;
  userId: string;
  status: TodoStatus;
}
