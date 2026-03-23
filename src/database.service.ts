import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sql from 'mssql';
import { dbConfig } from './db.config';
import { DefaultAzureCredential } from '@azure/identity';

@Injectable()
export class DatabaseService {
  private pool: sql.ConnectionPool;

  async getPool(): Promise<sql.ConnectionPool> {
    if (!this.pool) {
      const credential = new DefaultAzureCredential();
      const tokenResponse = await credential.getToken('https://database.windows.net/');

      this.pool = await sql.connect({
        ...dbConfig,
        authentication: {
          type: 'azure-active-directory-access-token',
          options: { token: tokenResponse.token },
        },
      });

      console.log('Connected to Fabric Warehouse using MFA');
    }
    return this.pool;
  }
}