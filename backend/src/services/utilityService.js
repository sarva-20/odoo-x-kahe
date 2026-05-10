const prisma = require('../config/prisma');

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DEFAULT_HOTEL_COST_PER_DAY = 3000;
const DEFAULT_FOOD_COST_PER_DAY = 1200;
const DEFAULT_TRANSPORT_COST = 500;

function roundMoney(value) {
  return Number((Number(value) || 0).toFixed(2));
}

function roundRatio(value) {
  return Number((Number(value) || 0).toFixed(4));
}

function getStopDays(stop) {
  if (!stop.arrivalDate || !stop.departureDate) return 1;

  const arrival = new Date(stop.arrivalDate);
  const departure = new Date(stop.departureDate);
  const diffDays = Math.ceil((departure - arrival) / MS_PER_DAY);

  return Math.max(diffDays, 1);
}

async function getCityCostMap(stops) {
  const cityNames = [...new Set(stops.map((stop) => stop.cityName).filter(Boolean))];
  if (!cityNames.length) return new Map();

  const cityCosts = await prisma.cityCost.findMany({
    where: { cityName: { in: cityNames } }
  });

  return new Map(cityCosts.map((city) => [city.cityName.toLowerCase(), city]));
}

function getCityCost(cityCostMap, cityName) {
  if (!cityName) return null;
  return cityCostMap.get(cityName.toLowerCase()) || null;
}

class UtilityService {
  // --- BUDGET CALCULATION ---
  async getTripBudget(userId, tripId) {
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId },
      include: {
        stops: {
          include: { activities: true }
        }
      }
    });

    if (!trip) throw new Error("Trip not found");

    const cityCostMap = await getCityCostMap(trip.stops);
    let stayTotal = 0;
    let foodTotal = 0;
    let transportTotal = 0;
    let activitiesTotal = 0;
    let totalTripDays = 0;

    for (const stop of trip.stops) {
      const cityCost = getCityCost(cityCostMap, stop.cityName);
      const stopDays = getStopDays(stop);
      const hotelCostPerDay = Number(
        stop.hotelCostPerDay ||
        cityCost?.avgHotelCostPerDay ||
        DEFAULT_HOTEL_COST_PER_DAY
      );
      const foodCostPerDay = Number(
        cityCost?.avgFoodCostPerDay ||
        DEFAULT_FOOD_COST_PER_DAY
      );

      totalTripDays += stopDays;
      stayTotal += stopDays * hotelCostPerDay;
      foodTotal += stopDays * foodCostPerDay;
      transportTotal += Number(
        stop.transportCost ||
        cityCost?.avgTransportCost ||
        DEFAULT_TRANSPORT_COST
      );

      for (const activity of stop.activities) {
        activitiesTotal += Number(activity.cost || 0);
      }
    }

    const baseTotal = stayTotal + foodTotal + transportTotal + activitiesTotal;
    const miscellaneousTotal = baseTotal * 0.05;
    const estimatedTotal = baseTotal + miscellaneousTotal;
    const targetBudget = Number(trip.budgetAmount || 0);
    const remainingBudget = targetBudget - estimatedTotal;
    const budgetRatio = targetBudget > 0 ? estimatedTotal / targetBudget : 0;
    const activityCount = trip.stops.flatMap((stop) => stop.activities).length;

    return {
      trip_id: trip.id,
      tripName: trip.name,
      totalSpent: roundMoney(activitiesTotal).toFixed(2),
      activityCount,
      stay_total: roundMoney(stayTotal),
      food_total: roundMoney(foodTotal),
      transport_total: roundMoney(transportTotal),
      activities_total: roundMoney(activitiesTotal),
      miscellaneous_total: roundMoney(miscellaneousTotal),
      estimated_total: roundMoney(estimatedTotal),
      target_budget: roundMoney(targetBudget),
      remaining_budget: roundMoney(remainingBudget),
      budget_ratio: roundRatio(budgetRatio),
      budget_status: remainingBudget >= 0 ? 'within_budget' : 'over_budget',
      daily_average: roundMoney(totalTripDays > 0 ? estimatedTotal / totalTripDays : 0)
    };
  }

  // --- CHECKLIST LOGIC ---
  async addChecklistItem(userId, tripId, itemData) {
    // Verify ownership
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId }
    });
    if (!trip) throw new Error("Unauthorized or Trip not found");

    return await prisma.checklist.create({
      data: {
        item: itemData.item,
        category: itemData.category || "General",
        tripId: parseInt(tripId)
      }
    });
  }

  async toggleChecklistItem(userId, itemId) {
    // First, verify the item belongs to a trip owned by the user
    const item = await prisma.checklist.findFirst({
      where: {
        id: parseInt(itemId),
        trip: { userId: userId }
      }
    });

    if (!item) throw new Error("Item not found or unauthorized");

    return await prisma.checklist.update({
      where: { id: parseInt(itemId) },
      data: { isPacked: !item.isPacked }
    });
  }
}

module.exports = new UtilityService();
