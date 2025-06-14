import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestProfilerService } from './request-profiler.service';
import { ProfilerMiddleware } from './profiler.middleware';
import { ProfilerController } from './profiler.controller';


@Module({
  providers: [RequestProfilerService],
  controllers: [ProfilerController],
})
export class RequestProfilerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProfilerMiddleware).forRoutes('*');
  }
}