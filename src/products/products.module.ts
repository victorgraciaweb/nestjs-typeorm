import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CommonModule } from 'src/common/common.module';
import { Product, ProductImage } from './entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage
    ]),
    CommonModule
  ],
  exports: [
    ProductsService,
    TypeOrmModule],
})
export class ProductsModule { }
