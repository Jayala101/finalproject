import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { NotificationTemplate } from './schemas/notification-template.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
    @InjectModel(NotificationTemplate.name) private readonly notificationTemplateModel: Model<NotificationTemplate>,
  ) {}

  // Service methods will be implemented later
}
