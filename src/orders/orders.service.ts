import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { orderItems, ...orderData } = createOrderDto;
    
    // Create order
    const order = this.ordersRepository.create(orderData);
    const savedOrder = await this.ordersRepository.save(order);

    // Create order items
    const orderItemEntities = orderItems.map(item => 
      this.orderItemsRepository.create({
        ...item,
        order_id: savedOrder.id,
      })
    );
    await this.orderItemsRepository.save(orderItemEntities);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.ordersRepository.findOne({
      where: { id },
    });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user_id: userId },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    await this.ordersRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
