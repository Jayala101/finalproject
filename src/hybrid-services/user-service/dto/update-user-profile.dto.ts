import { IsOptional, IsString, IsArray, IsEmail, IsObject } from 'class-validator';

export class UpdateUserProfileDto {
  // Core user data (PostgreSQL)
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;

  // User behavior data (MongoDB)
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferences?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];
}
