import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Query
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { 
  AdminOnly, 
  PublicRoute 
} from '../../core/roles/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Admin-only endpoint to create products
   */
  @Post()
  @AdminOnly()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /**
   * Public endpoint to view all products
   */
  @Get()
  @PublicRoute()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('category') category?: string
  ) {
    return this.productsService.findAll({ page, limit, category });
  }

  /**
   * Public endpoint to view a specific product
   */
  @Get(':id')
  @PublicRoute()
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  /**
   * Admin-only endpoint to update products
   */
  @Patch(':id')
  @AdminOnly()
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  /**
   * Admin-only endpoint to delete products
   */
  @Delete(':id')
  @AdminOnly()
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  /**
   * Admin-only endpoint to manage product stock
   */
  @Patch(':id/stock')
  @AdminOnly()
  async updateStock(
    @Param('id') id: string, 
    @Body() body: { stock: number }
  ) {
    return this.productsService.updateStock(id, body.stock);
  }

  /**
   * Admin-only endpoint to get low stock products
   */
  @Get('admin/low-stock')
  @AdminOnly()
  async getLowStockProducts(@Query('threshold') threshold: number = 10) {
    return this.productsService.findLowStockProducts(threshold);
  }
}
