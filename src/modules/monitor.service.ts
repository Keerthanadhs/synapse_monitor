import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class MonitorService {
  constructor(private readonly dbService: DatabaseService) {}

  async getPipelineRuns() {
    try {
      console.log('[MonitorService] Fetching pipeline runs...');
      const pool = await this.dbService.getPool();

      if (!pool) {
        console.error('[MonitorService] Pool is undefined. DB connection failed');
        throw new Error('Database connection not established');
      }

      console.log('[MonitorService] Pool acquired, executing query...');
      console.log('[MonitorService] Query: SELECT * FROM dbo.pipeline_run_stg');

      const result = await pool.request().query(`
        SELECT * 
        FROM dbo.pipeline_run_stg
        ORDER BY last_updated DESC
      `);

      console.log(
        `[MonitorService] Query successful, rows returned: ${result.recordset.length}`
      );
      return result.recordset;
    } catch (error) {
      console.error('[MonitorService] Error in getPipelineRuns:', error);
      throw error;
    }
  }

  async getActivityRuns() {
    try {
      console.log('[MonitorService] Fetching activity runs...');
      const pool = await this.dbService.getPool();

      if (!pool) {
        console.error('[MonitorService] Pool is undefined. DB connection failed');
        throw new Error('Database connection not established');
      }

      console.log('[MonitorService] Pool acquired, executing query...');
      console.log('[MonitorService] Query: SELECT * FROM dbo.activity_run_stg');

      const result = await pool.request().query(`
        SELECT * 
        FROM dbo.activity_run_stg
        ORDER BY last_updated DESC
      `);

      console.log(
        `[MonitorService] Query successful, rows returned: ${result.recordset.length}`
      );
      return result.recordset;
    } catch (error) {
      console.error('[MonitorService] Error in getActivityRuns:', error);
      throw error;
    }
  }
}