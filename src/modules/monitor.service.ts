import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class MonitorService {
  constructor(private readonly dbService: DatabaseService) {}

  async getPipelineRuns() {
    const pool = await this.dbService.getPool();

    const result = await pool.request().query(`
      SELECT * 
      FROM audit.pipeline_run
      ORDER BY run_end DESC
    `);

    return result.recordset;
  }

  async getActivityRuns() {
    const pool = await this.dbService.getPool();

    const result = await pool.request().query(`
      SELECT * 
      FROM audit.activity_run
      ORDER BY activity_run_end DESC
    `);

    return result.recordset;
  }
}