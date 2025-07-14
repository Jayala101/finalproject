export class NotificationResponseDto {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type?: string;
  data?: Record<string, any>;
  sentAt: Date;
  expiresAt?: Date;

  constructor(notification: any) {
    this.id = notification._id?.toString() || notification.id;
    this.userId = notification.userId;
    this.title = notification.title;
    this.message = notification.message;
    this.read = notification.read || false;
    this.type = notification.type;
    this.data = notification.data;
    this.sentAt = notification.sentAt;
    this.expiresAt = notification.expiresAt;
  }
}
