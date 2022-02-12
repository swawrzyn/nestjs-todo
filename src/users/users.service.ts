import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)

    return this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneBy(params: { id?: string; email?: string }) {
    return await this.usersRepository.findOne({where: params});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.save({ id: id, ...updateUserDto });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.save({ id: id, isActive: false });
  }
}
