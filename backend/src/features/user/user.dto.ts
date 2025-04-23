import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com', description: 'The email' })
  email!: string;

  @ApiProperty({ example: 'pass1234', description: 'The password' })
  password!: string;

  @ApiProperty({ example: 'John Doe', description: 'The name' })
  name!: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'john@example.com', description: 'The email' })
  email!: string;

  @ApiProperty({
    example: { old: 'oldPass123', new: 'newPass456' },
    description: 'The object with old and new passwords',
  })
  password!: {
    old: string;
    new: string;
  };

  @ApiProperty({ example: 'John Doe', description: 'The name' })
  name!: string;
}