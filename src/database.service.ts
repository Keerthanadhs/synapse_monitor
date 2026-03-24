import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { dbConfig } from './db.config';

@Injectable()
export class DatabaseService {
  private pool: sql.ConnectionPool;

  async getPool(): Promise<sql.ConnectionPool> {
    if (!this.pool) {
      console.log('[DatabaseService] Creating SQL connection...');
      this.pool = await sql.connect(dbConfig);
      console.log('[DatabaseService] Connected to SQL Database');
    }
    return this.pool;
  }
}