import 'dotenv/config';
import app from 'app.js';
import { Server } from 'http';
import mongoose from 'mongoose';

const PORT = parseInt(process.env.PORT || '3000', 10);
const NODE_ENV = process.env.NODE_ENV;

let server: Server;

async function startServer() {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      throw new Error('Missing Google OAuth credentials in .env');
    }

    if (!process.env.SESSION_SECRET) {
      throw new Error('Missing SESSION_SECRET in .env');
    }
    
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${NODE_ENV}`);
      console.log(`🔗 Access: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server: ', err);
    process.exit(1);
  
  }
}

async function gracefulShutdown(signal: string) {
  console.log(`\n⚠️  ${signal} received, starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      console.log('✅ HTTP server closed');

      try {
        await mongoose.connection.close(false);
        console.log('✅ Database connection closed');

        console.log('👋 Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    });
  }

  setTimeout(() => {
    console.error('❌ Forcing shutdown after 30s timeout');
    process.exit(1);
  }, 30000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

startServer();