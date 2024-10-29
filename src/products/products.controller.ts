import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRoles } from 'src/auth/interfaces';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth(ValidRoles.user)
  create(
    @GetUser() user: User,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth()
  findAll(
    @GetUser() user: User,
    @Query() paginationDto: PaginationDto
  ) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  findOne(
    @GetUser() user: User,
    @Param('term') term: string
  ) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe 
  ) id: string) {
    return this.productsService.remove(id);
  }
}
