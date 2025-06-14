import { Module } from '@nestjs/common';
import { RequestProfilerModule } from './request-profiler.module';

@Module({
  imports: [RequestProfilerModule],
})
export class AppModule {}
