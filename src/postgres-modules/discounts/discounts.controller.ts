import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { Roles } from '../../core/roles/roles.decorator';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async create(@Body() createDiscountDto: CreateDiscountDto): Promise<Discount> {
    return this.discountsService.create(createDiscountDto);
  }

  @Get()
  async findAll(): Promise<Discount[]> {
    return this.discountsService.findAll();
  }

  @Get('active')
  async findActiveDiscounts(): Promise<Discount[]> {
    return this.discountsService.findActiveDiscounts();
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string): Promise<Discount> {
    return this.discountsService.findByCode(code);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Discount> {
    return this.discountsService.findOne(id);
  }

  @Post('validate')
  async validateDiscount(
    @Body('code') code: string, 
    @Body('amount') amount: number
  ): Promise<{ valid: boolean; discount: Discount | null }> {
    return this.discountsService.validateDiscount(code, amount);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.update(id, updateDiscountDto);
  }

  @Patch(':id/increment-usage')
  @UseGuards(JwtAuthGuard)
  async incrementUsageCount(@Param('id') id: string): Promise<Discount> {
    return this.discountsService.incrementUsageCount(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<void> {
    return this.discountsService.remove(id);
  }
}
