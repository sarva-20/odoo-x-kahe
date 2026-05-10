-- CreateTable
CREATE TABLE "Trip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "description" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cityName" TEXT NOT NULL,
    "arrivalDate" DATETIME,
    "departureDate" DATETIME,
    "tripId" INTEGER NOT NULL,
    CONSTRAINT "Stop_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "cost" REAL NOT NULL DEFAULT 0.0,
    "time" TEXT,
    "stopId" INTEGER NOT NULL,
    CONSTRAINT "Activity_stopId_fkey" FOREIGN KEY ("stopId") REFERENCES "Stop" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item" TEXT NOT NULL,
    "category" TEXT,
    "isPacked" BOOLEAN NOT NULL DEFAULT false,
    "tripId" INTEGER NOT NULL,
    CONSTRAINT "Checklist_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
