import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { MonitorModule } from './modules/monitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    MonitorModule,
  ],
})
export class AppModule {}