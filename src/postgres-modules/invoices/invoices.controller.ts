import {
  Controller,
  Post as HttpPost,
  Get,
  Param,
  Delete,
  Body,
  Query,
  NotFoundException,
  InternalServerErrorException,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SuccessResponseDto } from '../../common/dto/response.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { Roles } from '../../core/roles/roles.decorator';
import { Role } from '../../core/roles/role.enum';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @HttpPost()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto
  ): Promise<SuccessResponseDto<Invoice>> {
    const invoice = await this.invoicesService.create(createInvoiceDto);
    if (!invoice) throw new InternalServerErrorException('Error creating invoice');
    return new SuccessResponseDto('Invoice created successfully', invoice);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<SuccessResponseDto<Pagination<Invoice>>> {
    limit = limit > 100 ? 100 : limit;
    const result = await this.invoicesService.findAll({ page, limit });
    if (!result) throw new InternalServerErrorException('Could not retrieve invoices');
    return new SuccessResponseDto('Invoices retrieved successfully', result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SuccessResponseDto<Invoice>> {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    return new SuccessResponseDto('Invoice retrieved successfully', invoice);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto
  ): Promise<SuccessResponseDto<Invoice>> {
    const updated = await this.invoicesService.update(id, updateInvoiceDto);
    if (!updated) throw new NotFoundException('Invoice not found or error updating');
    return new SuccessResponseDto('Invoice updated successfully', updated);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<SuccessResponseDto<string>> {
    const deleted = await this.invoicesService.remove(id);
    if (!deleted) throw new NotFoundException('Invoice not found or could not be deleted');
    return new SuccessResponseDto('Invoice deleted successfully', id);
  }
}
