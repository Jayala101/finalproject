# Role-Based Access Control (RBAC) Guide

## Overview

This e-commerce backend implements a comprehensive role-based access control system with the following roles:

- **`user`** (default): Regular customers
- **`admin`**: System administrators with full access
- **`moderator`**: Future role for content moderation

## Role Definitions

### User Role (`Role.USER`)
- Default role for all new registrations
- Can view products, manage own profile, place orders
- Cannot access admin endpoints

### Admin Role (`Role.ADMIN`)
- Full system access
- Can manage all users, products, orders
- Can access analytics and system settings

## Using Decorators

### Basic Role Protection

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../core/auth/guards/roles.guard';
import { AdminOnly, AuthenticatedOnly, PublicRoute } from '../core/roles/roles.decorator';

@Controller('example')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExampleController {
  
  // Public route - no authentication required
  @Get('public')
  @PublicRoute()
  getPublicData() {
    return { message: 'This is public' };
  }
  
  // Any authenticated user can access
  @Get('protected')
  @AuthenticatedOnly()
  getProtectedData() {
    return { message: 'Authenticated users only' };
  }
  
  // Admin only
  @Get('admin')
  @AdminOnly()
  getAdminData() {
    return { message: 'Admins only' };
  }
  
  // Custom role combination
  @Get('custom')
  @Roles(Role.ADMIN, Role.MODERATOR)
  getCustomData() {
    return { message: 'Admins and moderators only' };
  }
}
```

### Advanced Usage with User Context

```typescript
@Get('profile/:id')
@AuthenticatedOnly()
async getUserProfile(@Param('id') id: string, @Request() req: any) {
  // Users can only view their own profile unless they're admin
  if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
    throw new ForbiddenException('Access denied');
  }
  return this.usersService.findOne(id);
}
```

## API Endpoints by Role

### Public Routes (No Authentication)
```
GET  /products              # Browse products
GET  /products/:id          # View product details
POST /users/register        # User registration
POST /auth/login           # User login
```

### User Routes (Authenticated Users)
```
GET  /users/profile/me     # Get own profile
PATCH /users/:id           # Update own profile
GET  /orders/my-orders     # View own orders
POST /orders               # Place new order
POST /reviews              # Create product reviews
```

### Admin Routes (Admin Only)
```
GET  /users                # View all users
POST /users/admin/create   # Create users with roles
GET  /users/admins         # View admin users
POST /products             # Create products
PATCH /products/:id        # Update products
DELETE /products/:id       # Delete products
GET  /products/admin/low-stock  # View low stock items
```

## Creating Initial Admin User

Run the seed script to create the first admin user:

```bash
npm run seed:admin
```

Or use the provided script:

```typescript
ts-node src/database/seed/create-admin.ts
```

**Default Admin Credentials:**
- Username: `admin`
- Email: `admin@ecommerce.com`
- Password: `admin123456`

⚠️ **Important**: Change the default password in production!

## User Management

### Promoting Users to Admin

```typescript
// Using the service
await usersService.promoteToAdmin(userId);

// Via API endpoint (admin only)
PATCH /users/:id/promote-admin
```

### Checking User Roles

```typescript
// In service
const isAdmin = await usersService.hasRole(userId, Role.ADMIN);

// In controller with request context
if (req.user.roles.includes(Role.ADMIN)) {
  // Admin-specific logic
}
```

## Database Schema

The `users` table includes a `roles` column:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR UNIQUE,
  email VARCHAR UNIQUE,
  password VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  is_active BOOLEAN DEFAULT true,
  profile VARCHAR,
  roles TEXT[], -- Array of role strings
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Security Best Practices

1. **Always use both guards**: `JwtAuthGuard` and `RolesGuard`
2. **Explicit public routes**: Use `@PublicRoute()` for clarity
3. **Principle of least privilege**: Start with minimal permissions
4. **Context-aware checks**: Verify user ownership for resource access
5. **Secure defaults**: Require authentication unless explicitly public

## Testing Role-Based Access

### Example Test Cases

```typescript
describe('Role-based access', () => {
  it('should allow public access to product listing', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);
  });

  it('should require admin role for product creation', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403); // Forbidden for regular users
  });

  it('should allow admin to create products', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(productData)
      .expect(201);
  });
});
```

## JWT Payload Structure

When a user logs in, the JWT contains:

```typescript
{
  id: "user-uuid",
  username: "johndoe",
  roles: ["user"] // or ["admin"] or ["user", "admin"]
}
```

This payload is available in controllers via `@Request() req` parameter as `req.user`.

## Error Handling

The system provides clear error messages:

- **401 Unauthorized**: No valid JWT token
- **403 Forbidden**: Valid token but insufficient permissions
- **Custom messages**: "Access denied. Required roles: admin"

## Adding New Roles

1. Add to the `Role` enum:
```typescript
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator', // New role
  VENDOR = 'vendor'        // Another new role
}
```

2. Update hierarchy if needed:
```typescript
export const ROLE_HIERARCHY = {
  [Role.ADMIN]: 4,
  [Role.MODERATOR]: 3,
  [Role.VENDOR]: 2,
  [Role.USER]: 1,
};
```

3. Create new decorators:
```typescript
export const ModeratorOnly = () => Roles(Role.MODERATOR);
export const VendorOrAdmin = () => Roles(Role.VENDOR, Role.ADMIN);
```

This RBAC system provides a solid foundation for secure, scalable user management in your e-commerce application.
