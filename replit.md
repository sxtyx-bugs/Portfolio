# Overview

This is a minimalistic black & white personal portfolio website for Satyajit Patil, built with a modern React frontend and Express backend stack. The site features a clean, sketch-artistic design with handwritten fonts and doodle elements, showcasing achievements, projects, and personal interests in a notebook-style aesthetic.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and bundler.

**UI Components**: Built on shadcn/ui component library with Radix UI primitives, providing a comprehensive set of accessible UI components including dialogs, tooltips, buttons, forms, and navigation elements.

**Styling**: 
- Tailwind CSS for utility-first styling with custom CSS variables for theming
- Black and white color scheme defined in CSS custom properties
- Custom font stack including Kalam (handwritten), Caveat (sketch), and Inter (clean) fonts
- Responsive design with mobile-first approach

**State Management**: TanStack React Query for server state management and data fetching, providing caching, background updates, and error handling.

**Routing**: Wouter for lightweight client-side routing with a simple Switch/Route pattern.

**Build System**: 
- Vite for fast development and optimized production builds
- TypeScript configuration with path aliases for clean imports
- ESModule format with modern JavaScript features

## Backend Architecture

**Framework**: Express.js server with TypeScript support using tsx for development execution.

**Database Layer**: 
- Drizzle ORM for type-safe database operations
- PostgreSQL dialect configured for production use
- Neon Database serverless driver for cloud database connectivity
- Schema definitions with Zod validation integration

**API Structure**: RESTful API design with `/api` prefix for all backend routes.

**Session Management**: Express sessions with PostgreSQL session store using connect-pg-simple.

**Development Tools**:
- Hot reloading in development with Vite middleware integration
- Request logging middleware for API monitoring
- Error handling middleware with structured error responses

## Data Storage

**Primary Database**: PostgreSQL with Drizzle ORM providing:
- Type-safe database operations
- Schema migrations in `/migrations` directory
- Zod schema validation for data integrity

**Storage Interface**: Abstracted storage layer with both memory-based (development) and database implementations, allowing for easy testing and development.

**Schema Design**: User-focused schema with fields for authentication and profile data.

## External Dependencies

**UI Framework**: 
- Radix UI primitives for accessible component foundations
- Lucide React for consistent iconography
- Embla Carousel for interactive content presentation

**Development Tools**:
- ESBuild for production bundling
- PostCSS with Autoprefixer for CSS processing
- Replit-specific plugins for development environment integration

**Database Services**:
- Neon Database serverless PostgreSQL
- Drizzle Kit for database migrations and schema management

**Utilities**:
- Date-fns for date manipulation
- Class-variance-authority for component variant management
- CLSX and Tailwind-merge for conditional styling