import { Controller } from '@nestjs/common';
import { JaroslavService } from './jaroslav.service';

@Controller('jaroslav')
export class JaroslavController {
  constructor(private readonly jaroslavService: JaroslavService) {}
}
