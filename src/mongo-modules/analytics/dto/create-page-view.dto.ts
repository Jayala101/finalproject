import { IsString, IsNotEmpty, IsOptional, IsDate, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePageViewDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  sessionId?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  timestamp?: Date;

  @IsString()
  @IsOptional()
  referrer?: string;

  @IsString()
  @IsOptional()
  deviceType?: string;

  @IsString()
  @IsOptional()
  browser?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  duration?: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  // CRUD Methods
  static create(data: Partial<CreatePageViewDto>): CreatePageViewDto {
    const pageView = new CreatePageViewDto();
    Object.assign(pageView, {
      timestamp: new Date(),
      duration: 0,
      ...data
    });
    return pageView;
  }

  toObject(): Record<string, any> {
    return {
      url: this.url,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: this.timestamp || new Date(),
      referrer: this.referrer,
      deviceType: this.deviceType,
      browser: this.browser,
      duration: this.duration || 0,
      country: this.country,
      ipAddress: this.ipAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  updateDuration(seconds: number): void {
    this.duration = seconds;
  }

  isValidPageView(): boolean {
    return !!(this.url && this.timestamp);
  }

  getBounceRate(): boolean {
    return (this.duration || 0) < 30; // Less than 30 seconds is considered a bounce
  }

  anonymize(): void {
    this.userId = undefined;
    this.ipAddress = undefined;
  }

  validate(): boolean {
    return !!(this.url);
  }
}
