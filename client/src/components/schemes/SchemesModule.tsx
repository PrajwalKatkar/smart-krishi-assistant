import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarmer } from '../../context/FarmerContext';
import { fetchRecommendedSchemes } from '../../services/api';
import { Scheme } from '../../types';
import {
  Landmark,
  FileCheck,
  Calculator,
  ShieldAlert,
  ExternalLink,
  Calendar,
  Filter,
  CheckCircle2,
  Volume2,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const SchemesModule: React.FC = () => {
  const { t, speakText } = useLanguage();
  const { profile } = useFarmer();

  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [matchScores, setMatchScores] = useState<Record<string, number>>({});
  const [filterCategory, setFilterCategory] = useState<'all' | 'central' | 'state'>('all');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  // Subsidy calculator state
  const [calcType, setCalcType] = useState<'drip' | 'solar_pump' | 'tractor' | 'seed'>('drip');
  const [unitCost, setUnitCost] = useState(120000);
  const [calcResult, setCalcResult] = useState<any>(null);

  // Claim Assistant State
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimCrop, setClaimCrop] = useState('Wheat');
  const [claimReason, setClaimReason] = useState<'Heavy Rain / Flood' | 'Drought' | 'Pest Attack'>('Heavy Rain / Flood');
  const [claimSubmittedResult, setClaimSubmittedResult] = useState<any>(null);

  useEffect(() => {
    loadSchemes();
  }, [profile]);

  const loadSchemes = async () => {
    const res = await fetchRecommendedSchemes(profile);
    setSchemes(res.recommendedSchemes);
    setMatchScores(res.matchScoreMap);
  };

  const handleCalculateSubsidy = () => {
    let subsidyPct = 55;
    let maxSubsidy = 75000;
    if (calcType === 'solar_pump') { subsidyPct = 60; maxSubsidy = 180000; }
    else if (calcType === 'tractor') { subsidyPct = 50; maxSubsidy = 125000; }
    else if (calcType === 'seed') { subsidyPct = 50; maxSubsidy = 25000; }

    const calculatedSubsidy = Math.min((unitCost * subsidyPct) / 100, maxSubsidy);
    const netFarmer = Math.max(0, unitCost - calculatedSubsidy);

    setCalcResult({
      subsidyAmount: Math.round(calculatedSubsidy),
      netCost: Math.round(netFarmer),
      bankLoanEligible: Math.round(netFarmer * 0.8)
    });
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimSubmittedResult({
      claimId: `PMFBY-${Math.floor(100000 + Math.random() * 900000)}`,
      payoutINR: profile.landAcres * 18000,
      status: 'Claim Registered & Intimation Sent to Inspection Officer'
    });
  };

  const filteredSchemes = schemes.filter(s => {
    if (filterCategory === 'central') return s.category === 'central';
    if (filterCategory === 'state') return s.category === 'state';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-950 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Landmark className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl md:text-3xl font-extrabold">{t('schemes')}</h1>
            </div>
            <p className="text-amber-100 text-sm mt-1">
              Personalized Govt Subsidies, Eligibility Checker & PMFBY Crop Insurance Assistant
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterCategory === 'all' ? 'bg-yellow-400 text-gray-900' : 'text-amber-100 hover:text-white'
              }`}
            >
              All Schemes
            </button>
            <button
              onClick={() => setFilterCategory('central')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterCategory === 'central' ? 'bg-yellow-400 text-gray-900' : 'text-amber-100 hover:text-white'
              }`}
            >
              Central Schemes
            </button>
            <button
              onClick={() => setFilterCategory('state')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterCategory === 'state' ? 'bg-yellow-400 text-gray-900' : 'text-amber-100 hover:text-white'
              }`}
            >
              State ({profile.state})
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Tools Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Interactive Subsidy Calculator Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-gray-900 text-lg">{t('subsidyCalc')}</h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
              Live Estimator
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Equipment / Project Type</label>
              <select
                value={calcType}
                onChange={(e: any) => setCalcType(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-xl p-2.5 bg-gray-50 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="drip">Drip Irrigation System (Micro-Irrigation)</option>
                <option value="solar_pump">PM-KUSUM Off-Grid Solar Pump (3-5 HP)</option>
                <option value="tractor">Tractor / Rotary Tiller Machinery</option>
                <option value="seed">High Yield Seed & Bio-Fertilizer Kit</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Total Unit Cost (₹)</label>
              <input
                type="number"
                value={unitCost}
                onChange={(e) => setUnitCost(Number(e.target.value))}
                className="w-full text-sm border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={handleCalculateSubsidy}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl transition text-sm shadow-md"
            >
              Calculate Subsidy Amount
            </button>

            {calcResult && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2 text-sm mt-3">
                <div className="flex justify-between font-bold text-emerald-900">
                  <span>Estimated Govt Subsidy:</span>
                  <span>₹{calcResult.subsidyAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Net Farmer Share:</span>
                  <span className="font-bold">₹{calcResult.netCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-blue-700 border-t border-emerald-200 pt-2">
                  <span>Kisan Credit Bank Loan Option:</span>
                  <span className="font-semibold">Up to ₹{calcResult.bankLoanEligible.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PMFBY Crop Insurance Assistant Launcher */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-lg">{t('insuranceClaim')} (PMFBY)</h3>
            </div>
            <p className="text-blue-100 text-xs leading-relaxed">
              Report crop damage from unseasonal rains, drought, or pest outbreak within 72 hours for direct compensation payout.
            </p>

            <div className="mt-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-blue-200">Registered Land:</span>
                <span className="font-bold">{profile.landAcres} Acres ({profile.village})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Active Policy:</span>
                <span className="font-bold text-emerald-300">PMFBY-2026-MH982</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowClaimModal(true)}
            className="mt-6 w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition shadow-lg text-sm"
          >
            Start Crop Damage Claim Wizard ➔
          </button>
        </div>
      </div>

      {/* Recommended Schemes Grid */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🎯 Matches for Your Profile ({profile.category} Farmer, {profile.landAcres} Acres)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => {
            const matchScore = matchScores[scheme.id] || 90;
            return (
              <div
                key={scheme.id}
                className="border border-gray-200 rounded-2xl p-5 hover:border-amber-400 transition-all hover:shadow-md flex flex-col justify-between bg-amber-50/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      scheme.category === 'central' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {scheme.category} Govt
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {matchScore}% Match Score
                    </span>
                  </div>

                  <h4 className="font-bold text-gray-900 text-base mt-2">{scheme.name}</h4>
                  <p className="text-xs text-amber-900 font-medium mb-3">{scheme.hindiName}</p>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                    {scheme.description}
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs font-semibold text-emerald-900 mb-3">
                    ✨ Benefit: {scheme.benefits}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-gray-500 block uppercase">Required Documents:</span>
                    <div className="flex flex-wrap gap-1">
                      {scheme.requiredDocuments.map((doc, i) => (
                        <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md border border-gray-200">
                          ✓ {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => speakText(`${scheme.name}. ${scheme.description}. Benefits: ${scheme.benefits}`)}
                    className="text-xs text-gray-600 hover:text-amber-800 flex items-center gap-1 font-semibold"
                  >
                    <Volume2 className="w-4 h-4" /> Listen
                  </button>

                  <a
                    href={scheme.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition shadow-sm"
                  >
                    Apply on Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-gray-900">PMFBY Crop Damage Claim Wizard</h3>
              <button onClick={() => setShowClaimModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            {!claimSubmittedResult ? (
              <form onSubmit={handleClaimSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Select Affected Crop</label>
                  <select
                    value={claimCrop}
                    onChange={(e) => setClaimCrop(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 bg-gray-50"
                  >
                    <option value="Wheat">Wheat (Rabi Season)</option>
                    <option value="Onion">Onion</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Tomato">Tomato</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Reason for Crop Damage</label>
                  <select
                    value={claimReason}
                    onChange={(e: any) => setClaimReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 bg-gray-50"
                  >
                    <option value="Heavy Rain / Flood">Heavy Rain / Waterlogging / Flood</option>
                    <option value="Drought">Severe Drought / Spun Out</option>
                    <option value="Pest Attack">Pest & Locust Attack</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-2xl bg-gray-50">
                  <p className="text-xs text-gray-600 font-semibold mb-1">📸 Upload Crop Damage Field Photo</p>
                  <input type="file" accept="image/*" className="text-xs text-gray-500 cursor-pointer" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition text-base shadow-md"
                >
                  Submit Loss Claim Notice ➔
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg text-gray-900">Claim Registered Successfully!</h4>
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs space-y-1 text-emerald-900">
                  <p><strong>Claim ID:</strong> {claimSubmittedResult.claimId}</p>
                  <p><strong>Estimated Compensation:</strong> ₹{claimSubmittedResult.payoutINR.toLocaleString()}</p>
                  <p><strong>Status:</strong> Field Officer inspection assigned within 48h.</p>
                </div>
                <button
                  onClick={() => { setShowClaimModal(false); setClaimSubmittedResult(null); }}
                  className="bg-gray-800 text-white font-bold px-6 py-2 rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
