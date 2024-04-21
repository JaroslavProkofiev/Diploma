import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserauthModule } from './userauth/userauth.module';
import { PrismaService } from './prisma.service';
import { JaroslavModule } from './jaroslav/jaroslav.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UserauthModule, JaroslavModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
