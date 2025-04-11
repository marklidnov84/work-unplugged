import { Request, Response } from 'express';
import { addToWaitlist, validateEmail } from '../services/waitlist-service';

export const signupWaitlist = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email || !validateEmail(email)) {
    res.status(400).json({ 
      success: false, 
      message: "Please provide a valid email address." 
    });
    return;
  }
  
  try {
    // Process the email signup
    const result = await addToWaitlist(email);
    
    console.log(`New waitlist signup: ${email}`);
    res.json(result);
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to join waitlist. Please try again later." 
    });
  }
}; 