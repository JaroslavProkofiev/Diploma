import { Controller } from '@nestjs/common';
import { JaroslavService } from './jaroslav.service';

@Controller('jaroslav')
export class JaroslavController {
  constructor(private readonly jaroslavService: JaroslavService) {}

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
