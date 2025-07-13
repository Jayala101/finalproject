import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { UserPreference } from './schemas/user-preference.schema';

@Injectable()
export class SessionDataService {
  constructor(
    @InjectModel(ShoppingCart.name) private readonly shoppingCartModel: Model<ShoppingCart>,
    @InjectModel(UserPreference.name) private readonly userPreferenceModel: Model<UserPreference>,
  ) {}

  // Service methods will be implemented later
}
