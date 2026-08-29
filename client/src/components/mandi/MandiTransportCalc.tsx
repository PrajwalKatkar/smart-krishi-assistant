import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { calculateTransportCost } from '../../services/api';
import { Truck, Fuel, Zap, Calculator, ShoppingBag, MapPin, CheckCircle2 } from 'lucide-react';

const INITIAL_PRODUCE_LISTINGS = [
  {
    id: 'prod-1',
    farmerName: 'Ramesh Patil',
    farmerPhone: '+91 98230 45678',
    crop: 'Nashik Red Onion',
    quantityQuintals: 45,
    pricePerQuintal: 2400,
    harvestDate: '2026-08-25',
    location: 'Pimplegaon, Nashik',
    grade: 'A Super',
    status: 'Available'
  },
  {
    id: 'prod-2',
    farmerName: 'Santosh Jadhav',
    farmerPhone: '+91 98231 11223',
    crop: 'Thompson Seedless Grapes',
    quantityQuintals: 80,
    pricePerQuintal: 6500,
    harvestDate: '2026-08-20',
    location: 'Ozar, Nashik',
    grade: 'A Super',
    status: 'Available'
  }
];

export const MandiTransportCalc: React.FC = () => {
  const { t, speakText } = useLanguage();
  const [distanceKm, setDistanceKm] = useState(38);
  const [vehicleType, setVehicleType] = useState('Pickup Loader');
  const [calcResult, setCalcResult] = useState<any>(null);

  // Direct buyer market state
  const [listings, setListings] = useState(INITIAL_PRODUCE_LISTINGS);
  const [showListingModal, setShowListingModal] = useState(false);
  const [newCrop, setNewCrop] = useState('Nashik Red Onion');
  const [newQty, setNewQty] = useState(50);
  const [newPrice, setNewPrice] = useState(2400);

  useEffect(() => {
    handleCalculate();
  }, [distanceKm, vehicleType]);

  const handleCalculate = async () => {
    const res = await calculateTransportCost(distanceKm, vehicleType);
    setCalcResult(res);
  };

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    setListings([
      {
        id: `prod-${Date.now()}`,
        farmerName: 'Ramesh Patil',
        farmerPhone: '+91 98230 45678',
        crop: newCrop,
        quantityQuintals: newQty,
        pricePerQuintal: newPrice,
        harvestDate: '2026-08-30',
        location: 'Pimplegaon, Nashik',
        grade: 'A Super',
        status: 'Available'
      },
      ...listings
    ]);
    setShowListingModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Truck className="w-8 h-8 text-yellow-300" />
          <div>
            <h1 className="text-2xl font-extrabold">Mandi Connect & Transport Fuel/EV Calculator</h1>
            <p className="text-emerald-100 text-xs">Calculate fuel or EV charging transport costs to nearby mandis & sell produce directly</p>
          </div>
        </div>
      </div>

      {/* Fuel & EV Calculator Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>Mandi Distance & Vehicle Fuel / EV Cost Estimator</span>
          </h3>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
            Real-Time Tariff
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Road Distance to Mandi (km)</label>
            <input
              type="number"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl p-2.5 bg-gray-50 focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2.5 bg-gray-50 font-bold focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Pickup Loader">Pickup Loader (12 km/L Diesel)</option>
              <option value="Mini Truck">Mini Truck (10 km/L Diesel)</option>
              <option value="Electric Truck (EV)">Electric Truck EV (0.8 kWh/km @ ₹9/kWh)</option>
              <option value="Tractor Trolley">Tractor Trolley (5 km/L Diesel)</option>
              <option value="Heavy Duty Truck">Heavy Duty Truck (6 km/L Diesel)</option>
            </select>
          </div>
        </div>

        {calcResult && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs text-emerald-950">
            <div className="flex justify-between items-center font-bold text-sm">
              <span className="flex items-center gap-1.5">
                {calcResult.fuelType === 'Electric' ? <Zap className="w-4 h-4 text-yellow-500" /> : <Fuel className="w-4 h-4 text-orange-600" />}
                <span>Required {calcResult.fuelType} Energy:</span>
              </span>
              <span>{calcResult.fuelRequiredUnits} {calcResult.unitLabel}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Estimated Fuel / Charge Cost:</span>
              <span>₹{calcResult.estimatedFuelCostINR.toLocaleString()}</span>
            </div>

            <div className="flex justify-between font-extrabold text-emerald-900 border-t border-emerald-200 pt-2 text-sm">
              <span>Total Estimated Transport Cost:</span>
              <span>₹{calcResult.totalTransportCostINR.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Direct Buyer Produce Marketplace */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span>Direct Farmer-to-Buyer Produce Marketplace</span>
            </h3>
            <p className="text-xs text-gray-500">Bypass middlemen by listing harvested produce for direct buyer offers</p>
          </div>

          <button
            onClick={() => setShowListingModal(true)}
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow"
          >
            + List Harvest Produce
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {listings.map((item: any) => (
            <div key={item.id} className="border border-gray-200 rounded-2xl p-4 bg-gray-50/60 space-y-2 text-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-extrabold text-gray-900 text-sm">{item.crop}</span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {item.grade}
                  </span>
                </div>
                <p className="text-gray-500 mt-1">Farmer: {item.farmerName} ({item.location})</p>

                <div className="my-2 bg-white p-2.5 rounded-xl border border-gray-200 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Available Quantity:</span>
                    <span>{item.quantityQuintals} Quintals</span>
                  </div>
                  <div className="flex justify-between font-black text-emerald-700 text-sm">
                    <span>Expected Price:</span>
                    <span>₹{item.pricePerQuintal}/Qtl</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${item.farmerPhone}`}
                className="w-full bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs text-center block hover:bg-emerald-600"
              >
                Contact Farmer / Negotiate
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Listing Modal */}
      {showListingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-900 text-sm">List Harvest Produce for Direct Buyers</h3>
              <button onClick={() => setShowListingModal(false)} className="font-bold text-gray-400">✕</button>
            </div>

            <form onSubmit={handleAddListing} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Crop Name</label>
                <input type="text" value={newCrop} onChange={(e) => setNewCrop(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Quantity (Quintals)</label>
                <input type="number" value={newQty} onChange={(e) => setNewQty(Number(e.target.value))} className="w-full p-2.5 border rounded-xl bg-gray-50" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Expected Price (₹ / Quintal)</label>
                <input type="number" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} className="w-full p-2.5 border rounded-xl bg-gray-50" />
              </div>

              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs">
                Publish Listing to Buyers ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
