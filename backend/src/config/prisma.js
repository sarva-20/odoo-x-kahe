const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const config = require('./config');

const databaseUrl = config.database.url;
if (!databaseUrl) {
  throw new Error('FATAL ERROR: DATABASE_URL is not defined.');
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

const prisma = new PrismaClient({ adapter });

module.exports = prisma;

