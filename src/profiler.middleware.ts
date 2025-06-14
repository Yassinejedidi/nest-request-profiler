import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestProfilerService } from './request-profiler.service';

@Injectable()
export class ProfilerMiddleware implements NestMiddleware {
  constructor(private profiler: RequestProfilerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Exclude profiler dashboard and API routes
    const url = req.originalUrl;

    if (url.startsWith('/__profiler') || url === '/favicon.ico') {
      return next();
    }

    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      this.profiler.logRequest(req.path, duration, res.statusCode);
    });

    next();
  }
}
