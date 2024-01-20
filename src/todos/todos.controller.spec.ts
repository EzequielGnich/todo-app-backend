import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

let userController: TodosController;
describe('UsersController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      controllers: [TodosController],
      providers: [TodosService],
      exports: [TodosService]
    }).compile();

    userController = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
