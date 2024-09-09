import { supabase } from '../config/supabase';
import { Shipment, NewShipment } from '../types';

export const getOrderShipments = async (orderId: string): Promise<Shipment[]> => {
  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data as Shipment[];
};

export const createShipment = async (orderId: string, shipment: NewShipment): Promise<Shipment> => {
  const { data, error } = await supabase
    .from('shipments')
    .insert({ ...shipment, order_id: orderId })
    .single();
  
  if (error) throw error;
  return data as Shipment;
};

export const getShipmentById = async (orderId: string, shipmentId: string): Promise<Shipment | null> => {
  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .eq('id', shipmentId)
    .eq('order_id', orderId)
    .single();
  
  if (error) throw error;
  return data as Shipment | null;
};

export const updateShipment = async (orderId: string, shipmentId: string, shipment: Partial<Shipment>): Promise<Shipment | null> => {
  const { data, error } = await supabase
    .from('shipments')
    .update(shipment)
    .eq('id', shipmentId)
    .eq('order_id', orderId)
    .single();
  
  if (error) throw error;
  return data as Shipment | null;
};