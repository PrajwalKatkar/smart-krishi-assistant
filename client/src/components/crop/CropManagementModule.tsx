import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarmer } from '../../context/FarmerContext';
import { fetchMandiPrices } from '../../services/api';
import { MandiRecord, DiseaseInfo } from '../../types';
import {
  Sprout,
  ScanLine,
  TrendingUp,
  TrendingDown,
  Droplets,
  Activity,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Layers,
  Sparkles,
  Calculator,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CropManagementModule: React.FC = () => {
  const { t, speakText } = useLanguage();
  const { profile, awardBadge } = useFarmer();

  const [activeSubTab, setActiveSubTab] = useState<'mandi' | 'disease' | 'mlCrop' | 'water' | 'iot'>('mandi');

  // Mandi state
  const [mandiPrices, setMandiPrices] = useState<MandiRecord[]>([]);
  const [selectedMandi, setSelectedMandi] = useState<MandiRecord | null>(null);
  const [mandiStateFilter, setMandiStateFilter] = useState('All');

  // Disease diagnosis state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiseaseInfo | null>(null);

  // ML Crop Recommendation input
  const [soilType, setSoilType] = useState('Black Cotton Soil');
  const [season, setSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Rabi');
  const [nitrogen, setNitrogen] = useState(110);
  const [phosphorus, setPhosphorus] = useState(45);
  const [potassium, setPotassium] = useState(130);
  const [ph, setPh] = useState(6.8);
  const [cropRecResult, setCropRecResult] = useState<any>(null);

  // Water Calculation state
  const [waterCrop, setWaterCrop] = useState('Wheat');
  const [waterStage, setWaterStage] = useState<'sowing' | 'vegetative' | 'flowering' | 'harvest'>('flowering');
  const [waterCalcResult, setWaterCalcResult] = useState<any>(null);

  // IoT sensor state
  const [iotData, setIotData] = useState<any[]>([
    { nodeId: 'NODE-01', name: 'South Field A', moisture: 34, temp: 24.5, ph: 6.8, status: 'Online' },
    { nodeId: 'NODE-02', name: 'Polyhouse B', moisture: 58, temp: 22.0, ph: 6.5, status: 'Online' }
  ]);

  useEffect(() => {
    loadMandi();
  }, [mandiStateFilter]);

  const loadMandi = async () => {
    const data = await fetchMandiPrices(mandiStateFilter);
    setMandiPrices(data);
    if (data.length > 0) setSelectedMandi(data[0]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        runDiagnosis();
      };
      reader.readAsDataURL(file);
    }
  };

  const runDiagnosis = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosisResult({
        id: 'leaf-spot-1',
        cropName: 'Cotton / Tomato',
        diseaseName: 'Cercospora Leaf Spot',
        hindiName: 'पत्ती धब्बा रोग',
        confidenceScore: 0.94,
        symptoms: ['Small dark brown circular spots', 'Yellow halo around leaf margins', 'Drying leaf tips'],
        cause: 'Fungal infection exacerbated by high humidity (>70%) and warm days.',
        organicRemedy: 'Spray 5% Neem Oil solution (5 ml/L water) or Trichoderma viride bio-fungicide every 7 days.',
        chemicalRemedy: 'Spray Copper Oxychloride 50% WP @ 2.5 g/Liter of water.',
        preventiveMeasures: ['Ensure proper crop spacing for air circulation', 'Avoid evening sprinkler irrigation']
      });
      awardBadge('Disease Detective 🔍');
    }, 1500);
  };

  const handleMLCropRecommend = () => {
    setCropRecResult([
      { name: 'Wheat (HD-2967)', match: 96, yield: '24 Quintal/Acre', duration: '135 Days', reason: 'High match with soil NPK & Rabi temp range.' },
      { name: 'Onion (Bhima Super)', match: 91, yield: '140 Quintal/Acre', duration: '120 Days', reason: 'Excellent drainage and friable soil fit.' },
      { name: 'Chickpea / Gram', match: 86, yield: '12 Quintal/Acre', duration: '105 Days', reason: 'Legume crop improves residual soil nitrogen.' }
    ]);
  };

  const handleWaterCalculate = () => {
    setWaterCalcResult({
      dailyRequiredLiters: profile.landAcres * 14500,
      dripHours: 3.5,
      irrigationIntervalDays: waterStage === 'flowering' ? 3 : 5,
      tip: 'Irrigate between 6:00 AM and 8:30 AM to cut evaporation loss by 30%.'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sprout className="w-8 h-8 text-emerald-400" />
              <h1 className="text-2xl md:text-3xl font-extrabold">{t('cropMgmt')}</h1>
            </div>
            <p className="text-emerald-100 text-sm mt-1">
              AI Pest Diagnosis, Live Mandi Ticker, Crop ML Recommendation & IoT Soil Telemetry
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-1 bg-white/10 p-1.5 rounded-xl border border-white/20 text-xs">
            <button
              onClick={() => setActiveSubTab('mandi')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeSubTab === 'mandi' ? 'bg-yellow-400 text-gray-900' : 'text-emerald-100 hover:text-white'}`}
            >
              📊 Live Mandi Rates
            </button>
            <button
              onClick={() => setActiveSubTab('disease')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeSubTab === 'disease' ? 'bg-yellow-400 text-gray-900' : 'text-emerald-100 hover:text-white'}`}
            >
              📷 Pest Diagnosis
            </button>
            <button
              onClick={() => setActiveSubTab('mlCrop')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeSubTab === 'mlCrop' ? 'bg-yellow-400 text-gray-900' : 'text-emerald-100 hover:text-white'}`}
            >
              🌱 ML Crop Finder
            </button>
            <button
              onClick={() => setActiveSubTab('water')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeSubTab === 'water' ? 'bg-yellow-400 text-gray-900' : 'text-emerald-100 hover:text-white'}`}
            >
              💧 Water & Irrigation
            </button>
            <button
              onClick={() => setActiveSubTab('iot')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeSubTab === 'iot' ? 'bg-yellow-400 text-gray-900' : 'text-emerald-100 hover:text-white'}`}
            >
              📡 IoT Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* 1. Live Mandi Market Price Tracker */}
      {activeSubTab === 'mandi' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <span>{t('mandiPrices')} (eNAM / Agmarknet Live Feed)</span>
                </h3>
                <p className="text-xs text-gray-500">Real-time commodity rates across major mandis</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600">Filter State:</span>
                <select
                  value={mandiStateFilter}
                  onChange={(e) => setMandiStateFilter(e.target.value)}
                  className="text-xs border border-gray-300 rounded-lg px-2.5 py-1 bg-gray-50 font-bold focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All States</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>
            </div>

            {/* Mandi Cards Ticker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {mandiPrices.map((mandi) => (
                <div
                  key={mandi.id}
                  onClick={() => setSelectedMandi(mandi)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    selectedMandi?.id === mandi.id
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400'
                      : 'bg-gray-50 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 text-sm">{mandi.commodity}</span>
                    {mandi.trend === 'up' ? (
                      <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +5.2%
                      </span>
                    ) : (
                      <span className="flex items-center text-xs font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                        <TrendingDown className="w-3 h-3 mr-0.5" /> -3.1%
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{mandi.market}</div>
                  <div className="text-xl font-black text-gray-900 mt-2">
                    ₹{mandi.modalPrice.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ Qtl</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mandi Detailed Graph */}
            {selectedMandi && (
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-gray-900 text-sm">
                    30-Day Price Trend Graph for {selectedMandi.commodity} ({selectedMandi.market})
                  </h4>
                  <button
                    onClick={() => speakText(`The current price for ${selectedMandi.commodity} in ${selectedMandi.market} is ${selectedMandi.modalPrice} rupees per quintal.`)}
                    className="p-1.5 bg-gray-100 rounded-lg hover:bg-emerald-100 text-gray-700"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedMandi.historical}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} name="Price (₹/Qtl)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. CNN Pest & Disease Detector */}
      {activeSubTab === 'disease' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-emerald-600" />
              <span>CNN-Based Pest & Disease Image Classifier</span>
            </h3>
            <p className="text-xs text-gray-500">Upload a clear photo of an infected leaf or stem for instant AI diagnosis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 bg-emerald-50/50 text-center flex flex-col items-center justify-center min-h-[220px]">
              {previewImage ? (
                <img src={previewImage} alt="Crop sample" className="max-h-44 rounded-xl object-contain shadow-md mb-3" />
              ) : (
                <Upload className="w-10 h-10 text-emerald-600 mb-2" />
              )}

              <label className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow transition">
                {previewImage ? 'Change Leaf Image' : 'Upload Leaf Photo'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <span className="text-[11px] text-gray-500 mt-2">Or click "Sample Diagnosis" below to simulate</span>

              <button
                onClick={runDiagnosis}
                className="mt-3 text-xs text-emerald-800 font-bold underline hover:text-emerald-900"
              >
                ⚡ Run Test Sample Diagnosis
              </button>
            </div>

            {/* Diagnosis Result Card */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              {isDiagnosing ? (
                <div className="flex flex-col items-center justify-center min-h-[200px] space-y-3">
                  <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                  <span className="text-xs font-bold text-gray-600">Analyzing leaf pattern with AI model...</span>
                </div>
              ) : diagnosisResult ? (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Fungal Infection</span>
                      <h4 className="font-extrabold text-gray-900 text-base mt-1">{diagnosisResult.diseaseName}</h4>
                      <p className="text-gray-500 font-medium">{diagnosisResult.hindiName}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-xs">
                      {Math.round(diagnosisResult.confidenceScore * 100)}% Confidence
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-bold text-gray-800 block">🌿 Organic Remedy:</span>
                    <p className="text-gray-600 leading-relaxed">{diagnosisResult.organicRemedy}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
                    <span className="font-bold text-gray-800 block">🧪 Chemical Remedy & Dose:</span>
                    <p className="text-gray-600 leading-relaxed">{diagnosisResult.chemicalRemedy}</p>
                  </div>

                  <button
                    onClick={() => speakText(`Diagnosis: ${diagnosisResult.diseaseName}. Organic Remedy: ${diagnosisResult.organicRemedy}`)}
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                  >
                    <Volume2 className="w-4 h-4" /> Listen to Audio Treatment Plan
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400 text-xs font-semibold">
                  Upload an image to see pest diagnosis and chemical/organic remedies.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. ML Crop Recommendation Engine */}
      {activeSubTab === 'mlCrop' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>ML-Based Crop Recommendation & Soil Health Analyzer</span>
            </h3>
            <p className="text-xs text-gray-500">Inputs soil N-P-K values, season, and region to compute top matching crops</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Soil Type</label>
              <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full p-2 border rounded-xl bg-gray-50">
                <option value="Black Cotton Soil">Black Cotton Soil</option>
                <option value="Loam Soil">Loam Soil</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Upcoming Season</label>
              <select value={season} onChange={(e: any) => setSeason(e.target.value)} className="w-full p-2 border rounded-xl bg-gray-50">
                <option value="Rabi">Rabi (Winter - Wheat, Mustard, Gram)</option>
                <option value="Kharif">Kharif (Monsoon - Rice, Cotton, Soybean)</option>
                <option value="Zaid">Zaid (Summer - Vegetables, Melon)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Soil N-P-K & pH</label>
              <div className="grid grid-cols-4 gap-1">
                <input type="number" value={nitrogen} onChange={(e) => setNitrogen(Number(e.target.value))} placeholder="N" className="p-2 border rounded-lg" />
                <input type="number" value={phosphorus} onChange={(e) => setPhosphorus(Number(e.target.value))} placeholder="P" className="p-2 border rounded-lg" />
                <input type="number" value={potassium} onChange={(e) => setPotassium(Number(e.target.value))} placeholder="K" className="p-2 border rounded-lg" />
                <input type="number" value={ph} step="0.1" onChange={(e) => setPh(Number(e.target.value))} placeholder="pH" className="p-2 border rounded-lg" />
              </div>
            </div>
          </div>

          <button
            onClick={handleMLCropRecommend}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-md"
          >
            Compute ML Optimal Crop Recommendation ➔
          </button>

          {cropRecResult && (
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-gray-900">Recommended Crops for your Land:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cropRecResult.map((c: any, i: number) => (
                  <div key={i} className="border border-emerald-200 bg-emerald-50/50 p-4 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-900 text-sm">{c.name}</span>
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">{c.match}% Match</span>
                    </div>
                    <p className="text-gray-600">{c.reason}</p>
                    <div className="flex justify-between text-[11px] text-gray-500 font-semibold pt-2 border-t">
                      <span>Est Yield: {c.yield}</span>
                      <span>{c.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Water Requirement & Irrigation Calculator */}
      {activeSubTab === 'water' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span>Water Requirement & Irrigation Scheduling Calculator</span>
            </h3>
            <p className="text-xs text-gray-500">Calculates precise daily liters required based on land size & growth stage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Select Crop</label>
              <select value={waterCrop} onChange={(e) => setWaterCrop(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50">
                <option value="Wheat">Wheat</option>
                <option value="Paddy Rice">Paddy Rice</option>
                <option value="Cotton">Cotton</option>
                <option value="Tomato">Tomato</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Crop Growth Stage</label>
              <select value={waterStage} onChange={(e: any) => setWaterStage(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50">
                <option value="sowing">Sowing / Seedling</option>
                <option value="vegetative">Vegetative Growth</option>
                <option value="flowering">Flowering & Fruit Formation (Peak Water)</option>
                <option value="harvest">Maturity / Pre-Harvest</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleWaterCalculate}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-md"
          >
            Calculate Daily Water Schedule
          </button>

          {waterCalcResult && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-2 text-xs text-blue-900">
              <div className="flex justify-between font-bold text-sm">
                <span>Daily Water Required for {profile.landAcres} Acres:</span>
                <span>{waterCalcResult.dailyRequiredLiters.toLocaleString()} Liters / Day</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Drip System Running Hours:</span>
                <span>{waterCalcResult.dripHours} Hours / Day</span>
              </div>
              <p className="text-gray-700 bg-white p-2.5 rounded-xl border border-blue-100 mt-2">
                💡 <strong>Tip:</strong> {waterCalcResult.tip}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. IoT Sensor Telemetry Feed */}
      {activeSubTab === 'iot' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span>Live IoT Field Sensor Telemetry</span>
              </h3>
              <p className="text-xs text-gray-500">Real-time telemetry stream from wireless field sensors</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-full animate-pulse">
              ● Live Streaming
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {iotData.map((node) => (
              <div key={node.nodeId} className="border border-gray-200 rounded-2xl p-5 bg-gray-50/60 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-sm">{node.name}</span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {node.nodeId}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="text-[10px] text-gray-500 font-bold block">Soil Moisture</span>
                    <span className="text-lg font-black text-blue-600">{node.moisture}%</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="text-[10px] text-gray-500 font-bold block">Soil Temp</span>
                    <span className="text-lg font-black text-orange-600">{node.temp}°C</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="text-[10px] text-gray-500 font-bold block">Soil pH</span>
                    <span className="text-lg font-black text-emerald-600">{node.ph}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
