import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist } from './wishlist.entity';
import { Wishlist as WishlistMongo, WishlistSchema } from './schemas/wishlist.schema';
import { WishlistAnalytics, WishlistAnalyticsSchema } from './schemas/wishlist-analytics.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    MongooseModule.forFeature([
      { name: WishlistMongo.name, schema: WishlistSchema },
      { name: WishlistAnalytics.name, schema: WishlistAnalyticsSchema },
    ]),
  ],
  controllers: [WishlistsController],
  providers: [WishlistsService],
  exports: [WishlistsService],
})
export class WishlistsModule {}
