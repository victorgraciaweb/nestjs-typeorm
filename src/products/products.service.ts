import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDto, UpdateProductDto } from './dto';
import { Product, ProductImage } from './entities';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map( image => this.productImageRepository.create({ url: image }) )
      });
      
      await this.productRepository.save( product );

      return { ...product, images };

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    })

    return products.map( ( product ) => ({
      ...product,
      images: product.images.map( img => img.url )
    }))
  }

  async findOne(term: string): Promise<Product> {
    try {
      let product: Product;

      if (isUUID(term)) {
        product = await this.productRepository.findOneBy({ id: term });
      } else {
        const queryBuilder = this.productRepository.createQueryBuilder();
        product = await queryBuilder
          .where('UPPER(title) = :title OR slug = :slug', {
            title: term.toUpperCase(),
            slug: term.toLowerCase(),
          }).getOne();
      }

      if (!product) {
        throw new NotFoundException(`Product with term "${term}" not found`);
      }

      return product;

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto,
        images: [],
      });
  
      if (!product) {
        throw new NotFoundException(`Product with id: ${id} not found`);
      }

      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
  
    try {
      await this.productRepository.remove(product);
    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }
}
