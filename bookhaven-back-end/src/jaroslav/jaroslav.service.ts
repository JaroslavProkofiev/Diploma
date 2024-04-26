import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { jaroslavObject } from './jaroslav.object';
import { error } from 'console';
import { Prisma } from '@prisma/client';
import { UserAuthDto } from 'src/userauth/userauth.dto';
import { hash } from 'argon2';



@Injectable()
export class JaroslavService {
    toggleFavorite(id: number, productId: string) {
      throw new Error('Method not implemented.');
    }
    constructor(private prisma:PrismaService){}
    async byId(id: number, selectObject: Prisma.UserSelect = {}){
        const user = await this.prisma.user.findUnique({where:{
            id
    },
    select:{
        ...jaroslavObject,
        favorites:{
        select:{
            name: true,
            id: true,
            price: true,
            images: true,
            slug: true
        }
        },
        ...selectObject
    }
    })
    if (!user){
        throw new Error('Юзер не знайдений!')
    }
    return user
    }
    async updateProfile(id: number, dto: UserAuthDto){
        const isSomeuser = await this.prisma.user.findUnique({
            where: {email: dto.email}
        })
        if (isSomeuser && id == isSomeuser.id)
            throw new BadRequestException('Email вже зайнятий')

    const user = await this.byId(id)

    return this.prisma.user.update({
        where: {
            id
        },
        data: {
            email: dto.email,
            password: dto.password ? await hash(dto.password):
            user.password
        }
    })
    }

    async toogleFavorite(productId: number, userId: number){
        const user = await this.byId(userId)

        if(!user) throw new NotFoundException('user not found')

        const isExists = user.favorites.some(product => product.id === productId)

        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                favorites: {
                    [isExists ? 'disconnect' : 'connect']: {
                        id: productId
                    }
                }
            }
        })

        return 'Success'
    }

}
