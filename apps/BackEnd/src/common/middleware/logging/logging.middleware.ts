import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    res.on('finish', () => {
      console.log(
        `Request method: ${req.method}, Request URL: ${req.originalUrl}`,
      );
      console.timeEnd('Request-response time');
    });
    next();
  }
}
