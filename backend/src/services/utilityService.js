const prisma = require('../config/prisma');

class UtilityService {
  // --- BUDGET CALCULATION ---
  async getTripBudget(userId, tripId) {
    // Fetch trip metadata and all activity costs in one query
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId },
      select: {
        name: true,
        
        stops: {
          select: {
            activities: {
              select: { cost: true }
            }
          }
        }
      }
    });

    if (!trip) throw new Error("Trip not found");

    // Flatten activities and sum the costs
    const totalSpent = trip.stops.reduce((acc, stop) => {
      const stopTotal = stop.activities.reduce((sum, act) => sum + act.cost, 0);
      return acc + stopTotal;
    }, 0);

    return {
      tripName: trip.name,
      totalSpent: totalSpent.toFixed(2),
      activityCount: trip.stops.flatMap(s => s.activities).length
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
