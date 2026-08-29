import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchTrucks, bookTruck } from '../../services/api';
import { TruckVehicle } from '../../types';
import { Truck, CheckCircle2, MapPin, ShieldCheck, Clock, Zap } from 'lucide-react';

export const LogisticsModule: React.FC = () => {
  const { t, speakText } = useLanguage();
  const [quantity, setQuantity] = useState(35);
  const [trucks, setTrucks] = useState<TruckVehicle[]>([]);
  const [suggestedType, setSuggestedType] = useState('');
  const [activeBooking, setActiveBooking] = useState<any>(null);

  useEffect(() => {
    loadTrucks();
  }, [quantity]);

  const loadTrucks = async () => {
    const res = await fetchTrucks(quantity);
    setTrucks(res.trucks);
    setSuggestedType(res.suggestedVehicleType);
  };

  const handleBook = async (truck: TruckVehicle) => {
    const booking = await bookTruck({
      truckId: truck.id,
      produceName: 'Wheat / Onion Harvest',
      quantityQuintals: quantity,
      pickupLocation: 'Pimplegaon Farm Block A',
      destinationMandi: 'Nashik APMC Mandi',
      distanceKm: 35
    });
    setActiveBooking(booking);
    speakText(`Booking confirmed with ${truck.ownerName}. Vehicle type ${truck.vehicleType}`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Truck className="w-8 h-8 text-teal-300" />
          <div>
            <h1 className="text-2xl font-extrabold">Logistics & Truck Rental Marketplace</h1>
            <p className="text-teal-100 text-xs">Book nearby mini-trucks, tractor-trolleys, or EV trucks with automatic capacity matching</p>
          </div>
        </div>
      </div>

      {/* Produce Capacity Matcher Input */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
          <span>Enter Harvest Produce Weight to Transport:</span>
          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">{quantity} Quintals</span>
        </div>
        <input
          type="range"
          min={5}
          max={150}
          step={5}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
        />

        <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl text-xs text-teal-900 font-semibold flex items-center justify-between">
          <span>🤖 AI Recommended Vehicle Class:</span>
          <span className="font-extrabold text-teal-950 bg-white px-3 py-1 rounded-lg border border-teal-300">
            {suggestedType}
          </span>
        </div>
      </div>

      {/* Available Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trucks.map((truck) => (
          <div key={truck.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  truck.vehicleType.includes('EV') ? 'bg-yellow-100 text-yellow-900' : 'bg-teal-100 text-teal-800'
                }`}>
                  {truck.vehicleType}
                </span>
                <h4 className="font-extrabold text-gray-900 text-base mt-1">{truck.ownerName}</h4>
                <p className="text-xs text-gray-500">{truck.location} • Rating: ⭐ {truck.rating}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 font-medium">Base Fare</span>
                <div className="text-lg font-black text-gray-900">₹{truck.baseFareINR}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1 border">
              <div className="flex justify-between">
                <span className="text-gray-600">Payload Capacity:</span>
                <span className="font-bold">{truck.capacityQuintals} Quintals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance Rate:</span>
                <span className="font-bold">₹{truck.ratePerKmINR} / km</span>
              </div>
            </div>

            <button
              onClick={() => handleBook(truck)}
              className="w-full bg-teal-700 hover:bg-teal-600 text-white font-bold py-2.5 rounded-xl text-xs shadow transition"
            >
              Book Produce Transport Now ➔
            </button>
          </div>
        ))}
      </div>

      {/* Active Trip Status Modal */}
      {activeBooking && (
        <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-800 space-y-4">
          <div className="flex justify-between items-center border-b border-emerald-800 pb-3">
            <div>
              <span className="bg-yellow-400 text-gray-900 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                Active Trip #{activeBooking.bookingId}
              </span>
              <h3 className="font-extrabold text-lg mt-1">{activeBooking.vehicleType}</h3>
            </div>
            <button onClick={() => setActiveBooking(null)} className="text-emerald-300 text-xs font-bold">✕ Close</button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
              <span className="text-emerald-300 block text-[10px]">Driver Contact</span>
              <span className="font-bold">{activeBooking.truckOwner} ({activeBooking.phone})</span>
            </div>
            <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
              <span className="text-emerald-300 block text-[10px]">Estimated Fare</span>
              <span className="font-bold text-yellow-300">₹{activeBooking.estimatedFareINR}</span>
            </div>
          </div>

          {/* Trip Timeline */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-emerald-200 uppercase block">Live Trip Progress Timeline:</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              {activeBooking.tripTimeline.map((step: any) => (
                <div key={step.step} className={`p-2 rounded-xl border ${step.done ? 'bg-emerald-800 border-yellow-400 text-white' : 'bg-emerald-950 border-emerald-800 text-emerald-400'}`}>
                  <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />
                  <span className="font-bold">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
