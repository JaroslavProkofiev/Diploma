import { Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { JaroslavService } from './jaroslav.service';
import { Auth } from 'src/userauth/decor/userauth.decorator';
import { CurrentUser } from 'src/userauth/decor/user.decorator';
import { UserAuthDto } from 'src/userauth/user.dto';



@Controller('jaroslav')
export class JaroslavController {
  constructor(private readonly jaroslavService: JaroslavService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number){
    return this.jaroslavService.byId(id); 
   }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async getNewTokens(@CurrentUser('id') id: number, @Body() dto: UserAuthDto){
    return this.jaroslavService.updateProfile(id, dto)
   }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorite(@Param('productId') productId: string, @CurrentUser('id') id: number){
    return this.jaroslavService.toggleFavorite(id, productId); 
   }
}
