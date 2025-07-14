import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

/**
 * Decorator to set required roles for a route or controller
 * @param roles - Array of roles that are allowed to access the resource
 * @example @Roles(Role.ADMIN, Role.MODERATOR)
 */
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

/**
 * Decorator for admin-only routes
 * @example @AdminOnly()
 */
export const AdminOnly = () => Roles(Role.ADMIN);

/**
 * Decorator for authenticated users (any role)
 * @example @AuthenticatedOnly()
 */
export const AuthenticatedOnly = () => Roles(Role.ADMIN, Role.MODERATOR, Role.USER);

/**
 * Decorator for public routes (no authentication required)
 * Use this explicitly to document public endpoints
 * @example @PublicRoute()
 */
export const PublicRoute = () => SetMetadata('isPublic', true);
