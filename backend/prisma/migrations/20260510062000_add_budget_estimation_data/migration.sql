-- Additive estimation fields for deterministic budget intelligence.
ALTER TABLE "Stop" ADD COLUMN "hotelCostPerDay" REAL DEFAULT 0;
ALTER TABLE "Stop" ADD COLUMN "transportCost" REAL DEFAULT 0;
ALTER TABLE "Activity" ADD COLUMN "estimatedPopularity" INTEGER DEFAULT 50;
ALTER TABLE "Activity" ADD COLUMN "isFree" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE "CityCost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cityName" TEXT NOT NULL,
    "avgHotelCostPerDay" REAL NOT NULL,
    "avgFoodCostPerDay" REAL NOT NULL,
    "avgTransportCost" REAL NOT NULL,
    "budgetLevel" TEXT
);

CREATE UNIQUE INDEX "CityCost_cityName_key" ON "CityCost"("cityName");

INSERT INTO "CityCost" ("cityName", "avgHotelCostPerDay", "avgFoodCostPerDay", "avgTransportCost", "budgetLevel") VALUES
('Goa', 3500, 1200, 900, 'moderate'),
('Mumbai', 4500, 1500, 800, 'premium'),
('Delhi', 3200, 1100, 700, 'moderate'),
('Jaipur', 2600, 900, 600, 'budget'),
('Bengaluru', 3800, 1300, 750, 'moderate'),
('Pune', 2800, 1000, 650, 'budget'),
('Kochi', 3000, 950, 700, 'budget'),
('Udaipur', 3300, 1000, 650, 'moderate');
