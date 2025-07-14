import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core modules
import { AuthModule } from './core/auth/auth.module';
import { MailModule } from './core/mail/mail.module';

// PostgreSQL modules
import { UsersModule } from './postgres-modules/users/users.module';
import { ProductsModule } from './postgres-modules/products/products.module';
import { CategoriesModule } from './postgres-modules/categories/categories.module';
import { OrdersModule } from './postgres-modules/orders/orders.module';
import { CartsModule } from './postgres-modules/carts/carts.module';
import { PaymentsModule } from './postgres-modules/payments/payments.module';
import { ShippingModule } from './postgres-modules/shipping/shipping.module';
import { DiscountsModule } from './postgres-modules/discounts/discounts.module';
import { InvoicesModule } from './postgres-modules/invoices/invoices.module';
import { PostsModule } from './postgres-modules/posts/posts.module';

// MongoDB modules
import { ProductContentModule } from './mongo-modules/product-content/product-content.module';
import { UserBehaviorModule } from './mongo-modules/user-behavior/user-behavior.module';
import { SessionDataModule } from './mongo-modules/session-data/session-data.module';
import { ReviewsModule } from './mongo-modules/reviews/reviews.module';
import { AnalyticsModule } from './mongo-modules/analytics/analytics.module';
import { ContentModule } from './mongo-modules/content/content.module';

// Hybrid Services
import { HybridServicesModule } from './hybrid-services/hybrid-services.module';

// Database configuration
import { DatabaseModule } from './database/database.module';
import { ConfigModule as AppConfigModule } from './config/config.module';

// Database seeding
import { SeedModule } from './database/seed/seed.module';

@Module({
  imports: [
    // Core configuration - Load .env file globally with validation
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      validationSchema: Joi.object({
        // Database configuration
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SSL: Joi.boolean().default(true),
        
        // MongoDB configuration
        MONGO_URI: Joi.string().required(),
        
        // JWT configuration
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('3600s'),
        
        // Email configuration
        MAIL_USER: Joi.string().required(),
        MAIL_PASS: Joi.string().required(),
        
        // Application configuration
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3030),
      }),
    }),
    AppConfigModule,
    DatabaseModule,
    
    // Core modules
    AuthModule,
    MailModule,
    
    // PostgreSQL modules
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    CartsModule,
    PaymentsModule,
    ShippingModule,
    DiscountsModule,
    InvoicesModule,
    PostsModule,
    
    // MongoDB modules
    ProductContentModule,
    UserBehaviorModule,
    SessionDataModule,
    ReviewsModule,
    AnalyticsModule,
    ContentModule,
    
    // Hybrid services
    HybridServicesModule,
    
    // Database seeding
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
