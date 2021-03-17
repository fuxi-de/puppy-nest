<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">SSR Service for usage in NestJS Applications</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

## What is this?

This package is a NestJS Module which implements a simple SSR function to prerender any SPA via Puppeteer and return the rendered HTML back to the client. Because these are the times we live in :). 

Why you would ever want to use this technique is perfectly described [here](https://developers.google.com/web/tools/puppeteer/articles/ssr#2_ssr_function) by Eric Bidelman. Long story short, it takes very little changes to your SPA to make SSR work this way, without refactoring your SPA to some SSR Framework like __NUXT__ or __NEXT__. You can even just serve the prerendered Markup to the google bot and let your users use the normal SPA. 

In the example he uses express, but as I personally prefer NestJS and Typescript, thats how I implemented what he describes in the article.

### Installation

You can add this Module to any Nest Application by installing it via Yarn

```bash
yarn add @fuxifuchs/puppy-nest
```

Afterwards all you need to do is import the module into your Application Module and you should be good to go.

```js
import { Module } from '@nestjs/common';
import { RenderingModule } from '@fuxifuchs/puppy-nest';

@Module({
  imports: [RenderingModule],
})
export class AppModule {}
```

### Usage

After installing the package and adding it to your Application Module you should see that there is a new route when running your Nest Application locally via:

```bash
yarn start:dev
```

There should be some console output looking like the following:

```bash
[Nest] 39175   - 2021-03-11 16:48:54   [RoutesResolver] RenderingController {/prerender}: +4ms
[Nest] 39175   - 2021-03-11 16:48:54   [RouterExplorer] Mapped {/prerender, GET} route +3ms
```

This means, that all went as expected and your application now accepts **GET** requests under the _/prerender_ endpoint. This is coming straight from the **Rendering.module**. The _/prerender_ endpoint needs to be called with a query param called **url** which specifies what Resource should be prerendered and a query param called **selector** which specifies which HTML Selector should be waited for and will return the rendered HTML and how long the Headless rendering took as response.

An example Request would look like this:

```bash
curl --location --request GET 'http://localhost:3000/prerender/?url=https://google.de&selector=body'
```

For any changes required to your SPA to make this technique work, please refer to the [Article](https://developers.google.com/web/tools/puppeteer/articles/ssr#2_ssr_function) by Eric Bidelman as he already described what is necessary in great detail :). 
## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
