import { supabase } from '../config/supabase';
import { OrderItem, NewOrderItem } from '../types';

export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data as OrderItem[];
};

export const addOrderItem = async (orderId: string, item: NewOrderItem): Promise<OrderItem> => {
  const { data, error } = await supabase
    .from('order_items')
    .insert({ ...item, order_id: orderId })
    .single();
  
  if (error) throw error;
  return data as OrderItem;
};

export const deleteOrderItem = async (orderId: string, itemId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('order_items')
    .delete()
    .eq('id', itemId)
    .eq('order_id', orderId);
  
  if (error) throw error;
  return true;
};