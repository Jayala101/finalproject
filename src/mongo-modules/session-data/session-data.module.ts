import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCart, ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { UserPreference, UserPreferenceSchema } from './schemas/user-preference.schema';
import { Session, SessionSchema } from './schemas/session.schema';
import { SessionDataService } from './session-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: UserPreference.name, schema: UserPreferenceSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
  ],
  controllers: [],
  providers: [SessionDataService],
  exports: [SessionDataService],
})
export class SessionDataModule {}
