import { supabase } from '../config/supabase';
import { Coupon, NewCoupon } from '../types';

export const getAllCoupons = async (): Promise<Coupon[]> => {
  const { data, error } = await supabase
    .from('coupons')
    .select('*');
  
  if (error) throw error;
  return data as Coupon[];
};

export const createCoupon = async (coupon: NewCoupon): Promise<Coupon> => {
  const { data, error } = await supabase
    .from('coupons')
    .insert(coupon)
    .single();
  
  if (error) throw error;
  return data as Coupon;
};

export const getCouponById = async (couponId: string): Promise<Coupon | null> => {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('id', couponId)
    .single();
  
  if (error) throw error;
  return data as Coupon | null;
};

export const updateCoupon = async (couponId: string, coupon: Partial<Coupon>): Promise<Coupon | null> => {
  const { data, error } = await supabase
    .from('coupons')
    .update(coupon)
    .eq('id', couponId)
    .single();
  
  if (error) throw error;
  return data as Coupon | null;
};

export const deleteCoupon = async (couponId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('coupons')
    .delete()
    .eq('id', couponId);
  
  if (error) throw error;
  return true;
};