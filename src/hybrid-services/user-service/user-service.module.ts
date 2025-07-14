import { Module } from '@nestjs/common';
import { UsersModule } from '../../postgres-modules/users/users.module';
import { UserBehaviorModule } from '../../mongo-modules/user-behavior/user-behavior.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    UsersModule, // PostgreSQL users module
    UserBehaviorModule, // MongoDB user behavior module
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}
