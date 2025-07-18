# Nexssio - Creative Services Platform

## Overview

Nexssio is a full-stack creative services platform that provides assignment writing, creative services, and an art shop. Built with React, TypeScript, Express, and PostgreSQL, it offers a modern, responsive interface with professional service offerings and e-commerce capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React Context for cart management
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth transitions and interactions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-based session storage
- **API Design**: RESTful API with proper error handling

### Database Schema
- **Users**: Authentication and user management
- **Services**: Assignment and creative services catalog
- **Products**: Art shop inventory management
- **Portfolio**: Showcase of work and projects
- **Cart**: Session-based shopping cart
- **Orders**: Order processing and management
- **Contact/Feedback**: Customer communication

## Key Components

### User Interface
- **Theme System**: Dark theme with CSS custom properties
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Component Library**: Comprehensive UI components using Radix UI primitives
- **Particle Background**: Interactive background effects
- **Glass Effects**: Modern frosted glass UI styling

### Business Logic
- **Service Categories**: Assignment services, creative services, art shop
- **Shopping Cart**: Session-based cart with persistent storage
- **Order Processing**: Complete checkout flow with form validation
- **Portfolio Management**: Featured work showcase with filtering
- **Contact System**: Customer inquiry and feedback handling

### Data Management
- **Type Safety**: Shared schema types between frontend and backend
- **Validation**: Zod schema validation for forms and API requests
- **Caching**: TanStack Query for optimistic updates and caching
- **Real-time Updates**: Automatic data synchronization

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Processing**: Express routes handle business logic and database operations
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Structured JSON responses with proper error handling
5. **State Updates**: Client state updates trigger UI re-renders

### Cart Flow
1. Session ID generated and stored in localStorage
2. Cart items associated with session ID in database
3. Real-time cart updates through optimistic mutations
4. Checkout process creates orders and clears cart

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **framer-motion**: Animation library
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint/Prettier**: Code formatting and linting

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Static Assets**: Vite handles asset optimization and bundling

### Environment Configuration
- **Development**: Uses Vite dev server with HMR
- **Production**: Serves static files from Express with built React app
- **Database**: PostgreSQL connection via environment variables

### Scripts
- `dev`: Development server with hot reloading
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema synchronization

The application is designed for easy deployment on platforms like Replit, Vercel, or traditional hosting with proper environment variable configuration for database connections.