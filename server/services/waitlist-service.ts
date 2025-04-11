import { supabase } from '../config/supabase';

export type WaitlistEntry = {
  email: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const addToWaitlist = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }]);
    
    if (error) {
      // Check if it's a duplicate email
      if (error.code === '23505') {
        return {
          success: true,
          message: "You're already on our waitlist!",
          isDuplicate: true
        };
      }
      
      throw error;
    }
    
    return {
      success: true,
      message: "Thank you for joining our waitlist!"
    };
  } catch (error) {
    console.error('Waitlist service error:', error);
    throw error;
  }
}; 