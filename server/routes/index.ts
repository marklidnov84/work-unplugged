import express from 'express';
import waitlistRoutes from './waitlist-routes';

const router = express.Router();

// Mount all route modules
router.use('/waitlist', waitlistRoutes);

export default router; 