import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchLabourers } from '../../services/api';
import { Labourer } from '../../types';
import { Users, CheckCircle2, Star, Phone, Calendar, Clock } from 'lucide-react';

export const LabourModule: React.FC = () => {
  const { t, speakText } = useLanguage();
  const [labourers, setLabourers] = useState<Labourer[]>([]);
  const [skillFilter, setSkillFilter] = useState('All');
  const [activeRequest, setActiveRequest] = useState<any>(null);

  useEffect(() => {
    loadLabourers();
  }, [skillFilter]);

  const loadLabourers = async () => {
    const data = await fetchLabourers(skillFilter);
    setLabourers(data);
  };

  const handleHire = (labour: Labourer) => {
    setActiveRequest({
      id: `LAB-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      labourName: labour.name,
      phone: labour.phone,
      dailyRate: labour.dailyWageINR,
      durationDays: 3,
      totalAgreed: labour.dailyWageINR * 3,
      status: 'Hire Request Sent & Confirmed'
    });
    speakText(`Hire request sent to ${labour.name} for 3 days.`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-orange-800 to-amber-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8 text-yellow-300" />
              <h1 className="text-2xl font-extrabold">Labour Marketplace & Hiring Portal</h1>
            </div>
            <p className="text-orange-100 text-xs mt-1">
              Hire agricultural labour teams for harvesting, tilling, or spraying with agreed wage rates
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">Filter Skill:</span>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="bg-amber-950 text-white text-xs rounded-xl px-3 py-2 border border-amber-600 font-bold focus:outline-none"
            >
              <option value="All">All Skills</option>
              <option value="Harvesting">Harvesting</option>
              <option value="Spraying">Pesticide Spraying</option>
              <option value="Tilling">Tractor Tilling</option>
              <option value="Pruning">Pruning / Trimming</option>
            </select>
          </div>
        </div>
      </div>

      {/* Labourers List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {labourers.map((labour) => (
          <div key={labour.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-extrabold text-gray-900 text-base">{labour.name}</h4>
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-0.5 rounded">
                  ⭐ {labour.rating}
                </span>
              </div>
              <p className="text-xs text-gray-500">{labour.location} • {labour.experienceYears} Years Exp</p>

              <div className="flex flex-wrap gap-1 my-2">
                {labour.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-semibold border">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-lg font-black text-gray-900">
                ₹{labour.dailyWageINR} <span className="text-xs font-normal text-gray-500">/ Day</span>
              </div>
            </div>

            <button
              onClick={() => handleHire(labour)}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs shadow transition"
            >
              Send Hire Request ➔
            </button>
          </div>
        ))}
      </div>

      {/* Active Request Banner */}
      {activeRequest && (
        <div className="bg-orange-50 border border-orange-200 p-5 rounded-2xl space-y-2 text-xs text-orange-950">
          <div className="flex justify-between items-center font-bold text-sm">
            <span>✓ Hire Request Confirmed (#{activeRequest.id})</span>
            <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-xs">Active Contract</span>
          </div>
          <p>Assigned Team: <strong>{activeRequest.labourName}</strong> ({activeRequest.phone})</p>
          <div className="flex justify-between font-extrabold text-orange-900 border-t pt-2">
            <span>Duration: {activeRequest.durationDays} Days</span>
            <span>Total Agreed Wage: ₹{activeRequest.totalAgreed.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
