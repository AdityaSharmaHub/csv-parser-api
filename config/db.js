const { Pool } = require("pg");
require("dotenv").config();

// Use connection string if available, otherwise use individual params
const connectionString = process.env.DATABASE_URL;

if (connectionString) {
  console.log("🔌 Using DATABASE_URL connection string");
  // Debug: Show first part of connection string (without password)
  const urlParts = connectionString.split('@');
  if (urlParts.length > 1) {
    console.log(`   Host: ${urlParts[1].split(':')[0]}`);
  }
} else {
  console.log("🔌 Using individual database parameters");
  console.log(`   Host: ${process.env.PGHOST}`);
  console.log(`   Database: ${process.env.PGDATABASE}`);
  console.log(`   User: ${process.env.PGUSER}`);
  console.log(`   Port: ${process.env.PGPORT}`);
}

const pool = new Pool(
  connectionString ? {
    connectionString,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 20,
    min: 1
  } : {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT || 5432,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 20,
    min: 1
  }
);

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Test connection function
async function testConnection() {
  try {
    console.log('🔍 Attempting to connect to database...');
    const client = await pool.connect();
    console.log('✅ Database connection test successful');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Database connection test failed:', err.message);
    console.error('🔍 Error details:', {
      code: err.code,
      errno: err.errno,
      syscall: err.syscall
    });
    return false;
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  testConnection
};
