import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getPostgresConfig, getMongoConfig } from '../config/database.config';

export class DatabaseProvider {
  static getPostgresOptions(config: ConfigService): TypeOrmModuleOptions {
    return getPostgresConfig(config);
  }

  static getMongoOptions(config: ConfigService): MongooseModuleOptions {
    return getMongoConfig(config);
  }
}
