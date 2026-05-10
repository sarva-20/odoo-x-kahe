const prisma = require('../config/prisma');

class ItineraryService {

  async addStop(userId, tripId, stopData) {
   
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId }
    });
    if (!trip) throw new Error("Unauthorized or Trip not found");

    
    return await prisma.stop.create({
      data: {
        cityName: stopData.cityName,
        hotelCostPerDay: parseFloat(stopData.hotelCostPerDay) || 0,
        transportCost: parseFloat(stopData.transportCost) || 0,
        arrivalDate: stopData.arrivalDate ? new Date(stopData.arrivalDate) : null,
        departureDate: stopData.departureDate ? new Date(stopData.departureDate) : null,
        tripId: parseInt(tripId)
      }
    });
  }


  async addActivity(userId, stopId, activityData) {
    
    const stop = await prisma.stop.findFirst({
      where: { 
        id: parseInt(stopId),
        trip: { userId: userId } 
      }
    });
    if (!stop) throw new Error("Unauthorized or Stop not found");


    return await prisma.activity.create({
      data: {
        name: activityData.name,
        category: activityData.category,
        cost: parseFloat(activityData.cost) || 0,
        time: activityData.time,
        estimatedPopularity: parseInt(activityData.estimatedPopularity, 10) || 50,
        isFree: activityData.isFree === true || activityData.isFree === 'true',
        stopId: parseInt(stopId)
      }
    });
  }

  // --- THE "DEEP FETCH" ---
  async getFullItinerary(userId, tripId) {
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId },
      include: {
        stops: {
          include: { activities: true },
          orderBy: { arrivalDate: 'asc' }
        }
      }
    });
    if (!trip) throw new Error("Trip not found");
    return trip;
  }
}

module.exports = new ItineraryService();
