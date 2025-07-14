
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice.entity';
import { InvoiceItem } from './invoice-item.entity';
import { Payment } from './payment.entity';
import { User } from '../postgres-modules/users/entities/user.entity';
import { Product } from '../postgres-modules/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Invoice, InvoiceItem, Payment, Product])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}