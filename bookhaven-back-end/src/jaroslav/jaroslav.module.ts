import { Module } from '@nestjs/common';
import { JaroslavService } from './jaroslav.service';
import { JaroslavController } from './jaroslav.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JaroslavController],
  providers: [JaroslavService, PrismaService],
})
export class JaroslavModule {}
