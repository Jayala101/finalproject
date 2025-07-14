import { ConfigService } from '@nestjs/config';

export const getAppConfig = (configService: ConfigService) => ({
  port: configService.get<number>('PORT', 3030),
  environment: configService.get<string>('NODE_ENV', 'development'),
  apiPrefix: configService.get<string>('API_PREFIX', 'api'),
  jwtSecret: configService.get<string>('JWT_SECRET', 'secret'),
  jwtExpiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
  corsOrigin: configService.get<string>('CORS_ORIGIN', '*'),
});
