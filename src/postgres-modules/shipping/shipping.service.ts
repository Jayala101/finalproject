import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipping, ShippingStatus } from './entities/shipping.entity';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ) {}

  async create(createShippingDto: CreateShippingDto): Promise<Shipping> {
    const shipping = this.shippingRepository.create(createShippingDto);
    return this.shippingRepository.save(shipping);
  }

  async findAll(): Promise<Shipping[]> {
    return this.shippingRepository.find({ 
      relations: ['order'] 
    });
  }

  async findOne(id: string): Promise<Shipping | null> {
    return this.shippingRepository.findOne({ 
      where: { id },
      relations: ['order'] 
    });
  }

  async findByOrderId(orderId: string): Promise<Shipping | null> {
    return this.shippingRepository.findOne({
      where: { orderId },
      relations: ['order']
    });
  }

  async update(id: string, updateShippingDto: UpdateShippingDto): Promise<Shipping | null> {
    await this.shippingRepository.update(id, updateShippingDto);
    return this.findOne(id);
  }

  async updateStatus(id: string, status: ShippingStatus): Promise<Shipping | null> {
    await this.shippingRepository.update(id, { status });
    return this.findOne(id);
  }

  async updateTrackingNumber(id: string, trackingNumber: string): Promise<Shipping | null> {
    await this.shippingRepository.update(id, { trackingNumber });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.shippingRepository.delete(id);
  }
}
