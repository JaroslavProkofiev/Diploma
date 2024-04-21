import { Module } from '@nestjs/common';
import { JaroslavService } from './jaroslav.service';
import { JaroslavController } from './jaroslav.controller';

@Module({
  controllers: [JaroslavController],
  providers: [JaroslavService],
})
export class JaroslavModule {}
