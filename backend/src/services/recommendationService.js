const prisma = require('../config/prisma');
const utilityService = require('./utilityService');

const ACTIVITY_RECOMMENDATIONS = [
  { cityName: 'Goa', name: 'Beach walk and sunset point', category: 'sightseeing', cost: 0, popularity: 82, isFree: true },
  { cityName: 'Goa', name: 'Local spice plantation tour', category: 'culture', cost: 900, popularity: 76, isFree: false },
  { cityName: 'Goa', name: 'Premium water sports combo', category: 'adventure', cost: 3500, popularity: 90, isFree: false },
  { cityName: 'Mumbai', name: 'Marine Drive walk', category: 'sightseeing', cost: 0, popularity: 88, isFree: true },
  { cityName: 'Mumbai', name: 'Street food trail', category: 'food', cost: 700, popularity: 84, isFree: false },
  { cityName: 'Mumbai', name: 'Private city heritage tour', category: 'culture', cost: 2800, popularity: 86, isFree: false },
  { cityName: 'Delhi', name: 'Lodhi Garden visit', category: 'sightseeing', cost: 0, popularity: 80, isFree: true },
  { cityName: 'Delhi', name: 'Old Delhi food walk', category: 'food', cost: 800, popularity: 87, isFree: false },
  { cityName: 'Delhi', name: 'Guided monuments pass', category: 'culture', cost: 2200, popularity: 89, isFree: false },
  { cityName: 'Jaipur', name: 'Old city walking route', category: 'culture', cost: 0, popularity: 78, isFree: true },
  { cityName: 'Jaipur', name: 'Fort and palace day pass', category: 'sightseeing', cost: 1200, popularity: 91, isFree: false },
  { cityName: 'Jaipur', name: 'Private craft and cuisine experience', category: 'culture', cost: 2600, popularity: 85, isFree: false },
  { cityName: 'Bengaluru', name: 'Cubbon Park and museum route', category: 'sightseeing', cost: 100, popularity: 75, isFree: false },
  { cityName: 'Bengaluru', name: 'Local brewery tasting', category: 'food', cost: 1800, popularity: 82, isFree: false },
  { cityName: 'Bengaluru', name: 'Premium food and tech district tour', category: 'food', cost: 3200, popularity: 80, isFree: false }
];

function getRecommendationBand(budget) {
  if (budget.remaining_budget <= 0) return 'low_cost';
  if (budget.budget_ratio >= 0.9) return 'low_cost';
  if (budget.budget_ratio >= 0.6) return 'balanced';
  return 'premium';
}

function isAffordableForBand(activity, remainingBudget, band) {
  if (activity.cost > remainingBudget) return false;
  if (band === 'low_cost') return activity.isFree || activity.cost <= 1000;
  if (band === 'balanced') return activity.cost <= Math.max(remainingBudget * 0.4, 1500);
  return activity.cost > 1000;
}

class RecommendationService {
  async getRecommendations(userId, tripId) {
    const budget = await utilityService.getTripBudget(userId, tripId);
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(tripId), userId },
      include: {
        stops: {
          include: { activities: true }
        }
      }
    });

    if (!trip) throw new Error('Trip not found');

    const cities = new Set(trip.stops.map((stop) => stop.cityName.toLowerCase()));
    const selectedActivities = new Set(
      trip.stops.flatMap((stop) => stop.activities.map((activity) => activity.name.toLowerCase()))
    );
    const band = getRecommendationBand(budget);
    const availableBudget = Math.max(budget.remaining_budget, 0);

    const recommendations = ACTIVITY_RECOMMENDATIONS
      .filter((activity) => cities.has(activity.cityName.toLowerCase()))
      .filter((activity) => !selectedActivities.has(activity.name.toLowerCase()))
      .filter((activity) => isAffordableForBand(activity, availableBudget, band))
      .sort((a, b) => b.popularity - a.popularity || a.cost - b.cost)
      .slice(0, 10)
      .map((activity) => ({
        city_name: activity.cityName,
        activity_name: activity.name,
        category: activity.category,
        estimated_cost: activity.cost,
        popularity_score: activity.popularity,
        is_free: activity.isFree,
        recommendation_type: band
      }));

    return {
      budget_status: budget.budget_status,
      remaining_budget: budget.remaining_budget,
      recommendations
    };
  }
}

module.exports = new RecommendationService();
