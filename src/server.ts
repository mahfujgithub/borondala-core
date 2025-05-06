import { PrismaClient } from '@prisma/client';
import app from './app';
import config from './config';
import { Server } from 'http';

const prisma = new PrismaClient();
let server: Server;

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

async function bootstrap() {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log('✅ PostgreSQL database connected successfully!');

    // Start server
    server = app.listen(config.port, () => {
      console.log(`🚀 App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  }

  /**
   * Handle unhandled promise rejections
   */
  process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

/**
 * Handle SIGTERM
 */
process.on('SIGTERM', () => {
  console.info('SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close();
  }
  prisma.$disconnect();
});

bootstrap();
