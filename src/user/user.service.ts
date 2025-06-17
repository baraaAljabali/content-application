import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  
  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user){
      return {"error":"Dose not Exists", "statusCode": 404}
    }
    const { password, ...result } = user;
    return result;
  }

  async findOneWithUserEmail(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
}
