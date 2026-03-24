import { Controller, Get } from '@nestjs/common';
import { MonitorService } from './monitor.service';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get('pipeline')
  getPipeline() {
    return this.monitorService.getPipelineRuns();
  }

  @Get('activity')
  getActivity() {
    return this.monitorService.getActivityRuns();
  }
}