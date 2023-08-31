import {
  Injectable,
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './dto/users.dto';
import { UserIdentification } from './types/user-identification.type';
import { UsersService } from './users.service';

@Injectable()
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getUsers(): Promise<GetUsersResponse> {
    return this.service.getUsers();
  }

  @Get(':id')
  getUser(@Param() id: UserIdentification): Promise<GetUserResponse> {
    return this.service.getUser(id);
  }

  @Post()
  createUser(@Body() request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.service.createUser(request);
  }

  @Delete(':id')
  deleteUser(@Param() id: UserIdentification): Promise<DeleteUserResponse> {
    return this.service.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param() id: UserIdentification,
    @Body() request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    return this.service.updateUser(id, request);
  }
}
