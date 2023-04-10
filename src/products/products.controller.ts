import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { Product } from 'src/interfaces/product/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async create(@Body() createProductDTO: CreateProductDTO) {
    this.productService.create(createProductDTO);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
