import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrowsingHistory, BrowsingHistorySchema } from './schemas/browsing-history.schema';
import { Clickstream, ClickstreamSchema } from './schemas/clickstream.schema';
import { SearchQuery, SearchQuerySchema } from './schemas/search-query.schema';
import { UserBehaviorService } from './user-behavior.service';
import { UserBehaviorController } from './user-behavior.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BrowsingHistory.name, schema: BrowsingHistorySchema },
      { name: Clickstream.name, schema: ClickstreamSchema },
      { name: SearchQuery.name, schema: SearchQuerySchema },
    ]),
  ],
  controllers: [UserBehaviorController],
  providers: [UserBehaviorService],
  exports: [UserBehaviorService],
})
export class UserBehaviorModule {}
