import React from 'react';
import { useFarmer } from '../../context/FarmerContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  CloudSun,
  Landmark,
  Sprout,
  TrendingUp,
  CreditCard,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface UnifiedHomeProps {
  setActiveTab: (tab: string) => void;
}

export const UnifiedHome: React.FC<UnifiedHomeProps> = ({ setActiveTab }) => {
  const { profile } = useFarmer();
  const { speakText } = useLanguage();

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🌾</span>
              <span className="bg-yellow-400 text-gray-900 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Unified Farmer Home Screen
              </span>
              {profile.aadhaarVerified && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Identity
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black">Welcome back, {profile.name}!</h1>
            <p className="text-emerald-100 text-xs md:text-sm mt-1">
              {profile.village}, {profile.district} • {profile.landAcres} Acres Registered ({profile.soilType})
            </p>
          </div>

          <button
            onClick={() => speakText(`Namaste ${profile.name}. Here is your farm summary for today: Weather is partly cloudy, Wheat mandi prices are up by 5 percent, and PM-KISAN subsidy is active.`)}
            className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2.5 rounded-2xl text-xs backdrop-blur-md transition flex items-center gap-2 border border-white/20 self-start md:self-auto"
          >
            <Volume2 className="w-4 h-4 text-yellow-300" /> Listen Audio Digest
          </button>
        </div>
      </div>

      {/* Quick Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Live Weather Alert Box */}
        <div
          onClick={() => setActiveTab('weather')}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl">
                <CloudSun className="w-5 h-5" />
              </div>
              <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                28°C • Nashik
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Weather & Soil Moisture</h3>
            <p className="text-xs text-gray-600 mt-1">Passing showers expected tomorrow. Soil moisture @ 38%.</p>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-blue-700 font-bold border-t border-blue-200/60 pt-2">
            <span>Spray Advisory: Ideal today</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* 2. Live Mandi Ticker Box */}
        <div
          onClick={() => setActiveTab('mandi')}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Live Rates
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Mandi Rates & Transport</h3>
            <p className="text-xs text-gray-600 mt-1">Wheat ₹2,380/Qtl (↑ +5.2%) • Cotton ₹7,150/Qtl</p>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-emerald-700 font-bold border-t border-emerald-200/60 pt-2">
            <span>Calculate EV/Fuel Transport Cost</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* 3. Active P2P Loans Dues Box */}
        <div
          onClick={() => setActiveTab('loans')}
          className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="p-2.5 bg-amber-600 text-white rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                Active Ledger
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm">P2P Shared Loan Ledger</h3>
            <p className="text-xs text-gray-600 mt-1">₹15,000 remaining on Shinde loan (Due Sept 15)</p>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-amber-800 font-bold border-t border-amber-200/60 pt-2">
            <span>2-Step Synced Log Payment</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Super-App Core Services Shortcuts */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
          <span>🚀 Agriculture Super-App Services</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
          <button
            onClick={() => setActiveTab('map')}
            className="p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 transition flex flex-col items-center gap-2 group"
          >
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 group-hover:scale-110 transition">
              🗺️
            </div>
            <span className="text-xs font-bold text-gray-800">Farm Map</span>
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className="p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-teal-50 hover:border-teal-300 transition flex flex-col items-center gap-2 group"
          >
            <div className="p-3 rounded-2xl bg-teal-100 text-teal-800 group-hover:scale-110 transition">
              🚛
            </div>
            <span className="text-xs font-bold text-gray-800">Truck Hire</span>
          </button>

          <button
            onClick={() => setActiveTab('labour')}
            className="p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-orange-50 hover:border-orange-300 transition flex flex-col items-center gap-2 group"
          >
            <div className="p-3 rounded-2xl bg-orange-100 text-orange-800 group-hover:scale-110 transition">
              👨‍🌾
            </div>
            <span className="text-xs font-bold text-gray-800">Labour Hire</span>
          </button>

          <button
            onClick={() => setActiveTab('loans')}
            className="p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-amber-50 hover:border-amber-300 transition flex flex-col items-center gap-2 group"
          >
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-900 group-hover:scale-110 transition">
              💳
            </div>
            <span className="text-xs font-bold text-gray-800">P2P Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('crop')}
            className="p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-purple-50 hover:border-purple-300 transition flex flex-col items-center gap-2 group"
          >
            <div className="p-3 rounded-2xl bg-purple-100 text-purple-800 group-hover:scale-110 transition">
              📷
            </div>
            <span className="text-xs font-bold text-gray-800">Pest Diagnosis</span>
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className="p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-yellow-50 hover:border-yellow-300 transition flex flex-col items-center gap-2 group"
          >
            <div className="p-3 rounded-2xl bg-yellow-100 text-yellow-900 group-hover:scale-110 transition">
              🏛️
            </div>
            <span className="text-xs font-bold text-gray-800">Govt Schemes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
