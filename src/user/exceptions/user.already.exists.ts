import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsError extends HttpException {
  constructor(message: string) {
    super(
      {
        message,
        status: HttpStatus.CONFLICT
      },
      HttpStatus.CONFLICT
    );
  }
}
