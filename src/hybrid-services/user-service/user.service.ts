import { Injectable } from '@nestjs/common';
import { UsersService } from '../../postgres-modules/users/users.service';
import { UserBehaviorService } from '../../mongo-modules/user-behavior/user-behavior.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly usersService: UsersService, // PostgreSQL service
    private readonly userBehaviorService: UserBehaviorService, // MongoDB service
  ) {}

  async findUserProfile(userId: string) {
    // Get core user data from PostgreSQL
    const user = await this.usersService.findOne(userId);
    
    // Get behavior data from MongoDB
    const behaviorData = await this.userBehaviorService.findByUserId(userId);
    
    // Return combined user profile
    return {
      ...user,
      behavior: behaviorData
    };
  }

  async updateUserProfile(userId: string, updateUserProfileDto: UpdateUserProfileDto) {
    const { preferences, interests, ...userData } = updateUserProfileDto;

    // Update user in PostgreSQL if there's data to update
    if (Object.keys(userData).length > 0) {
      await this.usersService.update(userId, userData);
    }

    // Update user behavior in MongoDB if there's data to update
    if (preferences || interests) {
      await this.userBehaviorService.updateUserPreferences(userId, {
        preferences,
        interests
      });
    }

    // Return updated user profile
    return this.findUserProfile(userId);
  }

  async trackUserActivity(userId: string, activity: any) {
    // Track user activity in MongoDB
    await this.userBehaviorService.trackActivity(userId, activity);
  }

  async getUserRecommendations(userId: string) {
    // Get user behavior data from MongoDB
    const behaviorData = await this.userBehaviorService.findByUserId(userId);
    
    // Use behavior data to generate recommendations
    const recommendedProductIds = await this.userBehaviorService.getRecommendedProducts(userId);
    
    // Return personalized recommendations
    return {
      userId,
      recommendations: recommendedProductIds
    };
  }

  async getUserStats(userId: string) {
    // Get user activity stats from MongoDB
    const stats = await this.userBehaviorService.getUserStats(userId);
    
    // Return user statistics
    return {
      userId,
      stats
    };
  }
}
