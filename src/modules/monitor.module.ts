import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { DatabaseService } from 'src/database.service';

@Module({
  controllers: [MonitorController],
  providers: [MonitorService, DatabaseService],
})
export class MonitorModule {}