import express from 'express';
import { signupWaitlist } from '../controllers/waitlist-controller';

const router = express.Router();

// Waitlist signup endpoint
router.post('/signup', signupWaitlist);

export default router; 