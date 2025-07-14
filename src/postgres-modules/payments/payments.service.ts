import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ 
      relations: ['order'] 
    });
  }

  async findOne(id: string): Promise<Payment | null> {
    return this.paymentRepository.findOne({ 
      where: { id },
      relations: ['order']
    });
  }

  async findByOrderId(orderId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { orderId },
      relations: ['order']
    });
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment | null> {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async updateStatus(id: string, status: PaymentStatus): Promise<Payment | null> {
    await this.paymentRepository.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
