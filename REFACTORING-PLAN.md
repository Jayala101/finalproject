# Refactoring Plan for Directory Restructuring

## Current Issue
The current src directory contains modules that should be organized according to the new hybrid database architecture structure.

## Modules to Relocate

### MongoDB Modules to Move to src/mongo-modules/:
- product-content/
- reviews/
- session-data/
- user-behavior/
- wishlists/

### PostgreSQL Modules to Move to src/postgres-modules/:
- products/
- users/
- orders/
- payments/
- shipping-methods/ (rename to shipping/)

## Implementation Plan

### Phase 1: Copy Existing Files to New Structure
1. Copy each module's files to their new location in the appropriate directory
2. Keep the original files in place temporarily

### Phase 2: Update Module Imports
1. Update import paths in the new files to reflect their new locations
2. Create or update barrel files (index.ts) in each directory for easier imports

### Phase 3: Update App Module
1. Update app.module.ts to import modules from their new locations
2. Test the application to ensure it works with the new structure

### Phase 4: Remove Redundant Files
1. Once the application is working with the new structure, remove the original files

## Guidelines for Updating Imports

### Example: Before
```typescript
import { ProductContent } from '../product-content/schemas/product-content.schema';
```

### Example: After
```typescript
import { ProductContent } from '../mongo-modules/product-content/schemas/product-content.schema';
```

## Notes
- This is a significant refactoring task that could introduce bugs if not done carefully
- Consider using a feature branch for this work
- Test thoroughly after each phase
- Use search and replace to find all affected import statements
