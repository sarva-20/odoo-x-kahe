const prisma = require('../config/prisma');

class TripService {
  async createTrip(userId, tripData) {
    return await prisma.trip.create({
      data: {
        ...tripData,
        userId,
        // Ensure dates are actual Date objects
        startDate: new Date(tripData.startDate),
        endDate: new Date(tripData.endDate),
      }
    });
  }

  async getAllUserTrips(userId) {
    return await prisma.trip.findMany({
      where: { userId },
      orderBy: { startDate: 'asc' }
    });
  }

  async getTripById(userId, tripId) {
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId },
      include: {
        stops: {
          include: { activities: true }
        },
        checklists: true
      }
    });
    
    if (!trip) throw new Error("Trip not found or unauthorized");
    return trip;
  }

  async deleteTrip(userId, tripId) {
    // findFirst ensures the trip belongs to the user before deleting
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId }
    });

    if (!trip) throw new Error("Unauthorized to delete this trip");

    return await prisma.trip.delete({
      where: { id: parseInt(tripId) }
    });
  }
}

module.exports = new TripService();
