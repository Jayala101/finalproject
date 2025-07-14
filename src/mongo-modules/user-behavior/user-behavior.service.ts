import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrowsingHistory } from './schemas/browsing-history.schema';
import { SearchQuery } from './schemas/search-query.schema';
import { Clickstream } from './schemas/clickstream.schema';
import { CreateBrowsingHistoryDto, CreateClickstreamDto, CreateSearchQueryDto } from './dto/user-behavior.dto';

@Injectable()
export class UserBehaviorService {
  constructor(
    @InjectModel(BrowsingHistory.name) private readonly browsingHistoryModel: Model<BrowsingHistory>,
    @InjectModel(SearchQuery.name) private readonly searchQueryModel: Model<SearchQuery>,
    @InjectModel(Clickstream.name) private readonly clickstreamModel: Model<Clickstream>,
  ) {}

  async addBrowsingHistory(dto: CreateBrowsingHistoryDto): Promise<BrowsingHistory> {
    const browsingHistoryData = dto.toObject();
    const browsingHistory = new this.browsingHistoryModel(browsingHistoryData);
    return browsingHistory.save();
  }

  async getBrowsingHistory(userId: string): Promise<BrowsingHistory[]> {
    return this.browsingHistoryModel.find({ userId }).sort({ viewedAt: -1 }).exec();
  }

  async recordSearchQuery(dto: CreateSearchQueryDto): Promise<SearchQuery> {
    const searchQueryData = dto.toObject();
    const searchQuery = new this.searchQueryModel(searchQueryData);
    return searchQuery.save();
  }

  async getUserSearchQueries(userId: string): Promise<SearchQuery[]> {
    return this.searchQueryModel.find({ userId }).sort({ searchedAt: -1 }).exec();
  }

  async recordClickEvent(dto: CreateClickstreamDto): Promise<Clickstream> {
    const clickEventData = dto.toObject();
    const clickEvent = new this.clickstreamModel(clickEventData);
    return clickEvent.save();
  }

  async getPopularProducts(limit: number = 10): Promise<any> {
    // Aggregate to find the most viewed products
    const popularProducts = await this.browsingHistoryModel.aggregate([
      { $group: { _id: '$productId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit }
    ]).exec();
    
    return popularProducts;
  }

  async getUserInterests(userId: string): Promise<any> {
    // Find categories the user is most interested in
    const categoryInterests = await this.browsingHistoryModel.aggregate([
      { $match: { userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).exec();
    
    return categoryInterests;
  }

  async findByUserId(userId: string): Promise<any> {
    const browsingHistory = await this.browsingHistoryModel.find({ userId }).sort({ viewedAt: -1 }).limit(20).exec();
    const searchQueries = await this.searchQueryModel.find({ userId }).sort({ searchedAt: -1 }).limit(20).exec();
    const clickstream = await this.clickstreamModel.find({ userId }).sort({ timestamp: -1 }).limit(20).exec();
    
    return {
      browsingHistory,
      searchQueries,
      clickstream
    };
  }

  async getMostViewedProducts(userId: string, limit: number = 5): Promise<any> {
    return this.browsingHistoryModel.aggregate([
      { $match: { userId } },
      { $group: { _id: '$productId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { productId: '$_id', count: 1, _id: 0 } }
    ]).exec();
  }

  async updateUserPreferences(userId: string, data: any): Promise<any> {
    // This would typically update a user preferences document
    // For demonstration, we'll just return the data
    return {
      userId,
      ...data,
      updated: true
    };
  }

  async trackActivity(userId: string, activity: any): Promise<any> {
    // Route the activity to the appropriate collection based on type
    if (activity.type === 'product_view') {
      const browsingHistoryDto = CreateBrowsingHistoryDto.create({
        userId,
        productId: activity.productId,
        category: activity.category,
        source: activity.source,
        deviceType: activity.deviceType,
        duration: activity.duration
      });
      return this.addBrowsingHistory(browsingHistoryDto);
    } else if (activity.type === 'search') {
      const searchQueryDto = CreateSearchQueryDto.create({
        userId,
        query: activity.query,
        resultProductIds: activity.resultProductIds,
        filters: activity.filters,
        resultCount: activity.resultCount,
        category: activity.category
      });
      return this.recordSearchQuery(searchQueryDto);
    } else if (activity.type === 'click') {
      const clickstreamDto = CreateClickstreamDto.create({
        userId,
        elementId: activity.elementId,
        pageUrl: activity.pageUrl,
        action: activity.action,
        sessionId: activity.sessionId
      });
      return this.recordClickEvent(clickstreamDto);
    }
    
    return { message: 'Unknown activity type' };
  }

  async getUserStats(userId: string): Promise<any> {
    const browsingCount = await this.browsingHistoryModel.countDocuments({ userId }).exec();
    const searchCount = await this.searchQueryModel.countDocuments({ userId }).exec();
    const clickCount = await this.clickstreamModel.countDocuments({ userId }).exec();
    
    return {
      browsingCount,
      searchCount,
      clickCount,
      totalInteractions: browsingCount + searchCount + clickCount
    };
  }

  async getRecommendedProducts(userId: string, limit: number = 10): Promise<string[]> {
    // This is a simplified recommendation algorithm
    // In a real application, this would be more sophisticated
    
    // Get products the user has viewed
    const viewedProducts = await this.getMostViewedProducts(userId, 5);
    
    // Get categories the user is interested in
    const categoryInterests = await this.getUserInterests(userId);
    
    // Mock response - in a real app, this would use the data above to find similar products
    return viewedProducts.map(p => p.productId);
  }
}
