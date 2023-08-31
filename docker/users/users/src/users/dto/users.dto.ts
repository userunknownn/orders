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
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  document: string;
  @IsString()
  email: string;
  @IsString()
  phoneNumber: string;
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
  firstName?: string;
  lastName?: string;
  document?: string;
  email?: string;
  phoneNumber?: string;
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
