import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  // private bcrypt = bcrypt;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<{ id: string, username: string }> {
    createUserDto.password = await this.toHashPassword(createUserDto.password)
    const user = this.usersRepository.create(createUserDto);
    const { password, ...result } = await this.usersRepository.save(user);
    return result;
  }

  async findOne(username: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ username });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  private async toHashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async toCheckPassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
} 
