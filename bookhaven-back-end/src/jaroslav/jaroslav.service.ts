import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { jaroslavObject } from './jaroslav.object';
import { error } from 'console';
import { Prisma } from '@prisma/client';
import { UserAuthDto } from 'src/userauth/userauth.dto';

@Injectable()
export class JaroslavService {
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
        
    }
}
