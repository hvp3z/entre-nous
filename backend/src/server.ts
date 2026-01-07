import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { locationsRouter } from './routes/locations.js';
import { equidistantRouter } from './routes/equidistant.js';
import { venuesRouter } from './routes/venues.js';
import { directionsRouter } from './routes/directions.js';

dotenv.config();

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
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(limiter);
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || !isProduction) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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
  console.log(`🚀 Entre Nous API server running on port ${PORT}`);
});

