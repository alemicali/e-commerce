import { NewProduct, NewOrder, NewCartItem, NewUser, NewAddress, NewCategory, NewProductImage, NewProductVariant, UpdateInventory, NewCoupon, NewOrderItem, NewPayment, NewShipment, NewReview, User } from '../types';

export const validateProduct = (product: NewProduct): string[] => {
  const errors: string[] = [];

  if (!product.name || product.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!product.description || product.description.trim() === '') {
    errors.push('Description is required');
  }

  if (typeof product.base_price !== 'number' || product.base_price <= 0) {
    errors.push('Base price must be a positive number');
  }

  if (!product.sku || product.sku.trim() === '') {
    errors.push('SKU is required');
  }

  return errors;
};

export const validateOrder = (order: NewOrder): string[] => {
  const errors: string[] = [];

  if (!order.user_id || order.user_id.trim() === '') {
    errors.push('User ID is required');
  }

  if (typeof order.total_amount !== 'number' || order.total_amount <= 0) {
    errors.push('Total amount must be a positive number');
  }

  if (!order.shipping_address_id || order.shipping_address_id.trim() === '') {
    errors.push('Shipping address ID is required');
  }

  if (!order.billing_address_id || order.billing_address_id.trim() === '') {
    errors.push('Billing address ID is required');
  }

  return errors;
};

export const validateCartItem = (cartItem: NewCartItem): string[] => {
  const errors: string[] = [];

  if (!cartItem.user_id || cartItem.user_id.trim() === '') {
    errors.push('User ID is required');
  }

  if (!cartItem.product_id || cartItem.product_id.trim() === '') {
    errors.push('Product ID is required');
  }

  if (typeof cartItem.quantity !== 'number' || cartItem.quantity <= 0) {
    errors.push('Quantity must be a positive number');
  }

  return errors;
};

export const validateUser = (user: NewUser): string[] => {
  const errors: string[] = [];

  if (!user.email || user.email.trim() === '') {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.push('Email is invalid');
  }

  if (!user.password || user.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!user.first_name || user.first_name.trim() === '') {
    errors.push('First name is required');
  }

  if (!user.last_name || user.last_name.trim() === '') {
    errors.push('Last name is required');
  }

  return errors;
};

export const validateUserUpdate = (user: Partial<User>): string[] => {
  const errors: string[] = [];

  if (user.first_name !== undefined && user.first_name.trim() === '') {
    errors.push('First name cannot be empty');
  }

  if (user.last_name !== undefined && user.last_name.trim() === '') {
    errors.push('Last name cannot be empty');
  }

  if (user.email !== undefined) {
    if (user.email.trim() === '') {
      errors.push('Email cannot be empty');
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.push('Email is invalid');
    }
  }

  return errors;
};

export const validateAddress = (address: NewAddress): string[] => {
  const errors: string[] = [];

  if (!address.street_address || address.street_address.trim() === '') {
    errors.push('Street address is required');
  }

  if (!address.city || address.city.trim() === '') {
    errors.push('City is required');
  }

  if (!address.postal_code || address.postal_code.trim() === '') {
    errors.push('Postal code is required');
  }

  if (!address.country || address.country.trim() === '') {
    errors.push('Country is required');
  }

  return errors;
};

export const validateCategory = (category: NewCategory): string[] => {
  const errors: string[] = [];

  if (!category.name || category.name.trim() === '') {
    errors.push('Category name is required');
  }

  return errors;
};

export const validateProductImage = (image: NewProductImage): string[] => {
  const errors: string[] = [];

  if (!image.image_url || image.image_url.trim() === '') {
    errors.push('Image URL is required');
  }

  if (typeof image.display_order !== 'number' || image.display_order < 0) {
    errors.push('Display order must be a non-negative number');
  }

  return errors;
};

export const validateProductVariant = (variant: NewProductVariant): string[] => {
  const errors: string[] = [];

  if (!variant.name || variant.name.trim() === '') {
    errors.push('Variant name is required');
  }

  if (typeof variant.price_adjustment !== 'number') {
    errors.push('Price adjustment must be a number');
  }

  if (!variant.sku || variant.sku.trim() === '') {
    errors.push('SKU is required');
  }

  return errors;
};

export const validateInventory = (inventory: UpdateInventory): string[] => {
  const errors: string[] = [];

  if (typeof inventory.quantity !== 'number' || inventory.quantity < 0) {
    errors.push('Quantity must be a non-negative number');
  }

  return errors;
};

export const validateCoupon = (coupon: NewCoupon): string[] => {
  const errors: string[] = [];

  if (!coupon.code || coupon.code.trim() === '') {
    errors.push('Coupon code is required');
  }

  if (coupon.discount_amount === undefined && coupon.discount_percentage === undefined) {
    errors.push('Either discount amount or discount percentage must be provided');
  }

  if (coupon.discount_amount !== undefined && (typeof coupon.discount_amount !== 'number' || coupon.discount_amount <= 0)) {
    errors.push('Discount amount must be a positive number');
  }

  if (coupon.discount_percentage !== undefined && (typeof coupon.discount_percentage !== 'number' || coupon.discount_percentage <= 0 || coupon.discount_percentage > 100)) {
    errors.push('Discount percentage must be a number between 0 and 100');
  }

  if (!coupon.valid_from || isNaN(Date.parse(coupon.valid_from))) {
    errors.push('Valid from date is required and must be a valid date');
  }

  if (!coupon.valid_to || isNaN(Date.parse(coupon.valid_to))) {
    errors.push('Valid to date is required and must be a valid date');
  }

  return errors;
};

export const validateOrderItem = (item: NewOrderItem): string[] => {
  const errors: string[] = [];

  if (!item.product_id || item.product_id.trim() === '') {
    errors.push('Product ID is required');
  }

  if (typeof item.quantity !== 'number' || item.quantity <= 0) {
    errors.push('Quantity must be a positive number');
  }

  if (typeof item.price !== 'number' || item.price <= 0) {
    errors.push('Price must be a positive number');
  }

  return errors;
};

export const validatePayment = (payment: NewPayment): string[] => {
  const errors: string[] = [];

  if (typeof payment.amount !== 'number' || payment.amount <= 0) {
    errors.push('Payment amount must be a positive number');
  }

  if (!payment.payment_method || payment.payment_method.trim() === '') {
    errors.push('Payment method is required');
  }

  return errors;
};

export const validateShipment = (shipment: NewShipment): string[] => {
  const errors: string[] = [];

  if (!shipment.carrier || shipment.carrier.trim() === '') {
    errors.push('Carrier is required');
  }

  if (!['pending', 'shipped', 'delivered'].includes(shipment.status)) {
    errors.push('Invalid shipment status');
  }

  if (shipment.shipped_date && isNaN(Date.parse(shipment.shipped_date))) {
    errors.push('Shipped date must be a valid date');
  }

  if (shipment.estimated_delivery_date && isNaN(Date.parse(shipment.estimated_delivery_date))) {
    errors.push('Estimated delivery date must be a valid date');
  }

  return errors;
};

export const validateReview = (review: NewReview): string[] => {
  const errors: string[] = [];

  if (typeof review.rating !== 'number' || review.rating < 1 || review.rating > 5) {
    errors.push('Rating must be a number between 1 and 5');
  }

  return errors;
};