const dotenv = require('dotenv');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

dotenv.config({ path: path.join(__dirname, '../.env') });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to seed CityCost data.');
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

const cityCosts = [
  { cityName: 'Goa', avgHotelCostPerDay: 3500, avgFoodCostPerDay: 1200, avgTransportCost: 900, budgetLevel: 'moderate' },
  { cityName: 'Mumbai', avgHotelCostPerDay: 4500, avgFoodCostPerDay: 1500, avgTransportCost: 800, budgetLevel: 'premium' },
  { cityName: 'Delhi', avgHotelCostPerDay: 3200, avgFoodCostPerDay: 1100, avgTransportCost: 700, budgetLevel: 'moderate' },
  { cityName: 'Jaipur', avgHotelCostPerDay: 2600, avgFoodCostPerDay: 900, avgTransportCost: 600, budgetLevel: 'budget' },
  { cityName: 'Bengaluru', avgHotelCostPerDay: 3800, avgFoodCostPerDay: 1300, avgTransportCost: 750, budgetLevel: 'moderate' },
  { cityName: 'Pune', avgHotelCostPerDay: 2800, avgFoodCostPerDay: 1000, avgTransportCost: 650, budgetLevel: 'budget' },
  { cityName: 'Kochi', avgHotelCostPerDay: 3000, avgFoodCostPerDay: 950, avgTransportCost: 700, budgetLevel: 'budget' },
  { cityName: 'Udaipur', avgHotelCostPerDay: 3300, avgFoodCostPerDay: 1000, avgTransportCost: 650, budgetLevel: 'moderate' }
];

async function main() {
  for (const city of cityCosts) {
    await prisma.cityCost.upsert({
      where: { cityName: city.cityName },
      update: city,
      create: city
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
