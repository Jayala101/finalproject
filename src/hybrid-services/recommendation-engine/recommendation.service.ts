import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../postgres-modules/products/products.service';
import { UserBehaviorService } from '../../mongo-modules/user-behavior/user-behavior.service';
import { AnalyticsService } from '../../mongo-modules/analytics/analytics.service';
import { SessionDataService } from '../../mongo-modules/session-data/session-data.service';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly productsService: ProductsService, // PostgreSQL products
    private readonly userBehaviorService: UserBehaviorService, // MongoDB user behavior
    private readonly analyticsService: AnalyticsService, // MongoDB analytics
    private readonly sessionDataService: SessionDataService, // MongoDB session data
  ) {}

  async getPersonalizedRecommendations(userId: string, limit: number = 10) {
    // Get user behavior data and preferences
    const userBehavior = await this.userBehaviorService.findByUserId(userId);
    
    // Get most viewed products by this user
    const viewedProducts = await this.userBehaviorService.getMostViewedProducts(userId, 5);
    
    // Get products similar to viewed products
    const similarProductIds = await this.findSimilarProducts(viewedProducts.map(p => p.productId));
    
    // Get trending products from analytics
    const trendingProducts = await this.analyticsService.getTrendingProductIds(5);
    
    // Combine recommendations with weights
    const recommendations = this.combineRecommendations([
      { productIds: similarProductIds, weight: 0.6 },
      { productIds: trendingProducts, weight: 0.4 }
    ], limit);
    
    // Fetch full product details from PostgreSQL
    const products = await this.productsService.findByIds(recommendations);
    
    return products;
  }

  async getSessionBasedRecommendations(sessionId: string, limit: number = 10) {
    // Get session data
    const sessionData = await this.sessionDataService.findBySessionId(sessionId);
    
    // Get viewed products in this session
    const viewedProducts = sessionData?.viewedProducts || [];
    
    // Get products similar to viewed products
    const similarProductIds = await this.findSimilarProducts(viewedProducts);
    
    // Get trending products from analytics
    const trendingProducts = await this.analyticsService.getTrendingProductIds(5);
    
    // Combine recommendations with weights
    const recommendations = this.combineRecommendations([
      { productIds: similarProductIds, weight: 0.7 },
      { productIds: trendingProducts, weight: 0.3 }
    ], limit);
    
    // Fetch full product details from PostgreSQL
    const products = await this.productsService.findByIds(recommendations);
    
    return products;
  }

  async getCategoryRecommendations(categoryId: string, limit: number = 10) {
    // Get popular products in this category from analytics
    const popularProductIds = await this.analyticsService.getPopularProductsByCategory(categoryId, limit);
    
    // Fetch full product details from PostgreSQL
    const products = await this.productsService.findByIds(popularProductIds);
    
    return products;
  }

  async getRelatedProducts(productId: string, limit: number = 10) {
    // Get product details from PostgreSQL
    const product = await this.productsService.findOne(productId);
    
    // Get products in same category
    const categoryProducts = await this.productsService.findByCategoryId(product.categoryId, 5);
    
    // Get products frequently bought together from analytics
    const frequentlyBoughtTogether = await this.analyticsService.getFrequentlyBoughtTogether(productId, 5);
    
    // Combine recommendations with weights
    const recommendations = this.combineRecommendations([
      { productIds: categoryProducts.map(p => p.id), weight: 0.5 },
      { productIds: frequentlyBoughtTogether, weight: 0.5 }
    ], limit);
    
    // Filter out the original product
    const filteredRecommendations = recommendations.filter(id => id !== productId);
    
    // Fetch full product details from PostgreSQL
    const products = await this.productsService.findByIds(filteredRecommendations);
    
    return products;
  }

  private async findSimilarProducts(productIds: string[]): Promise<string[]> {
    if (!productIds.length) return [];
    
    // Find similar products based on product metadata
    const similarProducts = await this.analyticsService.findSimilarProducts(productIds);
    
    return similarProducts;
  }

  private combineRecommendations(
    sources: Array<{ productIds: string[]; weight: number }>,
    limit: number
  ): string[] {
    // Combine and deduplicate recommendations
    const weightedProductMap = new Map<string, number>();
    
    // Process each recommendation source
    sources.forEach(source => {
      source.productIds.forEach((productId, index) => {
        // Calculate weight based on position and source weight
        const positionWeight = 1 - (index / source.productIds.length);
        const totalWeight = source.weight * positionWeight;
        
        // Add to map or update weight if already exists
        const currentWeight = weightedProductMap.get(productId) || 0;
        weightedProductMap.set(productId, currentWeight + totalWeight);
      });
    });
    
    // Sort by weight and take top 'limit' results
    const sortedProducts = Array.from(weightedProductMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, limit);
    
    return sortedProducts;
  }
}
