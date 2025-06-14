import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestProfilerService {
  private stats = new Map<string, any>();

  logRequest(path: string, duration: number, status: number) {
    const entry = this.stats.get(path) || {
      count: 0,
      totalDuration: 0,
      avgDuration: 0,
      statuses: {},
    };

    entry.count += 1;
    entry.totalDuration += duration;
    entry.avgDuration = entry.totalDuration / entry.count;
    entry.statuses[status] = (entry.statuses[status] || 0) + 1;

    this.stats.set(path, entry);
  }

  getStats() {
    return Array.from(this.stats.entries()).map(([path, data]) => ({
      path,
      ...data,
    }));
  }
}
