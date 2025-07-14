# Database Seeding System

This e-commerce backend includes a comprehensive database seeding system that populates both PostgreSQL and MongoDB databases with realistic sample data.

## 📊 What Gets Seeded

### PostgreSQL (Transactional Data)
- **Users**: Admin, moderator, and regular users with proper roles
- **Categories**: Electronics, Computers, Smartphones, Home & Garden, Clothing, Books, Sports, Toys
- **Products**: Real products with prices, stock, descriptions, and category associations
- **Discounts**: Promotional codes and percentage/fixed amount discounts

### MongoDB (Content & Analytics Data)
- **User Behavior**: Page views, product interactions, search queries, cart actions
- **Product Reviews**: Customer reviews with ratings, comments, and helpfulness votes
- **Analytics**: Page views, purchase events, search analytics
- **Product Content**: Extended product information, specifications, image galleries
- **Notifications**: Order updates, price alerts, welcome messages
- **Session Data**: User session tracking with device info and navigation patterns

## 🚀 How to Run Seeds

### Option 1: Seed Everything
```bash
npm run seed:all
```
This runs the complete seeding process for both databases in the correct order.

### Option 2: Individual Database Seeding
```bash
# Seed only PostgreSQL
npm run seed:postgres

# Seed only MongoDB  
npm run seed:mongo

# Seed only admin user (quick setup)
npm run seed:admin
```

### Option 3: API Endpoints
Once the application is running, you can trigger seeding via REST API:

```bash
# Seed everything
POST http://localhost:3000/seed/all

# Seed PostgreSQL only
POST http://localhost:3000/seed/postgres

# Seed MongoDB only
POST http://localhost:3000/seed/mongo
```

## 📋 Seeded Data Overview

### Users Created
- **admin@ecommerce.com** (password: admin123456) - Administrator role
- **mod@ecommerce.com** (password: mod123456) - Moderator role  
- **john@example.com** (password: password123) - Regular user
- **jane@example.com** (password: password123) - Regular user
- **alice@example.com** (password: password123) - Regular user

### Sample Products
- iPhone 15 Pro ($999.99)
- Samsung Galaxy S24 ($899.99)
- MacBook Pro 16" ($2,499.99)
- Dell XPS 13 ($1,299.99)
- Sony WH-1000XM5 Headphones ($399.99)
- Apple Watch Series 9 ($499.99)
- Nike Air Max 90 ($129.99)
- Levi's 501 Jeans ($89.99)
- Clean Code Book ($49.99)
- Dyson V15 Vacuum ($749.99)

### Discount Codes
- **WELCOME10** - 10% off for new customers (min order $50)
- **SAVE50** - $50 off orders over $200
- **ELECTRONICS15** - 15% off electronics (min order $100)

## 🛠 Technical Details

### Architecture
- **PostgresSeedsService**: Handles relational data seeding with proper relationships
- **MongoSeedsService**: Handles document-based data with realistic behavioral patterns
- **SeedService**: Orchestrates the seeding process and provides unified API
- **Error Handling**: Graceful handling of duplicate data and dependency issues

### Dependencies
The seeding system respects data relationships:
1. Users are created first
2. Categories are created before products
3. Products reference valid categories
4. MongoDB collections reference PostgreSQL IDs where appropriate

### Safety Features
- **Duplicate Protection**: Checks for existing records before creating
- **Transaction Safety**: Each service handles its own error recovery
- **Comprehensive Logging**: Detailed console output showing progress and issues
- **Non-destructive**: Only adds data, doesn't remove existing records

## 🔧 Customization

To modify the seed data:

1. **PostgreSQL Data**: Edit `src/database/seed/postgres-seeds/postgres-seeds.service.ts`
2. **MongoDB Data**: Edit `src/database/seed/mongo-seeds/mongo-seeds.service.ts`
3. **Add New Entities**: Update the respective service and add to `SeedModule`

## 📝 Example Usage

```typescript
// In your test files or development scripts
import { SeedService } from './database/seed/seed.service';

// Seed everything
await seedService.seedAll();

// Or seed specific databases
await seedService.seedPostgres();
await seedService.seedMongo();
```

## 🔍 Verification

After seeding, you can verify the data:

### PostgreSQL
```sql
SELECT COUNT(*) FROM users;        -- Should show 5 users
SELECT COUNT(*) FROM categories;   -- Should show 8 categories  
SELECT COUNT(*) FROM products;     -- Should show 10 products
SELECT COUNT(*) FROM discounts;    -- Should show 3 discounts
```

### MongoDB
```javascript
db.getCollection("user-behavior").count()    // Should show 2 records
db.reviews.count()                           // Should show 4 reviews
db.analytics.count()                         // Should show 4 analytics events
db.getCollection("product-content").count()  // Should show 2 product content records
db.notifications.count()                     // Should show 4 notifications
db.getCollection("session-data").count()     // Should show 2 session records
```

## 🎯 Next Steps

After seeding:
1. Start the application: `npm run start:dev`
2. Test the API endpoints with the seeded data
3. Login with admin credentials to access protected routes
4. Explore the e-commerce functionality with realistic data

The seeded data provides a complete foundation for testing and demonstrating the e-commerce platform's capabilities.
