import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserBehaviorService } from './/user-behavior.service';

@Controller('user-behavior')
export class UserBehaviorController {
  constructor(private readonly userBehaviorService: UserBehaviorService) {}

  // Endpoints will be implemented later
}
