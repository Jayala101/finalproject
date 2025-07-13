import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCart, ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { UserPreference, UserPreferenceSchema } from './schemas/user-preference.schema';
import { SessionDataController } from './session-data.controller';
import { SessionDataService } from './session-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: UserPreference.name, schema: UserPreferenceSchema },
    ]),
  ],
  controllers: [SessionDataController],
  providers: [SessionDataService],
  exports: [SessionDataService],
})
export class SessionDataModule {}
