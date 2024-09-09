// Esistenti
export interface Product {
  id: string;
  name: string;
  description: string;
  base_price: number;
  sku: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewProduct {
  name: string;
  description: string;
  base_price: number;
  sku: string;
  is_active?: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  order_date: string;
  shipping_address_id: string;
  billing_address_id: string;
  tracking_number?: string;
  coupon_id?: string;
}

export interface NewOrder {
  user_id: string;
  total_amount: number;
  shipping_address_id: string;
  billing_address_id: string;
  coupon_id?: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface NewCartItem {
  user_id: string;
  product_id: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export interface NewUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  phone_number?: string;
}

// Nuove interfacce
export interface Address {
  id: string;
  user_id: string;
  street_address: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface NewAddress {
  street_address: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface Category {
  id: string;
  name: string;
  parent_id?: string;
  description?: string;
}

export interface NewCategory {
  name: string;
  parent_id?: string;
  description?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
}

export interface NewProductImage {
  image_url: string;
  display_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price_adjustment: number;
  sku: string;
}

export interface NewProductVariant {
  name: string;
  price_adjustment: number;
  sku: string;
}

export interface Inventory {
  id: string;
  product_id: string;
  quantity: number;
  warehouse_location?: string;
}

export interface UpdateInventory {
  quantity: number;
  warehouse_location?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_amount?: number;
  discount_percentage?: number;
  valid_from: string;
  valid_to: string;
  usage_limit?: number;
  times_used: number;
}

export interface NewCoupon {
  code: string;
  discount_amount?: number;
  discount_percentage?: number;
  valid_from: string;
  valid_to: string;
  usage_limit?: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export interface NewOrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  payment_method: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed';
  payment_date: string;
}

export interface NewPayment {
  amount: number;
  payment_method: string;
  transaction_id?: string;
}

export interface Shipment {
  id: string;
  order_id: string;
  carrier: string;
  tracking_number?: string;
  status: 'pending' | 'shipped' | 'delivered';
  shipped_date?: string;
  estimated_delivery_date?: string;
}

export interface NewShipment {
  carrier: string;
  tracking_number?: string;
  status: 'pending' | 'shipped' | 'delivered';
  shipped_date?: string;
  estimated_delivery_date?: string;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface NewReview {
  rating: number;
  comment?: string;
}