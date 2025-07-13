import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SessionDataService } from './session-data.service';

@Controller('session-data')
export class SessionDataController {
  constructor(private readonly sessionDataService: SessionDataService) {}

  // Endpoints will be implemented later
}
