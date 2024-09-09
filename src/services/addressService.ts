import { supabase } from '../config/supabase';
import { Address, NewAddress } from '../types';

export const getUserAddresses = async (userId: string): Promise<Address[]> => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data as Address[];
};

export const createAddress = async (userId: string, address: NewAddress): Promise<Address> => {
  const { data, error } = await supabase
    .from('addresses')
    .insert({ ...address, user_id: userId })
    .single();
  
  if (error) throw error;
  return data as Address;
};

export const getAddressById = async (userId: string, addressId: string): Promise<Address | null> => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', addressId)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data as Address | null;
};

export const updateAddress = async (userId: string, addressId: string, address: Partial<Address>): Promise<Address | null> => {
  const { data, error } = await supabase
    .from('addresses')
    .update(address)
    .eq('id', addressId)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data as Address | null;
};

export const deleteAddress = async (userId: string, addressId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', addressId)
    .eq('user_id', userId);
  
  if (error) throw error;
  return true;
};