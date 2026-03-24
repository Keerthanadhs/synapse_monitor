import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { dbConfig } from './db.config';
import { DefaultAzureCredential } from '@azure/identity';

@Injectable()
export class DatabaseService {
  private pool: sql.ConnectionPool | null = null;

  async getPool(): Promise<sql.ConnectionPool> {
    if (this.pool) {
      console.log('[DatabaseService] Returning existing pool');
      return this.pool;
    }

    console.log('[DatabaseService] Creating new database connection pool...');
    try {
      const credential = new DefaultAzureCredential();
      console.log('[DatabaseService] Acquiring Azure token...');
      const tokenResponse = await credential.getToken(
        'https://database.windows.net/.default'
      );

      if (!tokenResponse || !tokenResponse.token) {
        throw new Error('Token acquisition failed');
      }

      console.log('[DatabaseService] Token acquired successfully');

      console.log('[DatabaseService] Connecting to SQL with token...');
      this.pool = await sql.connect({
        ...dbConfig,
        authentication: {
          type: 'azure-active-directory-access-token',
          options: {
            token: tokenResponse.token,
          },
        },
      });

      console.log('[DatabaseService] Database connection established');
      return this.pool;
    } catch (error) {
      console.error('[DatabaseService] DB Connection Failed:', error);
      throw error;
    }
  }
}