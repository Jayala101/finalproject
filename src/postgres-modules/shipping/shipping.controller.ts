import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Shipping, ShippingStatus } from './entities/shipping.entity';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { Roles } from '../../core/roles/roles.decorator';
import { Role } from '../../core/roles/role.enum';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createShippingDto: CreateShippingDto): Promise<Shipping> {
    return this.shippingService.create(createShippingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async findAll(): Promise<Shipping[]> {
    return this.shippingService.findAll();
  }

  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard)
  async findByOrderId(@Param('orderId') orderId: string): Promise<Shipping | null> {
    return this.shippingService.findByOrderId(orderId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Shipping | null> {
    return this.shippingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateShippingDto: UpdateShippingDto,
  ): Promise<Shipping | null> {
    return this.shippingService.update(id, updateShippingDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: ShippingStatus,
  ): Promise<Shipping | null> {
    return this.shippingService.updateStatus(id, status);
  }

  @Patch(':id/tracking')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async updateTrackingNumber(
    @Param('id') id: string,
    @Body('trackingNumber') trackingNumber: string,
  ): Promise<Shipping | null> {
    return this.shippingService.updateTrackingNumber(id, trackingNumber);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    return this.shippingService.remove(id);
  }
}
