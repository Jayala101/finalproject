import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getPostgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get('DB_USER', 'postgres'),
  password: configService.get('DB_PASS', 'postgres'),
  database: configService.get('DB_NAME', 'nestjs_blog'),
  ssl: configService.get<boolean>('DB_SSL', false) ? { rejectUnauthorized: false } : false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get<boolean>('DB_SYNC', false),
  logging: configService.get<boolean>('DB_LOGGING', false),
});

export const getMongoConfig = (configService: ConfigService) => ({
  uri: configService.get<string>(
    'MONGO_URI',
    'mongodb://localhost:27017/nestjs_blog',
  ),
});
