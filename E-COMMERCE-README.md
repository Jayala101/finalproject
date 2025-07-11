# E-Commerce Backend - NestJS

This NestJS backend provides a comprehensive e-commerce API with all essential features for an online store.

## 🚀 Features

### Core E-commerce Features
- **User Management**: Customer and admin roles with authentication
- **Product Catalog**: Products with categories, variants, and images
- **Shopping Cart**: Add, update, remove items from cart
- **Order Management**: Complete order processing workflow
- **Reviews & Ratings**: Product reviews and rating system
- **Wishlist**: Save products for later
- **Payment Processing**: Payment tracking and status management

### Advanced Features
- **Product Variants**: Support for size, color, and other attributes
- **Hierarchical Categories**: Nested category structure
- **Discount System**: Coupon and discount management
- **Shipping Methods**: Multiple shipping options
- **Inventory Management**: Stock quantity tracking

## 📁 Project Structure

```
src/
├── auth/                   # Authentication & authorization
├── users/                  # User management (customers & admins)
├── categories/             # Product categories (hierarchical)
├── products/               # Product catalog
├── orders/                 # Order management
├── carts/                  # Shopping cart functionality
├── reviews/                # Product reviews & ratings
├── wishlists/              # User wishlists
├── payments/               # Payment processing
├── product-images/         # Product image management
├── product-variants/       # Product variations (size, color, etc.)
├── attributes/             # Product attributes definition
├── shipping-methods/       # Shipping options
├── discounts/              # Coupons & discount codes
├── common/                 # Shared utilities & DTOs
└── decorators/             # Custom decorators
```

## 🗄️ Database Schema

### Core Tables

#### Users
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)
- `first_name`
- `last_name`
- `role` (customer/admin)
- `created_at`, `updated_at`

#### Products
- `id` (Primary Key)
- `name`
- `description`
- `price`
- `sku` (Unique)
- `stock_quantity`
- `category_id` (Foreign Key)
- `created_at`, `updated_at`

#### Categories
- `id` (Primary Key)
- `name`
- `description`
- `parent_id` (Self-referencing for hierarchy)
- `created_at`, `updated_at`

#### Orders
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `total_amount`
- `status` (pending/processing/completed/cancelled)
- `payment_method`
- `shipping_address`
- `billing_address`
- `created_at`, `updated_at`

#### Order_Items
- `id` (Primary Key)
- `order_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity`
- `price_at_purchase`

### Supporting Tables

#### Carts & Cart_Items
- User shopping cart management
- Persistent cart storage

#### Reviews
- Product reviews and ratings (1-5 stars)
- User feedback system

#### Product_Images
- Multiple images per product
- Primary image designation

#### Wishlists
- User product wishlist management

#### Payments
- Payment transaction tracking
- Multiple payment methods support

### Advanced Tables

#### Product_Variants
- Product variations (size, color, etc.)
- Price adjustments per variant

#### Attributes
- Configurable product attributes
- JSON-based value storage

#### Shipping_Methods
- Multiple shipping options
- Delivery time estimation

#### Discounts
- Coupon code system
- Percentage or fixed discounts

## 🔧 API Endpoints

### Authentication
```
POST /auth/login          # User login
POST /auth/register       # User registration
```

### Users
```
GET    /users             # Get all users (admin)
GET    /users/:id         # Get user by ID
POST   /users             # Create new user
PUT    /users/:id         # Update user
DELETE /users/:id         # Delete user
```

### Products
```
GET    /products          # Get all products
GET    /products/:id      # Get product by ID
POST   /products          # Create product (admin)
PUT    /products/:id      # Update product (admin)
DELETE /products/:id      # Delete product (admin)
```

### Categories
```
GET    /categories        # Get all categories
GET    /categories/:id    # Get category by ID
POST   /categories        # Create category (admin)
PUT    /categories/:id    # Update category (admin)
DELETE /categories/:id    # Delete category (admin)
```

### Shopping Cart
```
GET    /carts/user/:userId           # Get user's cart
POST   /carts/user/:userId/items     # Add item to cart
PATCH  /carts/items/:itemId          # Update cart item
DELETE /carts/items/:itemId          # Remove from cart
DELETE /carts/user/:userId           # Clear cart
```

### Orders
```
GET    /orders                # Get all orders (admin)
GET    /orders/:id            # Get order by ID
GET    /orders/user/:userId   # Get user's orders
POST   /orders                # Create new order
PATCH  /orders/:id            # Update order status
DELETE /orders/:id            # Cancel order
```

### Reviews
```
GET    /reviews                           # Get all reviews
GET    /reviews/product/:productId        # Get product reviews
GET    /reviews/user/:userId              # Get user reviews
GET    /reviews/product/:productId/average-rating  # Get average rating
POST   /reviews                           # Create review
PATCH  /reviews/:id                       # Update review
DELETE /reviews/:id                       # Delete review
```

### Wishlists
```
GET    /wishlists/user/:userId    # Get user's wishlist
POST   /wishlists                 # Add to wishlist
DELETE /wishlists/:id             # Remove from wishlist
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- MongoDB (for some features)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASS=your_password
DB_NAME=ecommerce_db

# MongoDB (for some features)
MONGO_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your_jwt_secret
```

3. Run database migrations:
```bash
npm run migration:run
```

4. Start the development server:
```bash
npm run start:dev
```

## 🔒 Authentication & Authorization

The API uses JWT-based authentication with role-based access control:

- **Public routes**: Product listing, category browsing
- **Customer routes**: Cart management, order placement, reviews
- **Admin routes**: Product/category management, order management

## 📊 Data Validation

All DTOs include comprehensive validation using `class-validator`:
- Required field validation
- Type checking
- Format validation (email, UUID, etc.)
- Custom business rule validation

## 🏗️ Architecture

- **Modular Design**: Each feature is contained in its own module
- **Repository Pattern**: Clean data access layer using TypeORM
- **DTO Pattern**: Request/response data transfer objects
- **Service Layer**: Business logic separation
- **Guard System**: Route protection and role-based access

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📈 Monitoring & Logging

The application includes:
- Request/response logging
- Error handling middleware
- Performance monitoring
- Database query optimization

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Docker Support
```bash
docker build -t ecommerce-backend .
docker run -p 3000:3000 ecommerce-backend
```

## 📝 API Documentation

Swagger documentation is available at `/api/docs` when the server is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
