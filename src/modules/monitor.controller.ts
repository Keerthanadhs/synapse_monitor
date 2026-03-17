import { Controller, Get } from '@nestjs/common';
import { MonitorService } from './monitor.service';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get('pipeline')
  async getPipeline() {
    return this.monitorService.getPipelineRuns();
  }

  @Get('activity')
  async getActivity() {
    return this.monitorService.getActivityRuns();
  }
}