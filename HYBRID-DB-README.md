# Hybrid MongoDB and PostgreSQL E-commerce Architecture

This project implements a hybrid database architecture for an e-commerce platform, leveraging both PostgreSQL and MongoDB for their respective strengths.

## Directory Structure

```
src/
├── core/              # Shared core functionality
├── common/            # Shared utilities, filters, etc.
├── config/            # Configuration services
├── database/          # Database-related functionality
│   └── seed/          # Database seeding
│
├── postgres-modules/  # PostgreSQL-backed domains
│   ├── users/         # User management
│   ├── products/      # Product catalog (core)
│   ├── orders/        # Order processing
│   ├── payments/      # Payment processing
│   └── shipping/      # Shipping methods
│
├── mongo-modules/     # MongoDB-backed domains
│   ├── product-content/    # Rich product data
│   ├── user-behavior/      # User activity tracking
│   ├── session-data/       # Session management
│   ├── reviews/            # Product reviews
│   ├── analytics/          # Usage analytics
│   └── content/            # Marketing content
│
└── hybrid-services/   # Services that use both databases
    ├── product-service/    # Combines core product + content
    ├── user-service/       # User profiles + behavior
    └── recommendation-engine/  # Uses data from both DBs
```

## Database Division Strategy

### PostgreSQL (Neon) - For Transactional & Relational Data
- Core business entities
- Transactional data
- Relational data
- Financial records

### MongoDB - For Flexible & High-Volume Data
- Rich content
- User behavior
- Analytics
- Variable schema data

## Getting Started

1. Set up both database connections in your `.env` file:

```
NEON_DATABASE_URL=postgresql://username:password@your-neon-instance.neon.tech/dbname
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/dbname
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run start:dev
```

## API Documentation

Once running, you can access the API documentation at:

```
http://localhost:3030/api/docs
```

## Architecture Benefits

- **Performance Optimization**: Each database handles workloads it excels at
- **Scalability**: Independent scaling of different data stores
- **Flexibility**: Schema evolution for content in MongoDB, rigid consistency for transactions in PostgreSQL
- **Cost Efficiency**: Optimized storage costs by database type
