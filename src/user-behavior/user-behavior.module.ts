import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrowsingHistory, BrowsingHistorySchema } from './schemas/browsing-history.schema';
import { SearchQuery, SearchQuerySchema } from './schemas/search-query.schema';
import { Clickstream, ClickstreamSchema } from './schemas/clickstream.schema';
import { UserBehaviorController } from './user-behavior.controller';
import { UserBehaviorService } from './user-behavior.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BrowsingHistory.name, schema: BrowsingHistorySchema },
      { name: SearchQuery.name, schema: SearchQuerySchema },
      { name: Clickstream.name, schema: ClickstreamSchema },
    ]),
  ],
  controllers: [UserBehaviorController],
  providers: [UserBehaviorService],
  exports: [UserBehaviorService],
})
export class UserBehaviorModule {}
