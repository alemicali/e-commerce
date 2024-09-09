# E-commerce API

This is a comprehensive e-commerce API built with Express, TypeScript, and Supabase. It provides a wide range of functionalities including product management, order processing, user authentication, cart operations, and more.

## Features

- User authentication and authorization
- Product management (including variants, images, and inventory)
- Order processing and management
- Shopping cart functionality
- Category management
- Coupon system
- Review system
- Address management
- Payment processing
- Shipment tracking

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3005
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   API_CLIENT_ID=your_api_client_id
   API_CLIENT_SECRET=your_api_client_secret
   ```
4. Build the project: `npm run build`
5. Start the server: `npm start`

## Development

To run the server in development mode with hot reloading:

```
npm run dev
```

## Testing

To run tests:

```
npm test
```

For watching tests:

```
npm run test:watch
```

For test coverage:

```
npm run test:coverage
```

## API Endpoints

### Authentication
- POST /v1/auth/token - Generate authentication token

### Users
- POST /v1/users/register - Register a new user
- POST /v1/users/login - Login user
- GET /v1/users/profile - Get user profile (requires authentication)
- PUT /v1/users/profile - Update user profile (requires authentication)

### Products
- GET /v1/products - Get all products
- POST /v1/products - Create a new product (requires authentication)
- GET /v1/products/:id - Get a specific product
- PUT /v1/products/:id - Update a product (requires authentication)
- DELETE /v1/products/:id - Delete a product (requires authentication)
- GET /v1/products/:productId/categories - Get product categories
- POST /v1/products/:productId/categories - Add product to category (requires authentication)
- DELETE /v1/products/:productId/categories/:categoryId - Remove product from category (requires authentication)
- GET /v1/products/:productId/images - Get product images
- POST /v1/products/:productId/images - Add product image (requires authentication)
- DELETE /v1/products/:productId/images/:imageId - Delete product image (requires authentication)
- GET /v1/products/:productId/variants - Get product variants
- POST /v1/products/:productId/variants - Create product variant (requires authentication)
- GET /v1/products/:productId/variants/:variantId - Get product variant
- PUT /v1/products/:productId/variants/:variantId - Update product variant (requires authentication)
- DELETE /v1/products/:productId/variants/:variantId - Delete product variant (requires authentication)
- GET /v1/products/:productId/inventory - Get product inventory
- PUT /v1/products/:productId/inventory - Update product inventory (requires authentication)

### Orders
- GET /v1/orders - Get all orders (requires authentication)
- POST /v1/orders - Create a new order (requires authentication)
- GET /v1/orders/:id - Get a specific order (requires authentication)
- PUT /v1/orders/:id - Update an order (requires authentication)
- GET /v1/orders/:orderId/items - Get order items (requires authentication)
- POST /v1/orders/:orderId/items - Add order item (requires authentication)
- DELETE /v1/orders/:orderId/items/:itemId - Delete order item (requires authentication)
- GET /v1/orders/:orderId/payments - Get order payments (requires authentication)
- POST /v1/orders/:orderId/payments - Create payment (requires authentication)
- GET /v1/orders/:orderId/payments/:paymentId - Get payment by ID (requires authentication)
- GET /v1/orders/:orderId/shipments - Get order shipments (requires authentication)
- POST /v1/orders/:orderId/shipments - Create shipment (requires authentication)
- GET /v1/orders/:orderId/shipments/:shipmentId - Get shipment by ID (requires authentication)
- PUT /v1/orders/:orderId/shipments/:shipmentId - Update shipment (requires authentication)

### Cart
- GET /v1/cart - Get user's cart (requires authentication)
- POST /v1/cart/items - Add item to cart (requires authentication)
- PUT /v1/cart/items/:itemId - Update cart item (requires authentication)
- DELETE /v1/cart/items/:itemId - Remove item from cart (requires authentication)

### Categories
- GET /v1/categories - List all categories
- POST /v1/categories - Create a new category (requires authentication)
- GET /v1/categories/:categoryId - Get a specific category
- PUT /v1/categories/:categoryId - Update a category (requires authentication)
- DELETE /v1/categories/:categoryId - Delete a category (requires authentication)

### Coupons
- GET /v1/coupons - List all coupons (requires authentication)
- POST /v1/coupons - Create a new coupon (requires authentication)
- GET /v1/coupons/:couponId - Get a specific coupon (requires authentication)
- PUT /v1/coupons/:couponId - Update a coupon (requires authentication)
- DELETE /v1/coupons/:couponId - Delete a coupon (requires authentication)

### Reviews
- GET /v1/products/:productId/reviews - Get product reviews
- POST /v1/products/:productId/reviews - Create a review (requires authentication)
- GET /v1/products/:productId/reviews/:reviewId - Get a specific review
- PUT /v1/products/:productId/reviews/:reviewId - Update a review (requires authentication)
- DELETE /v1/products/:productId/reviews/:reviewId - Delete a review (requires authentication)

### Addresses
- GET /v1/users/:userId/addresses - Get user addresses (requires authentication)
- POST /v1/users/:userId/addresses - Create address (requires authentication)
- GET /v1/users/:userId/addresses/:addressId - Get address by ID (requires authentication)
- PUT /v1/users/:userId/addresses/:addressId - Update address (requires authentication)
- DELETE /v1/users/:userId/addresses/:addressId - Delete address (requires authentication)

For more detailed API documentation, please refer to the OpenAPI specification.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
