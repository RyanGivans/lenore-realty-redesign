# Jaclyn's Kitchen - Setup & Deployment Guide

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/jaclyns-kitchen-redesign.git
cd jaclyns-kitchen-redesign
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=mysql://username:password@host:port/database

# Authentication
JWT_SECRET=your-secret-key-here
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# Owner Information
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name

# API Keys
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### 4. Set Up Database

Run the database migrations:
```bash
pnpm drizzle-kit migrate
```

### 5. Seed Sample Data (Optional)

To populate the database with sample menu items and testimonials:

```bash
node server/seed.mjs
```

This will add:
- 30 menu items across 6 categories (Breakfast, Lunch, Burgers, Sandwiches, Kids, Drinks)
- 8 customer testimonials with ratings and quotes

### 6. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Deployment

### Deploy to Manus

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit: Jaclyn's Kitchen website"
git push origin main
```

2. Connect your GitHub repository to Manus and deploy

### Deploy to Other Platforms

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Railway
```bash
npm i -g @railway/cli
railway link
railway up
```

#### Render
1. Push to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables
5. Deploy

## Available Scripts

```bash
# Development
pnpm dev              # Start development server with hot reload

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Quality Checks
pnpm check            # TypeScript type checking
pnpm format           # Format code with Prettier
pnpm test             # Run tests with Vitest

# Database
pnpm drizzle-kit generate   # Generate migrations from schema
pnpm drizzle-kit migrate    # Apply migrations to database

# Seeding
node server/seed.mjs  # Populate database with sample data
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities
│   │   ├── contexts/      # React contexts
│   │   └── App.tsx        # Main app
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database helpers
│   ├── seed.mjs           # Sample data seeder
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema
│   ├── schema.ts          # Table definitions
│   └── migrations/        # SQL migrations
└── shared/                # Shared types
```

## Database Schema

### menuItems
- `id`: Unique identifier
- `category`: Breakfast, Lunch, Burgers, Sandwiches, Kids, Drinks
- `name`: Item name
- `description`: Item description
- `price`: Item price (decimal)
- `available`: Availability flag
- `createdAt`: Timestamp

### orders
- `id`: Unique identifier
- `customerName`: Customer's name
- `customerPhone`: Customer's phone number
- `pickupTime`: Requested pickup time
- `status`: Pending, Ready, PickedUp, Cancelled
- `totalPrice`: Total order amount
- `createdAt`: Order creation timestamp

### orderItems
- `id`: Unique identifier
- `orderId`: Reference to order
- `itemName`: Item name
- `quantity`: Quantity ordered
- `price`: Price per item
- `createdAt`: Timestamp

### testimonials
- `id`: Unique identifier
- `customerName`: Customer's name
- `rating`: Star rating (1-5)
- `quote`: Review text
- `featured`: Whether to display on homepage
- `createdAt`: Timestamp

## Authentication

The application uses Manus OAuth for authentication. The owner account (identified by `OWNER_OPEN_ID`) is automatically promoted to admin role.

### Admin Access

To access the admin dashboard:
1. Log in with your owner account
2. Navigate to `/admin`
3. View and manage orders
4. Update order statuses

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure database server is running
- Check firewall/network settings

### OAuth Issues
- Verify `VITE_APP_ID` and `OAUTH_SERVER_URL` are correct
- Check that redirect URLs are properly configured
- Clear browser cookies and try again

### Build Errors
- Run `pnpm install` to ensure all dependencies are installed
- Run `pnpm check` to identify TypeScript errors
- Check that all environment variables are set

### Menu Items Not Showing
- Run `node server/seed.mjs` to populate sample data
- Verify database migrations were applied with `pnpm drizzle-kit migrate`
- Check database connection

## Performance Tips

1. **Images**: All images are optimized and served via CDN
2. **Caching**: Enable browser caching for static assets
3. **Database**: Ensure proper indexing on frequently queried columns
4. **Code Splitting**: Routes are automatically code-split by Vite

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Secrets**: Use secure secret management in production
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly for your domain
5. **SQL Injection**: Use Drizzle ORM to prevent SQL injection
6. **XSS**: React automatically escapes content

## Support

For issues or questions:
- Check the README.md for feature documentation
- Review the code comments for implementation details
- Contact Jaclyn's Kitchen: (479) 925-7484

## License

Proprietary software for Jaclyn's Kitchen. All rights reserved.
