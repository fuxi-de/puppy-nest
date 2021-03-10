import { Injectable } from '@nestjs/common';
import type { Browser } from 'puppeteer';
import { InjectBrowser } from 'nest-puppeteer';
import ssrDto from './ssr.dto';

@Injectable()
export class RenderingService {
  constructor(@InjectBrowser() private readonly browser: Browser) {
    this.browser = browser;
  }
  async render(url): Promise<ssrDto> {
    const start = Date.now();

    const page = await this.browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
    } catch (err) {
      console.error(err);
      throw new Error('page.goto/waitForSelector timed out.');
    }

    const html = await page.content();

    const ttRenderMs = Date.now() - start;
    console.info(`Headless rendered page in: ${ttRenderMs}ms`);

    return { html, ttRenderMs };
  }
}
