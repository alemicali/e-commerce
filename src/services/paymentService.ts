import { supabase } from '../config/supabase';
import { Payment, NewPayment } from '../types';

export const getOrderPayments = async (orderId: string): Promise<Payment[]> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data as Payment[];
};

export const createPayment = async (orderId: string, payment: NewPayment): Promise<Payment> => {
  const { data, error } = await supabase
    .from('payments')
    .insert({ ...payment, order_id: orderId })
    .single();
  
  if (error) throw error;
  return data as Payment;
};

export const getPaymentById = async (orderId: string, paymentId: string): Promise<Payment | null> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('id', paymentId)
    .eq('order_id', orderId)
    .single();
  
  if (error) throw error;
  return data as Payment | null;
};