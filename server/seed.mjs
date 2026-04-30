import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function seed() {
  const connection = await mysql.createConnection(DATABASE_URL);

  try {
    console.log('🌱 Seeding database...');

    // Seed menu items
    const menuItems = [
      // Breakfast
      { category: 'Breakfast', name: 'Biscuits & Gravy', description: 'Fluffy biscuits with sausage gravy', price: '11.50' },
      { category: 'Breakfast', name: 'Breakfast Burrito', description: 'Scrambled eggs, sausage, cheese, and potatoes wrapped in a warm tortilla', price: '12.50' },
      { category: 'Breakfast', name: 'Pancakes', description: 'Three fluffy pancakes with butter and syrup', price: '10.99' },
      { category: 'Breakfast', name: 'French Toast', description: 'Thick-cut bread dipped in egg batter, served with syrup and butter', price: '11.50' },
      { category: 'Breakfast', name: 'Veggie Omelet', description: 'Three-egg omelet with peppers, onions, mushrooms, and cheese', price: '12.00' },
      
      // Lunch
      { category: 'Lunch', name: 'Chicken Salad', description: 'Fresh greens with grilled chicken, tomatoes, and house dressing', price: '13.99' },
      { category: 'Lunch', name: 'Caesar Wrap', description: 'Grilled chicken, romaine lettuce, parmesan, and Caesar dressing in a wrap', price: '12.50' },
      { category: 'Lunch', name: 'Tuna Melt', description: 'Tuna salad with melted cheddar on toasted bread', price: '11.99' },
      { category: 'Lunch', name: 'Turkey Club', description: 'Sliced turkey, bacon, lettuce, tomato, and mayo on toasted bread', price: '12.99' },
      { category: 'Lunch', name: 'Grilled Cheese', description: 'Classic grilled cheese with American and cheddar on sourdough', price: '9.99' },
      
      // Burgers
      { category: 'Burgers', name: 'Classic Cheeseburger', description: 'Half-pound beef patty with cheddar, lettuce, tomato, and onion', price: '13.99' },
      { category: 'Burgers', name: 'Bacon Burger', description: 'Half-pound beef patty with crispy bacon, cheddar, and special sauce', price: '14.99' },
      { category: 'Burgers', name: 'Mushroom Swiss', description: 'Half-pound beef patty with sautéed mushrooms and Swiss cheese', price: '14.50' },
      { category: 'Burgers', name: 'Jalapeño Popper Burger', description: 'Half-pound beef patty with jalapeños, pepper jack, and ranch', price: '14.99' },
      { category: 'Burgers', name: 'Double Deluxe', description: 'Two beef patties, double cheese, bacon, and all the toppings', price: '16.99' },
      
      // Sandwiches
      { category: 'Sandwiches', name: 'Philly Cheesesteak', description: 'Sliced steak with peppers, onions, and melted provolone', price: '13.50' },
      { category: 'Sandwiches', name: 'Chicken Parmesan', description: 'Breaded chicken breast with marinara and melted mozzarella', price: '13.99' },
      { category: 'Sandwiches', name: 'Pulled Pork', description: 'Slow-cooked pulled pork with coleslaw and BBQ sauce', price: '12.99' },
      { category: 'Sandwiches', name: 'Meatball Sub', description: 'Italian meatballs with marinara and melted mozzarella on a sub roll', price: '12.50' },
      { category: 'Sandwiches', name: 'Crispy Fish', description: 'Beer-battered fish fillet with tartar sauce and coleslaw', price: '12.99' },
      
      // Kids
      { category: 'Kids', name: 'Mini Burger', description: 'Small burger with cheese and fries', price: '8.99' },
      { category: 'Kids', name: 'Chicken Tenders', description: 'Three crispy chicken tenders with fries and dipping sauce', price: '8.99' },
      { category: 'Kids', name: 'Mac & Cheese', description: 'Creamy mac and cheese with a side of fruit', price: '7.99' },
      { category: 'Kids', name: 'Grilled Cheese', description: 'Classic grilled cheese with fries', price: '7.50' },
      { category: 'Kids', name: 'Hot Dog', description: 'Beef hot dog with fries and a drink', price: '7.99' },
      
      // Drinks
      { category: 'Drinks', name: 'Soft Drink', description: 'Choice of Coke, Sprite, or Dr Pepper', price: '2.50' },
      { category: 'Drinks', name: 'Iced Tea', description: 'Fresh brewed sweet or unsweet iced tea', price: '2.50' },
      { category: 'Drinks', name: 'Lemonade', description: 'Fresh squeezed lemonade', price: '3.00' },
      { category: 'Drinks', name: 'Coffee', description: 'Hot or iced coffee', price: '2.99' },
      { category: 'Drinks', name: 'Smoothie', description: 'Strawberry, banana, or mango smoothie', price: '4.99' },
    ];

    for (const item of menuItems) {
      await connection.execute(
        'INSERT INTO menuItems (category, name, description, price, available) VALUES (?, ?, ?, ?, 1)',
        [item.category, item.name, item.description, item.price]
      );
    }

    console.log(`✅ Added ${menuItems.length} menu items`);

    // Seed testimonials
    const testimonials = [
      {
        customerName: 'Jessica Butler',
        rating: 5,
        quote: 'Such a vibe. Big food good food fun people.',
        featured: 1,
      },
      {
        customerName: 'Marcus Johnson',
        rating: 5,
        quote: 'Best breakfast in Rogers! The biscuits and gravy are absolutely incredible.',
        featured: 1,
      },
      {
        customerName: 'Sarah Williams',
        rating: 5,
        quote: 'Love the pet-friendly patio! My dog gets treats and I get amazing food. Win-win!',
        featured: 1,
      },
      {
        customerName: 'David Chen',
        rating: 5,
        quote: 'The marina views are stunning, and the food is even better. Highly recommend!',
        featured: 0,
      },
      {
        customerName: 'Emily Rodriguez',
        rating: 5,
        quote: 'Fresh, homemade comfort food that tastes like it was made with love. Perfect!',
        featured: 0,
      },
      {
        customerName: 'Robert Thompson',
        rating: 5,
        quote: 'Been coming here since they opened. Consistently excellent service and food.',
        featured: 0,
      },
      {
        customerName: 'Lisa Anderson',
        rating: 5,
        quote: 'The burgers are absolutely fantastic. Worth every penny!',
        featured: 0,
      },
      {
        customerName: 'James Mitchell',
        rating: 5,
        quote: 'Great location on the marina, friendly staff, and delicious food. What more could you want?',
        featured: 0,
      },
    ];

    for (const testimonial of testimonials) {
      await connection.execute(
        'INSERT INTO testimonials (customerName, rating, quote, featured) VALUES (?, ?, ?, ?)',
        [testimonial.customerName, testimonial.rating, testimonial.quote, testimonial.featured]
      );
    }

    console.log(`✅ Added ${testimonials.length} testimonials`);
    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seed();
