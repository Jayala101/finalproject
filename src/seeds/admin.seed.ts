import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AdminSeedService {
  constructor(private readonly authService: AuthService) {}

  async createDefaultAdmin() {
    const adminData = {
      username: 'admin',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      first_name: 'Admin',
      last_name: 'User',
      role: UserRole.ADMIN,
    };

    try {
      const result = await this.authService.createAdmin(adminData);
      if (result.success) {
        console.log('✅ Default admin user created successfully');
        console.log('Email: admin@ecommerce.com');
        console.log('Password: admin123');
      } else {
        console.log('ℹ️  Admin user already exists or creation failed:', result.message);
      }
    } catch (error) {
      console.error('❌ Error creating admin user:', error);
    }
  }
}
