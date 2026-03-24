import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class MonitorService {
  constructor(private readonly dbService: DatabaseService) {}

  async getPipelineRuns() {
    const pool = await this.dbService.getPool();

    const result = await pool.request().query(`
      SELECT * 
      FROM dbo.pipeline_run_stg
      ORDER BY last_updated DESC
    `);

    return result.recordset;
  }

  async getActivityRuns() {
    const pool = await this.dbService.getPool();

    const result = await pool.request().query(`
      SELECT * 
      FROM dbo.activity_run_stg
      ORDER BY last_updated DESC
    `);

    return result.recordset;
  }
}