import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth(ValidRoles.admin)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.productsService.remove( id );
  }
}
