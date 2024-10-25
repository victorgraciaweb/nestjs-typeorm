import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(@UploadedFile() file: Express.Multer.File,) {

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image')
    }

    // const secureUrl = `${ file.filename }`;
    //const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;

    //return { secureUrl };
    return true;
  }
}
