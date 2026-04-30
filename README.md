# Jaclyn's Kitchen - Restaurant Website

A modern, production-ready restaurant website for Jaclyn's Kitchen at Prairie Creek Marina in Rogers, Arkansas. Built with React, TypeScript, Tailwind CSS, Express, and tRPC.

## Features

### 🎯 Core Features

- **Hero Section**: Stunning full-screen cinematic background with animated tagline and call-to-action buttons
- **Online Ordering System**: Browse menu by category, add items to cart, and place pickup orders
- **Menu Management**: Organized by 6 categories (Breakfast, Lunch, Burgers, Sandwiches, Kids, Drinks)
- **Order Management**: Admin dashboard to view, filter, and update order statuses
- **Customer Testimonials**: Display featured reviews with star ratings
- **Location & Hours**: Embedded Google Map, address, phone, and operating hours
- **Pet-Friendly**: Highlights the restaurant's welcoming atmosphere for furry companions
- **Responsive Design**: Mobile-first design that works on all devices

### 🎨 Design

- **Color Palette**: Warm, rustic-modern aesthetic with deep lake blues (#1e3a5f) and warm amber/gold (#d4a574)
- **Typography**: Playfair Display for headings, Inter for body text
- **Animations**: Smooth page transitions and micro-interactions
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Wouter** for client-side routing
- **tRPC** for type-safe API calls
- **React Hook Form** for form handling
- **Lucide React** for icons

### Backend
- **Express 4** for HTTP server
- **tRPC 11** for RPC procedures
- **Drizzle ORM** for database access
- **MySQL/TiDB** for data persistence
- **Manus OAuth** for authentication

### Development
- **Vite** for fast builds
- **TypeScript** for type safety
- **Vitest** for unit testing
- **Prettier** for code formatting

## Project Structure

```
.
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── lib/              # Utilities and helpers
│   │   ├── contexts/         # React contexts
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   └── public/               # Static assets
├── server/                    # Backend Express application
│   ├── routers.ts            # tRPC procedure definitions
│   ├── db.ts                 # Database query helpers
│   ├── _core/                # Core infrastructure
│   └── auth.logout.test.ts   # Example test
├── drizzle/                  # Database schema and migrations
│   ├── schema.ts             # Table definitions
│   └── migrations/           # SQL migrations
├── shared/                   # Shared types and constants
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MySQL/TiDB database
- Manus OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jaclyns-kitchen-redesign.git
cd jaclyns-kitchen-redesign
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env file with the following variables
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secret-key
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
```

4. Run database migrations:
```bash
pnpm drizzle-kit migrate
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Development

### Build

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

### Type Checking

```bash
pnpm check
```

### Formatting

```bash
pnpm format
```

## Database Schema

### Tables

- **users**: User accounts with OAuth integration
- **menuItems**: Restaurant menu items organized by category
- **orders**: Customer pickup orders
- **orderItems**: Individual items within each order
- **testimonials**: Customer reviews and testimonials

### Migrations

Database migrations are automatically generated from the schema:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

## API Routes

### Public Routes

- `GET /` - Home page
- `GET /menu` - Menu page
- `GET /about` - About page
- `GET /location` - Location and hours
- `GET /testimonials` - Customer reviews

### Ordering Routes

- `POST /api/trpc/menu.getAll` - Get all menu items
- `POST /api/trpc/menu.getByCategory` - Get items by category
- `POST /api/trpc/orders.create` - Create a new order
- `POST /api/trpc/testimonials.getFeatured` - Get featured testimonials

### Admin Routes (Owner Only)

- `GET /admin` - Admin dashboard
- `POST /api/trpc/orders.getAll` - Get all orders
- `POST /api/trpc/orders.updateStatus` - Update order status

## Authentication

The application uses Manus OAuth for authentication. The owner account is automatically promoted to admin role and can:

- View all orders
- Update order statuses
- Access the admin dashboard

## Deployment

This project is ready to deploy to any Node.js hosting platform:

### Manus Hosting
```bash
# Push to GitHub and use Manus deployment
git push origin main
```

### Other Platforms (Vercel, Railway, etc.)
```bash
# Build the project
pnpm build

# Start the server
pnpm start
```

## Configuration

### Menu Items

To add menu items to the database, use the admin panel or direct database access:

```sql
INSERT INTO menuItems (category, name, description, price, available)
VALUES ('Breakfast', 'Biscuits & Gravy', 'Fluffy biscuits with sausage gravy', '11.50', 1);
```

### Testimonials

Add featured testimonials:

```sql
INSERT INTO testimonials (customerName, rating, quote, featured)
VALUES ('Jessica Butler', 5, 'Such a vibe. Big food good food fun people.', 1);
```

## Performance Optimization

- Images are optimized and served via CDN
- CSS is minified and tree-shaken
- JavaScript is code-split by route
- Database queries are optimized with proper indexing
- Caching headers are configured for static assets

## Security

- CSRF protection with secure cookies
- SQL injection prevention via Drizzle ORM
- XSS protection via React's built-in escaping
- HTTPS enforced in production
- Admin routes protected with role-based access control

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is proprietary software for Jaclyn's Kitchen. All rights reserved.

## Support

For support, contact:
- **Phone**: (479) 925-7484
- **Location**: 1 Prairie Creek Marina Dr, Rogers, AR 72756
- **Website**: https://jaclyns-kitchen.menu-world.com/

## Roadmap

- [ ] Payment integration (Stripe)
- [ ] Email notifications for orders
- [ ] SMS notifications for customers
- [ ] Loyalty program
- [ ] Social media integration
- [ ] Advanced analytics dashboard
- [ ] Inventory management system
- [ ] Staff scheduling system

---

Built with ❤️ for Jaclyn's Kitchen at Prairie Creek Marina
