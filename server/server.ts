import express from "express";
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend requests
const allowedOrigins = [
  'http://localhost:3001',                // Local development
  'https://work-unplugged-client.vercel.app',  // Production client
  'https://work-unplugged.vercel.app'          // Production client (alternative domain)
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// API Routes - all under /api prefix
app.use('/api', routes);

app.get('/', (req, res) => {
  res.redirect('/health');
})

// API health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Error handling middleware
app.use(errorHandler);

// Only listen when not deployed to Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
    console.log(`API is available at http://localhost:${PORT}/health`);
  });
}

// Export for Vercel serverless deployment
export default app; 