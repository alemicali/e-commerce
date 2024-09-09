import { supabase } from '../config/supabase';
import { User } from '../types';

export const registerUser = async (email: string, password: string, first_name: string, last_name: string): Promise<User> => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({ id: authData.user!.id, email, first_name, last_name })
    .single();

  if (userError) throw userError;

  return userData as User;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
};

export const getUserProfile = async (userId: string): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data as User;
};

export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data as User;
};
