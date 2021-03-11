import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { RenderingService } from './rendering.service';

@Controller('/prerender')
export class RenderingController {
  constructor(private readonly renderingService: RenderingService) {}

  @Get()
  async getPrerenderedPage(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const { url } = req.query;
    const { html, ttRenderMs } = await this.renderingService.render(url);
    res.set(
      'Server-Timing',
      `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`,
    );
    return res.send(html);
  }
}
