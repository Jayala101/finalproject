import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrowsingHistory } from './schemas/browsing-history.schema';
import { SearchQuery } from './schemas/search-query.schema';
import { Clickstream } from './schemas/clickstream.schema';

@Injectable()
export class UserBehaviorService {
  constructor(
    @InjectModel(BrowsingHistory.name) private readonly browsingHistoryModel: Model<BrowsingHistory>,
    @InjectModel(SearchQuery.name) private readonly searchQueryModel: Model<SearchQuery>,
    @InjectModel(Clickstream.name) private readonly clickstreamModel: Model<Clickstream>,
  ) {}

  // Service methods will be implemented later
}
