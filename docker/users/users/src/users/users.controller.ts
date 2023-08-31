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
import { ApiParam, ApiTags } from '@nestjs/swagger';
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
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getUsers(): Promise<GetUsersResponse> {
    return this.service.getUsers();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  getUser(@Param() id: UserIdentification): Promise<GetUserResponse> {
    return this.service.getUser(id);
  }

  @Post()
  createUser(@Body() request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.service.createUser(request);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  deleteUser(@Param() id: UserIdentification): Promise<DeleteUserResponse> {
    return this.service.deleteUser(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  updateUser(
    @Param() id: UserIdentification,
    @Body() request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    return this.service.updateUser(id, request);
  }
}
