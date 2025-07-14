import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLE_HIERARCHY } from '../../roles/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }

    // Get required roles for this route
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles specified, allow access (consider making this more restrictive)
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // If user is not authenticated but roles are required
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    // Check if user has any of the required roles
    const userRoles = user.roles || [];
    const hasRole = requiredRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required roles: ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }

  /**
   * Check if user has role with sufficient hierarchy level
   * @param userRoles - User's current roles
   * @param requiredRole - Required role
   * @returns boolean
   */
  private hasRoleHierarchy(userRoles: Role[], requiredRole: Role): boolean {
    const requiredLevel = ROLE_HIERARCHY[requiredRole];
    return userRoles.some(role => ROLE_HIERARCHY[role] >= requiredLevel);
  }
}
