export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator', // Optional future role
}

export const ROLE_HIERARCHY = {
  [Role.ADMIN]: 3,    // Highest privilege
  [Role.MODERATOR]: 2, // Medium privilege
  [Role.USER]: 1,     // Basic privilege
};

export const DEFAULT_ROLE = Role.USER;
