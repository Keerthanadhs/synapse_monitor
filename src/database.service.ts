import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { dbConfig } from './db.config';
import { ManagedIdentityCredential } from '@azure/identity';

@Injectable()
export class DatabaseService {
  private pool: sql.ConnectionPool | null = null;
  private credential = new ManagedIdentityCredential(); // Uses App Service Managed Identity

  // Function to get a fresh pool
  async getPool(): Promise<sql.ConnectionPool> {
    if (this.pool) {
      console.log('[DatabaseService] Returning existing pool');
      return this.pool;
    }

    console.log('[DatabaseService] Creating new database connection pool...');
    try {
      // Acquire access token for SQL
      console.log('[DatabaseService] Acquiring token via Managed Identity...');
      const tokenResponse = await this.credential.getToken(
        'https://database.windows.net/.default'
      );

      if (!tokenResponse?.token) {
        throw new Error('Token acquisition failed');
      }
      console.log(
        `[DatabaseService] Token acquired, length=${tokenResponse.token.length}`
      );

      // Connect to SQL using AAD token
      console.log('[DatabaseService] Connecting to SQL...');
      this.pool = await sql.connect({
        ...dbConfig,
        authentication: {
          type: 'azure-active-directory-access-token',
          options: {
            token: tokenResponse.token,
          },
        },
        options: {
          encrypt: true, // required for Azure SQL
          enableArithAbort: true,
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