import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserAuthDto } from './userauth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class UserauthService {
    constructor(private prisma: PrismaService, private jwt: JwtService ){}

  async login(dto: UserAuthDto){
    const user = await this.validateUser(dto)
  }
  

  async NewTokens(refreshToken:string){
    const result =  await this.jwt.verifyAsync(refreshToken)
    if(!result) throw new UnauthorizedException('Invalid ref token')
    const user = await this.prisma.user.findUnique({
  where:{
    id: result.id
  }})

  const tokens = await this.issueTokens(user.id)

  return{
    user: this.returnUserField(user),
    ...tokens
  }
  }
  async register(dto: UserAuthDto){
    const oldUs = await this.prisma.user.findUnique({
        where:{
            email: dto.email
        }
    })
    if (oldUs) throw new BadRequestException('User already exists')
    
    const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            name: faker.name.firstName(),
            phone: faker.phone.number('+380 (###) ### ### '),
            password: await hash(dto.password)
        }
    })

    const tokens = await this.issueTokens(user.id)
    
    return{
      user: this.returnUserField(user),
      ...tokens
    }
  }

  private async issueTokens(userId:number){
    const data = {id: userId}

    const accessToken = this.jwt.sign(data,{
        expiresIn: '1h',
    })

    const refreshToken = this.jwt.sign(data,{
        expiresIn: '10d',
    })

    return { accessToken, refreshToken }
  }

  private returnUserField(user: User){
    return{
        id: user.id,
        email: user.email
    }
  }

  private async validateUser(dto:UserAuthDto){
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    if (!user) throw new NotFoundException('Юзер не знайдений (')

    const isValide = await verify(user.password, dto.password)
    if (!isValide) throw new UnauthorizedException('Невалідний пароль!')

    return user
  }
}
