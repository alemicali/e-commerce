import request from 'supertest';
import { supabase } from '../../src/config/supabase';
import app from '../../src/app';
import { Product } from '../../src/types';
import jwt from 'jsonwebtoken';
import { config } from '../../src/config/config';

describe('Product Integration Tests', () => {
  let testProduct: Product;
  let authorizationToken: string;
  let testCategoryId: number;

  function generateUniqueSKU(): string {
    return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  beforeAll(async () => {
    // Genera un token di autenticazione per i test
    authorizationToken = jwt.sign({ clientId: 'test-client' }, config.JWT_SECRET, { expiresIn: '1h' });
  });

  beforeEach(async () => {
    // Pulisci il database prima di ogni test
    await supabase.from('product_categories').delete().neq('product_id', 0);
    await supabase.from('products').delete().neq('id', 0);
    await supabase.from('categories').delete().neq('id', 0);

    // Crea una categoria di test
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert({ name: 'Test Category' })
      .select()
      .single();

    if (categoryError) throw categoryError;
    testCategoryId = categoryData.id;

    // Crea un prodotto di test
    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert({
        name: 'Test Product',
        description: 'This is a test product',
        base_price: 19.99,
        sku: generateUniqueSKU(),
        is_active: true
      })
      .select()
      .single();

    if (productError) throw productError;
    testProduct = productData as Product;

    // Associa il prodotto alla categoria
    const { error: relationError } = await supabase
      .from('product_categories')
      .insert({ product_id: testProduct.id, category_id: testCategoryId });

    if (relationError) throw relationError;
  });

  afterAll(async () => {
    // Pulisci il database dopo tutti i test
    await supabase.from('product_categories').delete().neq('product_id', 0);
    await supabase.from('products').delete().neq('id', 0);
    await supabase.from('categories').delete().neq('id', 0);
  });

  describe('GET /v1/products', () => {
    it('should return all products', async () => {
      const response = await request(app)
        .get('/v1/products')
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('base_price');
      expect(response.body[0]).toHaveProperty('sku');
    });
  });

  describe('GET /v1/products/:id', () => {
    it('should return a product when given a valid id', async () => {
      const response = await request(app)
        .get(`/v1/products/${testProduct.id}`)
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testProduct.id);
      expect(response.body).toHaveProperty('name', testProduct.name);
      expect(response.body).toHaveProperty('description', testProduct.description);
      expect(response.body).toHaveProperty('base_price', testProduct.base_price);
      expect(response.body).toHaveProperty('sku', testProduct.sku);
    });

    it('should return 404 when product is not found', async () => {
      const response = await request(app)
        .get('/v1/products/999999')
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    });
  });

  describe('POST /v1/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Test Product',
        description: 'This is a new test product',
        base_price: 29.99,
        sku: generateUniqueSKU(),
        is_active: true
      };

      const response = await request(app)
        .post('/v1/products')
        .send(newProduct)
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newProduct.name);
      expect(response.body).toHaveProperty('description', newProduct.description);
      expect(response.body).toHaveProperty('base_price', newProduct.base_price);
      expect(response.body).toHaveProperty('sku', newProduct.sku);

      // Verifica che il prodotto sia stato effettivamente creato nel database
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', response.body.id)
        .single();

      expect(error).toBeNull();
      expect(data).toMatchObject(newProduct);
    });

    it('should return 400 for invalid product data', async () => {
      const invalidProduct = {
        name: '',
        description: 'Invalid product',
        base_price: -10,
        sku: '',
      };

      const response = await request(app)
        .post('/v1/products')
        .send(invalidProduct)
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toContain('Name is required');
      expect(response.body.errors).toContain('Base price must be a positive number');
      expect(response.body.errors).toContain('SKU is required');
    });
  });

  describe('PUT /v1/products/:id', () => {
    it('should update an existing product', async () => {
      const updatedData = {
        name: 'Updated Test Product',
        description: 'This is an updated test product',
        base_price: 39.99,
        sku: generateUniqueSKU(),
      };

      const response = await request(app)
        .put(`/v1/products/${testProduct.id}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testProduct.id);
      expect(response.body).toHaveProperty('name', updatedData.name);
      expect(response.body).toHaveProperty('description', updatedData.description);
      expect(response.body).toHaveProperty('base_price', updatedData.base_price);
      expect(response.body).toHaveProperty('sku', updatedData.sku);

      // Verifica che il prodotto sia stato effettivamente aggiornato nel database
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', testProduct.id)
        .single();

      expect(error).toBeNull();
      expect(data).toMatchObject(updatedData);
    });

    it('should return 404 when trying to update a non-existent product', async () => {
      const response = await request(app)
        .put('/v1/products/999999')
        .send({ name: 'Updated Name' })
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    });
  });

  describe('DELETE /v1/products/:id', () => {
    it('should delete an existing product', async () => {
      const response = await request(app)
        .delete(`/v1/products/${testProduct.id}`)
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(204);

      // Verifica che il prodotto sia stato effettivamente eliminato dal database
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', testProduct.id)
        .single();

      expect(error).toHaveProperty('code', 'PGRST116');
      expect(data).toBeNull();

      // Verifica che le relazioni nella tabella product_categories siano state eliminate
      const { data: categoryData, error: categoryError } = await supabase
        .from('product_categories')
        .select()
        .eq('product_id', testProduct.id);

      expect(categoryError).toBeNull();
      expect(categoryData).toHaveLength(0);
    });

    it('should return 404 when trying to delete a non-existent product', async () => {
      const response = await request(app)
        .delete('/v1/products/999999')
        .set('Authorization', `Bearer ${authorizationToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    });
  });
});