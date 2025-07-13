import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  // Importar Mongoose
import { TypeOrmModule } from '@nestjs/typeorm';  // Importar TypeOrm
import { ConfigModule } from '@nestjs/config';  // Importar ConfigModule
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { ProductContentModule } from './product-content/product-content.module';
import { UserBehaviorModule } from './user-behavior/user-behavior.module';
import { SessionDataModule } from './session-data/session-data.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SeedModule } from './seed/seed.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CursosModule } from './cursos/cursos.module'; // Re-enabled with MongoDB

@Module({
  imports: [
    ConfigModule.forRoot(),  // Cargar variables de entorno

    // Conexión a MongoDB (Mongoose) - For courses and other features
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb'),

    // Conexión a PostgreSQL (TypeORM) - Primary database for e-commerce
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Re-enabled for new clean database
      dropSchema: true, // Drop existing schema and recreate
      ssl: {
        rejectUnauthorized: false // Required for Neon PostgreSQL
      },
      logging: false, // Set to true for debugging
    }),

    // Core E-commerce Modules
    UsersModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    CartsModule,
    ReviewsModule,
    WishlistsModule,
    
    // Auth & Communication
    AuthModule,
    MailModule,
    
    // MongoDB-based Modules
    ProductContentModule,
    UserBehaviorModule,
    SessionDataModule,
    NotificationsModule,
    
    // Development & Testing
    SeedModule,
    
    // Legacy/Additional Modules (PostgreSQL based)
    CustomersModule,
    InvoicesModule,
    PostsModule,
    CursosModule, // Re-enabled with MongoDB
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
