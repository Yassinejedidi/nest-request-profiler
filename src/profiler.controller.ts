import { Controller, Get, Res } from '@nestjs/common';
import { RequestProfilerService } from './request-profiler.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('__profiler')
export class ProfilerController {
  constructor(private profiler: RequestProfilerService) {}

  @Get()
  getDashboard(@Res() res: Response) {
    res.sendFile(path.resolve(__dirname, '..', 'static', 'index.html'));
  }

  @Get('data')
  getStats() {
    return this.profiler.getStats();
  }
}
