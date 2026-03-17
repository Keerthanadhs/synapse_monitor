import * as sql from 'mssql';

export const dbConfig: sql.config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,

  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};