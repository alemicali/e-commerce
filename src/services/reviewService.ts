import { supabase } from '../config/supabase';
import { Review, NewReview } from '../types';

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId);
  
  if (error) throw error;
  return data as Review[];
};

export const createReview = async (productId: string, userId: string, review: NewReview): Promise<Review> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert({ ...review, product_id: productId, user_id: userId })
    .single();
  
  if (error) throw error;
  return data as Review;
};

export const getReviewById = async (productId: string, reviewId: string): Promise<Review | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', reviewId)
    .eq('product_id', productId)
    .single();
  
  if (error) throw error;
  return data as Review | null;
};

export const updateReview = async (productId: string, reviewId: string, userId: string, review: Partial<Review>): Promise<Review | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .update(review)
    .eq('id', reviewId)
    .eq('product_id', productId)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data as Review | null;
};

export const deleteReview = async (productId: string, reviewId: string, userId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('product_id', productId)
    .eq('user_id', userId);
  
  if (error) throw error;
  return true;
};