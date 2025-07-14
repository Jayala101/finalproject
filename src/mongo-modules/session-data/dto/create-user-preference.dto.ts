import { IsString, IsNotEmpty, IsOptional, IsObject, IsArray, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserPreferenceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsObject()
  @IsOptional()
  preferredCategories?: Record<string, number>;

  @IsArray()
  @IsOptional()
  favoriteProducts?: string[];

  @IsObject()
  @IsOptional()
  interfaceSettings?: Record<string, any>;

  @IsObject()
  @IsOptional()
  notificationPreferences?: Record<string, boolean>;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  lastLoginAt?: Date;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  // CRUD Methods
  static create(data: Partial<CreateUserPreferenceDto>): CreateUserPreferenceDto {
    const preference = new CreateUserPreferenceDto();
    Object.assign(preference, {
      preferredCategories: {},
      favoriteProducts: [],
      interfaceSettings: {
        theme: 'light',
        language: 'en',
        notifications: true
      },
      notificationPreferences: {
        email: true,
        push: true,
        sms: false,
        marketing: false
      },
      language: 'en',
      currency: 'USD',
      ...data
    });
    return preference;
  }

  toObject(): Record<string, any> {
    return {
      userId: this.userId,
      preferredCategories: this.preferredCategories || {},
      favoriteProducts: this.favoriteProducts || [],
      interfaceSettings: this.interfaceSettings || {},
      notificationPreferences: this.notificationPreferences || {},
      lastLoginAt: this.lastLoginAt,
      language: this.language || 'en',
      currency: this.currency || 'USD',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  addFavoriteProduct(productId: string): void {
    if (!this.favoriteProducts) this.favoriteProducts = [];
    if (!this.favoriteProducts.includes(productId)) {
      this.favoriteProducts.push(productId);
    }
  }

  removeFavoriteProduct(productId: string): void {
    if (this.favoriteProducts) {
      this.favoriteProducts = this.favoriteProducts.filter(id => id !== productId);
    }
  }

  updateCategoryPreference(category: string, score: number): void {
    if (!this.preferredCategories) this.preferredCategories = {};
    this.preferredCategories[category] = Math.max(0, Math.min(10, score)); // Clamp between 0-10
  }

  updateInterfaceSetting(key: string, value: any): void {
    if (!this.interfaceSettings) this.interfaceSettings = {};
    this.interfaceSettings[key] = value;
  }

  updateNotificationPreference(type: string, enabled: boolean): void {
    if (!this.notificationPreferences) this.notificationPreferences = {};
    this.notificationPreferences[type] = enabled;
  }

  updateLastLogin(): void {
    this.lastLoginAt = new Date();
  }

  getTopCategories(limit: number = 5): Array<{category: string, score: number}> {
    if (!this.preferredCategories) return [];
    
    return Object.entries(this.preferredCategories)
      .map(([category, score]) => ({ category, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  isNotificationEnabled(type: string): boolean {
    return this.notificationPreferences?.[type] ?? false;
  }

  validate(): boolean {
    return !!(this.userId);
  }
}
