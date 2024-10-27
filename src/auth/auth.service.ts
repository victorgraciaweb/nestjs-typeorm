import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly exceptionHandlerService: ExceptionHandlerService
    //private readonly jwtService: JwtService,
  ) {}
  
  async create( createUserDto: CreateUserDto) {
    
    try {
      //const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create( createUserDto );

      await this.userRepository.save( user )
      //delete user.password;
      return user;

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }
}
