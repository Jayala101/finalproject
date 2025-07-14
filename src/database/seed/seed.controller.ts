import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('all')
  async seedAll() {
    return this.seedService.seedAll();
  }

  @Post('postgres')
  async seedPostgres() {
    return this.seedService.seedPostgres();
  }

  @Post('mongo')
  async seedMongo() {
    return this.seedService.seedMongo();
  }
}
