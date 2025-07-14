import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../postgres-modules/users/users.service';
import { Role } from '../../core/roles/role.enum';

async function createInitialAdmin() {
  console.log('🌱 Creating initial admin user...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Check if admin already exists
    const existingAdmin = await usersService.findAdmins();
    
    if (existingAdmin.length > 0) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create initial admin user
    const adminUser = await usersService.createAdmin({
      username: 'admin',
      email: 'admin@ecommerce.com',
      password: 'admin123456', // Change this in production!
      firstName: 'System',
      lastName: 'Administrator',
      roles: [Role.ADMIN]
    });

    console.log('✅ Initial admin user created successfully:');
    console.log(`   Username: ${adminUser.username}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Roles: ${adminUser.roles.join(', ')}`);
    console.log('');
    console.log('🚨 IMPORTANT: Change the default password in production!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await app.close();
  }
}

// Run the seed if this file is executed directly
if (require.main === module) {
  createInitialAdmin();
}

export { createInitialAdmin };
