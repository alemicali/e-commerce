
import { supabase } from '../config/supabase';
import { User, NewUser } from '../types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData: NewUser): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const { data, error } = await supabase
    .from('users')
    .insert({ ...userData, password_hash: hashedPassword })
    .single();

  if (error) throw error;
  return data as User;
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return token;
};
              