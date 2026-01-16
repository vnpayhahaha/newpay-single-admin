# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Language
**IMPORTANT**: All interactions and responses with users should be in Chinese (中文). The project team primarily communicates in Chinese, and all documentation, comments, and user-facing text should follow this convention. This is critical for maintaining consistency with the project's communication standards.

## Project Overview

NewPay Admin is a Vue 3 + TypeScript admin dashboard built on the MineAdmin framework. It's a financial/payment administration system with modules for managing tenants, channels, transactions, and bank operations.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run serve` - Serve built files locally using http-server

### Code Quality
- `npm run lint` - Run all linting (TypeScript, ESLint, Stylelint)
- `npm run lint:tsc` - TypeScript type checking only
- `npm run lint:eslint` - ESLint with auto-fix
- `npm run lint:stylelint` - Stylelint for CSS/SCSS/Vue with auto-fix

### Icon Management
- `npm run gen:icons` - Generate icon data from assets
- `npm run svgo` - Optimize SVG icons

**Note**: No test framework is currently configured. Code quality is maintained through TypeScript checking and comprehensive linting.

## Architecture Overview

### Module-Based Structure
The application follows a modular architecture with these core business modules:

- **Base Module** (`src/modules/base/`) - Core system functionality (users, roles, permissions, dashboard)
- **Channel Module** (`src/modules/channel/`) - Payment channel management (channels, accounts, bank accounts)
- **Tenant Module** (`src/modules/tenant/`) - Multi-tenant management (tenants, accounts, configurations)
- **Transaction Module** (`src/modules/transaction/`) - Payment processing (orders, vouchers, parsing rules)

### Key Architectural Patterns

**Component Structure**: Each business entity follows a consistent pattern:
- `Index.vue` - Main list/table view
- `Form.vue` - Create/edit forms  
- `components/GetTableColumns.tsx` - Table column definitions
- `components/GetFormItems.tsx` - Form field definitions
- `components/GetSearchItems.tsx` - Search form definitions

**API Layer**: Each module has dedicated API files in `api/` subdirectories using consistent naming (e.g., `BankAccount.ts`, `Channel.ts`)

**Store Management**: Pinia stores in `src/store/modules/` for state management (user, menu, settings, tabs, etc.)

**Routing**: Static routes in `src/router/static-routes/` with dynamic menu-driven routing

### Technology Stack
- **Frontend**: Vue 3 + TypeScript + Element Plus
- **Build**: Vite with custom plugin system
- **State**: Pinia for state management
- **Styling**: SCSS with UnoCSS for utilities
- **Icons**: Iconify with SVG sprite system
- **I18n**: Vue I18n with YAML locale files

### Plugin System
Custom plugin architecture in `src/plugins/` with specialized components:
- **mine-admin**: Core admin components (app store, basic UI)
- **west**: Enhanced components (cell enhancers, export tools, search, settings, tinymce)

### Development Patterns

**Path Aliases**:
- `@/` → `src/`
- `#/` → `types/` 
- `$/` → `src/plugins/`
- `~/` → `src/modules/`

**Component Conventions**:
- Use `ma-` prefix for custom components
- TSX for complex table/form configurations
- Vue SFC for UI components

**Permissions**: Role-based access control with `hasAuth()`, `hasRole()`, `hasUser()` utilities

## Environment & Build
- Node.js ^20.0.0 required
- Uses pnpm for package management (note: npm commands work but pnpm is preferred)
- Vite handles dev server and builds
- Environment variables control proxy, API endpoints, and feature flags

### Environment Variables
Key environment variables (defined in `.env` files):
- `VITE_APP_PORT` - Development server port
- `VITE_APP_API_BASEURL` - Backend API base URL
- `VITE_PROXY_PREFIX` - API proxy prefix for development
- `VITE_OPEN_PROXY` - Enable/disable proxy in development
- `VITE_BUILD_SOURCEMAP` - Generate sourcemaps in build

## File Upload Architecture
The system includes chunk-based file upload components (`ma-upload-chunk`, `ma-upload-file`, `ma-upload-image`) for handling various file types including bank statements and transaction vouchers.