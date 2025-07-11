import { createConnection } from 'typeorm';
import { connect as mongooseConnect } from 'mongoose';
import 'dotenv/config';

async function testDatabaseConnections() {
  console.log('Testing database connections...\n');
  
  // Test PostgreSQL connection
  console.log('Testing PostgreSQL (Neon) connection...');
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      },
      synchronize: false,
      logging: false
    });
    
    console.log('✅ PostgreSQL connection successful!');
    console.log(`Database: ${connection.options.database}`);
    console.log(`Host: ${process.env.DB_HOST}`);
    
    await connection.close();
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
  }
  
  // Test MongoDB connection
  console.log('\nTesting MongoDB connection...');
  try {
    const mongoConnection = await mongooseConnect(process.env.MONGO_URI || '');
    console.log('✅ MongoDB connection successful!');
    console.log(`Database: ${mongoConnection.connection.name}`);
    console.log(`Host: ${mongoConnection.connection.host}`);
    
    await mongoConnection.disconnect();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testDatabaseConnections();
