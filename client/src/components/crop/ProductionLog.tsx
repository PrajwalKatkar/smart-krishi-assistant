import React, { useState } from 'react';
import { useFarmer } from '../../context/FarmerContext';
import { CropYieldLog } from '../../types';
import { Sprout, Plus, Calendar, CheckCircle2 } from 'lucide-react';

const INITIAL_YIELD_LOGS: CropYieldLog[] = [
  {
    id: 'ylog-1',
    cropName: 'Wheat (Rabi 2025)',
    season: 'Rabi',
    quantityQuintals: 58,
    areaHarvestedAcres: 2.5,
    harvestDate: '2025-04-12',
    notes: 'Bumper harvest using DAP & drip fertigation.'
  },
  {
    id: 'ylog-2',
    cropName: 'Nashik Onion (Kharif 2025)',
    season: 'Kharif',
    quantityQuintals: 310,
    areaHarvestedAcres: 2.5,
    harvestDate: '2025-11-20',
    notes: 'Sold at Lasalgaon Mandi @ ₹2,200/Qtl.'
  }
];

export const ProductionLog: React.FC = () => {
  const { profile, awardBadge } = useFarmer();
  const [logs, setLogs] = useState<CropYieldLog[]>(INITIAL_YIELD_LOGS);
  const [cropName, setCropName] = useState('Nashik Red Onion');
  const [season, setSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Rabi');
  const [quantity, setQuantity] = useState(120);
  const [acres, setAcres] = useState(profile.landAcres);
  const [notes, setNotes] = useState('High quality grade yield with drip fertigation.');

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: CropYieldLog = {
      id: `ylog-${Date.now()}`,
      cropName: `${cropName} (${season} 2026)`,
      season,
      quantityQuintals: quantity,
      areaHarvestedAcres: acres,
      harvestDate: new Date().toISOString().split('T')[0],
      notes
    };

    setLogs([newLog, ...logs]);
    awardBadge('Yield Master 🌾');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>Crop Harvest Yield & Production Log</span>
          </h3>
          <p className="text-xs text-gray-500">Record seasonal harvest quantities to build verified yield history for schemes & mandi sales</p>
        </div>
      </div>

      {/* Production Log Entry Form */}
      <form onSubmit={handleAddLog} className="bg-gray-50 p-4 rounded-2xl border space-y-3 text-xs">
        <h4 className="font-bold text-gray-900">Record New Harvest Batch</h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Crop Name</label>
            <input type="text" value={cropName} onChange={(e) => setCropName(e.target.value)} className="w-full p-2 border rounded-xl bg-white" />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Season</label>
            <select value={season} onChange={(e: any) => setSeason(e.target.value)} className="w-full p-2 border rounded-xl bg-white">
              <option value="Rabi">Rabi (Winter)</option>
              <option value="Kharif">Kharif (Monsoon)</option>
              <option value="Zaid">Zaid (Summer)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Yield Quantity (Quintals)</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full p-2 border rounded-xl bg-white font-bold" />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Area Harvested (Acres)</label>
            <input type="number" value={acres} onChange={(e) => setAcres(Number(e.target.value))} className="w-full p-2 border rounded-xl bg-white" />
          </div>
        </div>

        <button type="submit" className="bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-emerald-600">
          + Save Harvest Production Log
        </button>
      </form>

      {/* Yield History Stream */}
      <div className="space-y-2">
        <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider">Historical Production Records</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {logs.map((log) => (
            <div key={log.id} className="border border-emerald-200 bg-emerald-50/50 p-4 rounded-2xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-emerald-900 text-sm">
                <span>{log.cropName}</span>
                <span>{log.quantityQuintals} Quintals</span>
              </div>
              <p className="text-gray-600">{log.notes}</p>
              <div className="flex justify-between text-[11px] text-gray-500 pt-2 border-t">
                <span>Harvested: {log.harvestDate}</span>
                <span>Area: {log.areaHarvestedAcres} Acres</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
