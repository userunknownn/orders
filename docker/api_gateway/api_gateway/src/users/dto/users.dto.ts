import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class GetUserResponse {
  id?: number;
  first_name?: string;
  last_name?: string;
  document?: string;
  email?: string;
  phone_number?: string;
  birth_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class GetUsersResponse extends Array<GetUserResponse> {}

export class CreateUserRequest {
  @ApiProperty({
    description: 'O primeiro nome de alguém',
    example: 'Carlos',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'O último nome de alguém',
    example: 'Lopes',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Um documento',
    example: 'RG: 44.847.166-8',
  })
  @IsString()
  document: string;

  @ApiProperty({
    description: 'O email do usuário',
    example: 'carloslopes@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'O número do celular',
    example: '(88) 996051210',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Data de nascimento no formato ano-mês-dia',
    example: '1990-05-15',
  })
  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}
export class CreateUserResponse {
  id?: number;
  first_name?: string;
  last_name?: string;
  document?: string;
  email?: string;
  phone_number?: string;
  birth_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}
export class DeleteUserResponse {
  id?: number;
  first_name?: string;
  last_name?: string;
  document?: string;
  email?: string;
  phone_number?: string;
  birth_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}
export class UpdateUserRequest {
  @ApiProperty({
    description: 'O primeiro nome de alguém',
    example: 'Carlos',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'O último nome de alguém',
    example: 'Farias',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: 'Um documento',
    example: 'RG: 44.847.166-8',
    required: false,
  })
  document?: string;

  @ApiProperty({
    description: 'O email do usuário',
    example: 'carloslopes@gmail.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'O número do celular',
    example: '(88) 996058080',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Data de nascimento no formato ano-mês-dia',
    example: '1990-05-15',
    required: false,
  })
  birthDate?: Date;
}
export class UpdateUserResponse {
  id?: number;
  first_name?: string;
  last_name?: string;
  document?: string;
  email?: string;
  phone_number?: string;
  birth_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}
