import { Module } from '@nestjs/common';
// import { HttpService } from 'src/services/http.service';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
