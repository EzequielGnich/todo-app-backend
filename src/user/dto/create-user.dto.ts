import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  @ApiProperty({
    example: 'jhondoe@email.com',
    description:
      'The email will be used for anything (Profile, Home Page, etc.) that needs to display information about the connected person.'
  })
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters'
  })
  @MaxLength(20, {
    message: 'Password must be less than 20'
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak'
  })
  @ApiProperty({
    example: 'abc@1234',
    description: 'The password will be used for login in the system.'
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'Jhon Doe',
    description:
      'The name will be used for anything (Profile, Home Page, etc.) that needs to display information about the connected person.'
  })
  name: string;
}
