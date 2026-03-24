import * as sql from 'mssql';

export const dbConfig: sql.config = {
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,

  authentication: {
    type: 'default', 
  },

  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};