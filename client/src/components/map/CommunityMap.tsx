import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchCommunityFarms } from '../../services/api';
import { FarmPin } from '../../types';
import { MapPin, Eye, EyeOff, Phone, ShieldCheck, Filter, Users } from 'lucide-react';

export const CommunityMap: React.FC = () => {
  const { t, speakText } = useLanguage();
  const [farms, setFarms] = useState<FarmPin[]>([]);
  const [cropFilter, setCropFilter] = useState('All');
  const [privacyMask, setPrivacyMask] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<FarmPin | null>(null);

  useEffect(() => {
    loadFarms();
  }, [cropFilter]);

  const loadFarms = async () => {
    const data = await fetchCommunityFarms(cropFilter);
    setFarms(data);
    if (data.length > 0) setSelectedFarm(data[0]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-8 h-8 text-yellow-300" />
              <h1 className="text-2xl md:text-3xl font-extrabold">Farmer Community Map</h1>
            </div>
            <p className="text-emerald-100 text-sm mt-1">
              Interactive nearby farm plots for peer produce discovery, labour hiring & trust building
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPrivacyMask(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                privacyMask ? 'bg-amber-400 text-gray-900' : 'bg-emerald-700 hover:bg-emerald-600 text-white'
              }`}
            >
              {privacyMask ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{privacyMask ? 'Village-Level Mask ON' : 'Exact Pin View'}</span>
            </button>

            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="bg-emerald-950 text-white text-xs rounded-xl px-3 py-2 border border-emerald-600 font-bold focus:outline-none"
            >
              <option value="All">All Crops</option>
              <option value="Wheat">Wheat Farms</option>
              <option value="Onion">Onion Farms</option>
              <option value="Tomato">Tomato Farms</option>
              <option value="Grapes">Grapes Farms</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Simulation Container */}
      <div className="bg-emerald-950/90 rounded-3xl p-6 shadow-lg border border-emerald-800 text-white relative min-h-[380px] overflow-hidden flex flex-col justify-between">
        {/* Background Map Grid Graphic */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="flex justify-between items-center relative z-10">
          <span className="text-xs font-bold text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-700">
            📍 Nashik Agricultural Cluster (25 km Radius)
          </span>
          <span className="text-xs text-yellow-300 font-bold">Showing {farms.length} Registered Farms</span>
        </div>

        {/* Map Pins Simulation Canvas */}
        <div className="relative z-10 my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {farms.map((farm) => {
            const isSelected = selectedFarm?.id === farm.id;
            return (
              <div
                key={farm.id}
                onClick={() => setSelectedFarm(farm)}
                className={`p-4 rounded-2xl border backdrop-blur-md cursor-pointer transition transform hover:scale-105 ${
                  isSelected
                    ? 'bg-emerald-800 border-yellow-400 ring-2 ring-yellow-400 shadow-xl'
                    : 'bg-emerald-900/70 border-emerald-700/60 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">🌾</span>
                  {farm.trustBadge && (
                    <span className="text-[10px] bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded">
                      Verified
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-white text-sm mt-2">{farm.ownerName}</h4>
                <p className="text-xs text-emerald-200 mt-0.5">
                  {privacyMask ? `${farm.village} Area` : `${farm.village}, ${farm.district}`}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {farm.crops.map((c, i) => (
                    <span key={i} className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-bold">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-2 text-[11px] font-extrabold text-yellow-300">
                  {farm.landAcres} Acres Plot
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Farm Detail Drawer */}
        {selectedFarm && (
          <div className="relative z-10 bg-white text-gray-900 rounded-2xl p-4 shadow-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-base">{selectedFarm.ownerName}</h4>
                {selectedFarm.trustBadge && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Aadhaar Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600">
                Location: {privacyMask ? selectedFarm.village : `${selectedFarm.village}, ${selectedFarm.district}`} • {selectedFarm.landAcres} Acres
              </p>
              <div className="flex gap-1 text-xs font-semibold text-emerald-800">
                Active Crops: {selectedFarm.crops.join(', ')}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakText(`Farm owner ${selectedFarm.ownerName} in ${selectedFarm.village}, growing ${selectedFarm.crops.join(', ')}`)}
                className="p-2 bg-gray-100 rounded-xl hover:bg-emerald-100 text-gray-700"
              >
                🔊
              </button>
              <a
                href={`tel:${selectedFarm.phone}`}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Phone className="w-4 h-4" /> Connect with Farmer
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
