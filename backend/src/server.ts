import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { locationsRouter } from './routes/locations.js';
import { equidistantRouter } from './routes/equidistant.js';
import { venuesRouter } from './routes/venues.js';
import { directionsRouter } from './routes/directions.js';

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Rate limiting - 100 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isProduction ? 100 : 1000, // More permissive in development
  message: { 
    success: false, 
    error: 'Trop de requêtes, veuillez réessayer dans une minute.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'https://lemiddle.app', // Production domain
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

// #region agent log
console.log('[DEBUG-STARTUP] CORS config:', { isProduction, allowedOrigins, FRONTEND_URL: process.env.FRONTEND_URL });
// #endregion

// Apply rate limiter AFTER CORS for preflight requests
app.use(cors({
  origin: (origin, callback) => {
    // #region agent log
    console.log('[DEBUG-CORS-H1H2H4] Origin check:', { origin, isProduction, allowedOrigins });
    // #endregion
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
      // #region agent log
      console.log('[DEBUG-CORS] No origin, allowing');
      // #endregion
      return callback(null, true);
    }
    
    // Allow localhost in development
    if (!isProduction) {
      // #region agent log
      console.log('[DEBUG-CORS] Dev mode, allowing');
      // #endregion
      return callback(null, true);
    }
    
    // Check explicit allowed origins
    if (allowedOrigins.includes(origin)) {
      // #region agent log
      console.log('[DEBUG-CORS] Explicit origin match, allowing:', origin);
      // #endregion
      return callback(null, true);
    }
    
    // Allow Vercel preview deployments (*.vercel.app)
    if (origin.endsWith('.vercel.app')) {
      // #region agent log
      console.log('[DEBUG-CORS] Vercel preview match, allowing');
      // #endregion
      return callback(null, true);
    }
    
    // #region agent log
    console.warn('[DEBUG-CORS-H1] BLOCKED origin:', origin, 'Returning false instead of error');
    // #endregion
    // Return false instead of throwing error to avoid 500
    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(limiter);
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/locations', locationsRouter);
app.use('/api/equidistant', equidistantRouter);
app.use('/api/venues', venuesRouter);
app.use('/api/directions', directionsRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Le Middle API server running on port ${PORT}`);
  console.log(`📍 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`🔑 Google Places API Key: ${process.env.GOOGLE_PLACES_API_KEY ? 'CONFIGURED ✅' : 'MISSING ❌'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'NOT SET (using *.vercel.app)'}`);
});

