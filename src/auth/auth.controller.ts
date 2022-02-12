import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.findOneBy({
      email: registerDto.email,
    });
    console.log("user", user);
    if (user) {
      throw new HttpException("User Exists", HttpStatus.BAD_REQUEST);
    } else {
      const user = await this.usersService.create(registerDto);

      console.log("user", user.id);

      return user;
    }
  }
}
