
              import { supabase } from '../config/supabase';
              import { Order, NewOrder } from '../types';
              
              export const getAllOrders = async (filters: any): Promise<Order[]> => {
                const { data, error } = await supabase
                  .from('orders')
                  .select('*')
                  .match(filters);
                
                if (error) throw error;
                return data as Order[];
              };
              
              export const createOrder = async (order: NewOrder): Promise<Order> => {
                const { data, error } = await supabase
                  .from('orders')
                  .insert(order)
                  .single();
                
                if (error) throw error;
                return data as Order;
              };
              
              export const getOrderById = async (id: string): Promise<Order | null> => {
                const { data, error } = await supabase
                  .from('orders')
                  .select('*')
                  .eq('id', id)
                  .single();
                
                if (error) throw error;
                return data as Order | null;
              };
              
              export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order | null> => {
                const { data, error } = await supabase
                  .from('orders')
                  .update(order)
                  .eq('id', id)
                  .single();
                
                if (error) throw error;
                return data as Order | null;
              };
                            