import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserauthService } from './userauth.service';
import { UserAuthDto } from './userauth.dto';
import { refreshTokenDto } from './refresh-token.dto';

@Controller('userauth')
export class UserauthController {
  constructor(private readonly userauthService: UserauthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: UserAuthDto){
    return this.userauthService.register(dto); 
   }
   @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserAuthDto){
    return this.userauthService.login(dto); 
   }
   @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async NewTokens(@Body() dto: refreshTokenDto){
    return this.userauthService.NewTokens(dto.refreshToken); 
   }
}
