import { MOCK_TRUCKS, TruckVehicleData } from '../data/mockData.js';

export function getAvailableTrucks(quantityQuintals?: number): {
  trucks: TruckVehicleData[];
  suggestedVehicleType: string;
} {
  let suggested = 'Pickup Loader (1-3 Tons)';
  if (quantityQuintals && quantityQuintals > 80) suggested = 'Heavy Duty Truck (10-15 Tons)';
  else if (quantityQuintals && quantityQuintals > 30) suggested = 'Tractor Trolley / EV Truck (3-5 Tons)';

  return {
    trucks: MOCK_TRUCKS,
    suggestedVehicleType: suggested
  };
}

export function bookTruckTransport(booking: {
  truckId: string;
  produceName: string;
  quantityQuintals: number;
  pickupLocation: string;
  destinationMandi: string;
  distanceKm: number;
}) {
  const truck = MOCK_TRUCKS.find(t => t.id === booking.truckId) || MOCK_TRUCKS[0];
  const estimatedFare = truck.baseFareINR + (booking.distanceKm * truck.ratePerKmINR);

  return {
    bookingId: `TRK-BK-${Math.floor(10000 + Math.random() * 90000)}`,
    truckOwner: truck.ownerName,
    phone: truck.ownerPhone,
    vehicleType: truck.vehicleType,
    pickup: booking.pickupLocation,
    destination: booking.destinationMandi,
    distanceKm: booking.distanceKm,
    estimatedFareINR: Math.round(estimatedFare),
    status: 'Confirmed & Driver Assigned',
    tripTimeline: [
      { step: 1, title: 'Trip Requested', done: true },
      { step: 2, title: 'Driver Confirmed', done: true },
      { step: 3, title: 'Vehicle Arrived at Farm', done: false, expected: 'In 30 mins' },
      { step: 4, title: 'Produce Delivered to Mandi', done: false, expected: 'In 2.5 hours' }
    ]
  };
}
