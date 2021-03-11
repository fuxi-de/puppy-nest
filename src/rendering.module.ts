import { Module } from '@nestjs/common';
import { RenderingController } from './rendering.controller';
import { RenderingService } from './rendering.service';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  imports: [PuppeteerModule.forRoot()],
  controllers: [RenderingController],
  providers: [RenderingService],
})
export class RenderingModule {}
