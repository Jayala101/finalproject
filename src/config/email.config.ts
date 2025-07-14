import { ConfigService } from '@nestjs/config';

export const getEmailConfig = (configService: ConfigService) => ({
  mailService: configService.get<string>('MAIL_SERVICE', 'gmail'),
  mailUser: configService.get<string>('MAIL_USER', ''),
  mailPassword: configService.get<string>('MAIL_PASS', ''),
  mailFrom: configService.get<string>('MAIL_FROM', 'noreply@example.com'),
  sendgridApiKey: configService.get<string>('SENDGRID_API_KEY', ''),
  sendgridSender: configService.get<string>('SENDGRID_SENDER', 'noreply@example.com'),
});
