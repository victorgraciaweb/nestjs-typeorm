import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { LoginUserDto } from './dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly exceptionHandlerService: ExceptionHandlerService
    //private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user)
      delete user.password;

      return user;

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true } //! OJO!
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    /*return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };*/

    return user;
  }
}
