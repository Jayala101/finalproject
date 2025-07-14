import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongoSeedsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async seedAll(): Promise<void> {
    console.log('  📊 Seeding user behavior data...');
    await this.seedUserBehavior();
    
    console.log('  📝 Seeding product reviews...');
    await this.seedReviews();
    
    console.log('  📈 Seeding analytics data...');
    await this.seedAnalytics();
    
    console.log('  📚 Seeding product content...');
    await this.seedProductContent();
    
    console.log('  🔔 Seeding notifications...');
    await this.seedNotifications();
    
    console.log('  💾 Seeding session data...');
    await this.seedSessionData();
  }

  private async seedUserBehavior(): Promise<void> {
    const userBehaviorCollection = this.connection.collection('user-behavior');
    
    const behaviors = [
      {
        userId: 'user_1',
        sessionId: 'session_001',
        actions: [
          {
            type: 'view_product',
            productId: 'product_1',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            metadata: { category: 'Electronics', duration: 45 }
          },
          {
            type: 'add_to_cart',
            productId: 'product_1',
            timestamp: new Date(Date.now() - 90 * 60 * 1000), // 90 minutes ago
            metadata: { quantity: 1, price: 999.99 }
          },
          {
            type: 'view_product',
            productId: 'product_2',
            timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
            metadata: { category: 'Electronics', duration: 30 }
          }
        ],
        deviceInfo: {
          type: 'desktop',
          browser: 'Chrome',
          os: 'Windows'
        },
        location: {
          country: 'US',
          city: 'New York'
        },
        createdAt: new Date()
      },
      {
        userId: 'user_2',
        sessionId: 'session_002',
        actions: [
          {
            type: 'search',
            query: 'smartphone',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            metadata: { resultsCount: 25 }
          },
          {
            type: 'view_product',
            productId: 'product_2',
            timestamp: new Date(Date.now() - 150 * 60 * 1000),
            metadata: { category: 'Smartphones', duration: 60 }
          },
          {
            type: 'add_to_wishlist',
            productId: 'product_2',
            timestamp: new Date(Date.now() - 120 * 60 * 1000),
            metadata: {}
          }
        ],
        deviceInfo: {
          type: 'mobile',
          browser: 'Safari',
          os: 'iOS'
        },
        location: {
          country: 'US',
          city: 'Los Angeles'
        },
        createdAt: new Date()
      }
    ];

    try {
      await userBehaviorCollection.deleteMany({});
      await userBehaviorCollection.insertMany(behaviors);
      console.log(`    ✓ Created ${behaviors.length} user behavior records`);
    } catch (error) {
      console.log(`    ✗ Failed to seed user behavior: ${error.message}`);
    }
  }

  private async seedReviews(): Promise<void> {
    const reviewsCollection = this.connection.collection('reviews');
    
    const reviews = [
      {
        productId: 'product_1',
        userId: 'user_1',
        rating: 5,
        title: 'Excellent phone!',
        comment: 'This iPhone 15 Pro is amazing. The camera quality is outstanding and the battery life is great.',
        verified: true,
        helpful: 12,
        notHelpful: 1,
        images: ['review1_img1.jpg', 'review1_img2.jpg'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        productId: 'product_1',
        userId: 'user_2',
        rating: 4,
        title: 'Good but expensive',
        comment: 'Great phone with excellent features, but the price is quite high. Worth it if you can afford it.',
        verified: true,
        helpful: 8,
        notHelpful: 2,
        images: [],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        productId: 'product_2',
        userId: 'user_3',
        rating: 5,
        title: 'Best Android phone',
        comment: 'Samsung Galaxy S24 exceeded my expectations. Fast, reliable, and the camera is incredible.',
        verified: true,
        helpful: 15,
        notHelpful: 0,
        images: ['review3_img1.jpg'],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        productId: 'product_3',
        userId: 'user_4',
        rating: 5,
        title: 'Perfect for work',
        comment: 'MacBook Pro 16" is perfect for my video editing work. Fast, reliable, and the display is stunning.',
        verified: true,
        helpful: 20,
        notHelpful: 1,
        images: ['review4_img1.jpg', 'review4_img2.jpg'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ];

    try {
      await reviewsCollection.deleteMany({});
      await reviewsCollection.insertMany(reviews);
      console.log(`    ✓ Created ${reviews.length} product reviews`);
    } catch (error) {
      console.log(`    ✗ Failed to seed reviews: ${error.message}`);
    }
  }

  private async seedAnalytics(): Promise<void> {
    const analyticsCollection = this.connection.collection('analytics');
    
    const now = new Date();
    const analytics = [
      {
        type: 'page_view',
        page: '/products',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        userId: 'user_1',
        sessionId: 'session_001',
        metadata: {
          referrer: 'google.com',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          loadTime: 1200
        }
      },
      {
        type: 'product_view',
        productId: 'product_1',
        timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000),
        userId: 'user_1',
        sessionId: 'session_001',
        metadata: {
          viewDuration: 45,
          scrollDepth: 85
        }
      },
      {
        type: 'purchase',
        orderId: 'order_001',
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
        userId: 'user_2',
        sessionId: 'session_002',
        metadata: {
          totalAmount: 899.99,
          itemCount: 1,
          paymentMethod: 'credit_card'
        }
      },
      {
        type: 'search',
        query: 'laptop',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
        userId: 'user_3',
        sessionId: 'session_003',
        metadata: {
          resultsCount: 15,
          selectedResult: 3
        }
      }
    ];

    try {
      await analyticsCollection.deleteMany({});
      await analyticsCollection.insertMany(analytics);
      console.log(`    ✓ Created ${analytics.length} analytics records`);
    } catch (error) {
      console.log(`    ✗ Failed to seed analytics: ${error.message}`);
    }
  }

  private async seedProductContent(): Promise<void> {
    const productContentCollection = this.connection.collection('product-content');
    
    const productContent = [
      {
        productId: 'product_1', // iPhone 15 Pro
        content: {
          features: [
            'A17 Pro chip with 6-core GPU',
            'Pro camera system with 48MP Main',
            'Action button for quick actions',
            'USB-C connector',
            'Up to 29 hours video playback'
          ],
          specifications: {
            display: '6.1-inch Super Retina XDR display',
            processor: 'A17 Pro chip',
            storage: ['128GB', '256GB', '512GB', '1TB'],
            camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
            battery: 'Up to 29 hours video playback',
            colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
          },
          gallery: [
            'iphone15pro_1.jpg',
            'iphone15pro_2.jpg',
            'iphone15pro_3.jpg',
            'iphone15pro_4.jpg'
          ],
          videos: [
            'iphone15pro_overview.mp4',
            'iphone15pro_camera.mp4'
          ]
        },
        seo: {
          metaTitle: 'iPhone 15 Pro - Advanced Pro Camera System',
          metaDescription: 'Discover iPhone 15 Pro with A17 Pro chip, advanced camera system, and premium titanium design.',
          keywords: ['iPhone', '15 Pro', 'Apple', 'smartphone', 'A17 Pro', 'titanium']
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 'product_2', // Samsung Galaxy S24
        content: {
          features: [
            'Snapdragon 8 Gen 3 processor',
            'AI-enhanced camera system',
            '120Hz Dynamic AMOLED display',
            'All-day battery with fast charging',
            'Galaxy AI features'
          ],
          specifications: {
            display: '6.2-inch Dynamic AMOLED 2X',
            processor: 'Snapdragon 8 Gen 3',
            storage: ['128GB', '256GB', '512GB'],
            camera: '50MP Main, 12MP Ultra Wide, 10MP Telephoto',
            battery: '4000mAh with 25W fast charging',
            colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow']
          },
          gallery: [
            'galaxy_s24_1.jpg',
            'galaxy_s24_2.jpg',
            'galaxy_s24_3.jpg'
          ],
          videos: [
            'galaxy_s24_overview.mp4'
          ]
        },
        seo: {
          metaTitle: 'Samsung Galaxy S24 - AI-Powered Smartphone',
          metaDescription: 'Experience the Samsung Galaxy S24 with advanced AI features, pro-grade camera, and premium design.',
          keywords: ['Samsung', 'Galaxy S24', 'Android', 'smartphone', 'AI', 'camera']
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    try {
      await productContentCollection.deleteMany({});
      await productContentCollection.insertMany(productContent);
      console.log(`    ✓ Created ${productContent.length} product content records`);
    } catch (error) {
      console.log(`    ✗ Failed to seed product content: ${error.message}`);
    }
  }

  private async seedNotifications(): Promise<void> {
    const notificationsCollection = this.connection.collection('notifications');
    
    const notifications = [
      {
        userId: 'user_1',
        type: 'order_shipped',
        title: 'Your order has been shipped!',
        message: 'Your iPhone 15 Pro is on its way. Track your package with tracking number: 1Z999AA1234567890',
        read: false,
        data: {
          orderId: 'order_001',
          trackingNumber: '1Z999AA1234567890'
        },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        userId: 'user_2',
        type: 'price_drop',
        title: 'Price drop on your wishlist item!',
        message: 'Samsung Galaxy S24 is now $50 off. Limited time offer!',
        read: false,
        data: {
          productId: 'product_2',
          oldPrice: 899.99,
          newPrice: 849.99
        },
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
      },
      {
        userId: 'user_1',
        type: 'review_reminder',
        title: 'How was your recent purchase?',
        message: 'We\'d love to hear your thoughts on the iPhone 15 Pro you purchased.',
        read: true,
        data: {
          productId: 'product_1',
          orderId: 'order_001'
        },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        userId: 'user_3',
        type: 'welcome',
        title: 'Welcome to our store!',
        message: 'Thank you for joining us. Enjoy 10% off your first order with code WELCOME10.',
        read: true,
        data: {
          discountCode: 'WELCOME10'
        },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      }
    ];

    try {
      await notificationsCollection.deleteMany({});
      await notificationsCollection.insertMany(notifications);
      console.log(`    ✓ Created ${notifications.length} notifications`);
    } catch (error) {
      console.log(`    ✗ Failed to seed notifications: ${error.message}`);
    }
  }

  private async seedSessionData(): Promise<void> {
    const sessionDataCollection = this.connection.collection('session-data');
    
    const sessions = [
      {
        sessionId: 'session_001',
        userId: 'user_1',
        startTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        duration: 3600, // 1 hour in seconds
        pageViews: 8,
        cart: {
          items: [
            {
              productId: 'product_1',
              quantity: 1,
              price: 999.99,
              addedAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000)
            }
          ],
          totalValue: 999.99
        },
        device: {
          type: 'desktop',
          browser: 'Chrome',
          os: 'Windows 10',
          screenResolution: '1920x1080'
        },
        location: {
          ip: '192.168.1.1',
          country: 'US',
          city: 'New York',
          timezone: 'America/New_York'
        },
        referrer: 'google.com',
        landingPage: '/products',
        exitPage: '/checkout'
      },
      {
        sessionId: 'session_002',
        userId: 'user_2',
        startTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        endTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        duration: 2400, // 40 minutes in seconds
        pageViews: 12,
        cart: {
          items: [],
          totalValue: 0
        },
        device: {
          type: 'mobile',
          browser: 'Safari',
          os: 'iOS 17',
          screenResolution: '390x844'
        },
        location: {
          ip: '192.168.1.2',
          country: 'US',
          city: 'Los Angeles',
          timezone: 'America/Los_Angeles'
        },
        referrer: 'facebook.com',
        landingPage: '/',
        exitPage: '/products/samsung-galaxy-s24'
      }
    ];

    try {
      await sessionDataCollection.deleteMany({});
      await sessionDataCollection.insertMany(sessions);
      console.log(`    ✓ Created ${sessions.length} session records`);
    } catch (error) {
      console.log(`    ✗ Failed to seed session data: ${error.message}`);
    }
  }
}
