import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchWeather } from '../../services/api';
import { WeatherData } from '../../types';
import {
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Volume2,
  Layers,
  MapPin
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const WeatherModule: React.FC = () => {
  const { t, speakText, lowLiteracyMode } = useLanguage();
  const [locationInput, setLocationInput] = useState('Nashik');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = async (loc: string) => {
    setLoading(true);
    const data = await fetchWeather(loc);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather('Nashik');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      loadWeather(locationInput.trim());
    }
  };

  if (loading || !weather) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CloudSun className="w-8 h-8 text-yellow-300" />
              <h1 className="text-2xl md:text-3xl font-extrabold">{t('weather')}</h1>
            </div>
            <p className="text-emerald-100 text-sm mt-1">
              Hyperlocal 15-Day Weather Forecast & Satellite Soil Moisture Advisory
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-xl p-1.5 backdrop-blur-md border border-white/20">
            <MapPin className="w-5 h-5 text-emerald-200 ml-2" />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder={t('searchLocation')}
              className="bg-transparent text-white placeholder-emerald-200 text-sm px-3 py-1.5 focus:outline-none w-48 md:w-64"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-1.5 rounded-lg text-sm transition"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Weather Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Temperature */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Temperature</span>
            <Thermometer className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-black text-gray-900">{weather.temperature}°C</div>
          <div className="text-xs text-gray-500 mt-1">Feels like {weather.feelsLike}°C • {weather.condition}</div>
          <button
            onClick={() => speakText(`Current temperature in ${weather.location} is ${weather.temperature} degrees Celsius`)}
            className="absolute bottom-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('humidity')}</span>
            <Droplets className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-gray-900">{weather.humidity}%</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Good leaf transpiration</div>
        </div>

        {/* Rainfall */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('rainfall')}</span>
            <CloudRain className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-3xl font-black text-gray-900">{weather.rainfallMm} mm</div>
          <div className="text-xs text-gray-500 mt-1">Light passing showers</div>
        </div>

        {/* Wind Speed */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('windSpeed')}</span>
            <Wind className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-gray-900">{weather.windSpeedKmh} <span className="text-base font-semibold">km/h</span></div>
          <div className="text-xs text-emerald-600 font-medium mt-1">{weather.windDirection}</div>
        </div>
      </div>

      {/* Advisory Action Cards: Best Day to Spray & Best Day to Irrigate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spray Window Advisory */}
        <div className={`rounded-2xl p-6 border shadow-sm transition ${
          weather.bestSprayingDay.recommended ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                weather.bestSprayingDay.recommended ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
              }`}>
                {weather.bestSprayingDay.recommended ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{t('sprayRecommendation')}</h3>
                <p className="text-xs text-gray-600 font-medium">Optimal conditions for chemical & organic sprays</p>
              </div>
            </div>
            <button
              onClick={() => speakText(weather.bestSprayingDay.reason)}
              className="p-2 bg-white rounded-lg text-emerald-800 hover:bg-emerald-100 shadow-sm"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-800 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-gray-200/50">
            {weather.bestSprayingDay.reason}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-600 font-bold">
            <span>Recommended Window:</span>
            <span className="text-emerald-900 bg-white px-3 py-1 rounded-md border border-emerald-300">
              {weather.bestSprayingDay.bestTimeWindow}
            </span>
          </div>
        </div>

        {/* Irrigation Advisory & NASA Satellite Soil Moisture */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-600 text-white">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{t('soilMoisture')} (NASA POWER)</h3>
                <p className="text-xs text-gray-600 font-medium">Estimated via Satellite Surface Evapotranspiration</p>
              </div>
            </div>
            <span className="text-2xl font-black text-blue-900 bg-white px-3 py-1 rounded-xl border border-blue-300">
              {weather.soilMoisturePct}%
            </span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
              <span>Soil Moisture Level</span>
              <span>{weather.soilMoisturePct > 40 ? 'Optimal' : 'Low Moisture'}</span>
            </div>
            <div className="w-full bg-blue-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500"
                style={{ width: `${weather.soilMoisturePct}%` }}
              ></div>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-700 font-medium bg-white/70 p-3 rounded-xl">
            {weather.bestIrrigationDay.reason}
          </p>
        </div>
      </div>

      {/* Crop Risk Index Score */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-gray-900 text-lg">Weather-based Crop Risk Index</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            weather.cropRiskIndex.overallStatus === 'Safe' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
          }`}>
            {weather.cropRiskIndex.overallStatus}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="text-xs font-bold text-orange-800 uppercase">{t('droughtRisk')}</div>
            <div className="text-2xl font-black text-orange-900 mt-1">{weather.cropRiskIndex.droughtRisk}%</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-800 uppercase">{t('floodRisk')}</div>
            <div className="text-2xl font-black text-blue-900 mt-1">{weather.cropRiskIndex.floodRisk}%</div>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <div className="text-xs font-bold text-red-800 uppercase">{t('heatwaveRisk')}</div>
            <div className="text-2xl font-black text-red-900 mt-1">{weather.cropRiskIndex.heatwaveRisk}%</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <div className="text-xs font-bold text-purple-800 uppercase">Frost Warning</div>
            <div className="text-2xl font-black text-purple-900 mt-1">{weather.cropRiskIndex.frostRisk}%</div>
          </div>
        </div>
      </div>

      {/* 15-Day Hyperlocal Forecast Carousel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-gray-900 text-lg">15-Day Hyperlocal Village Forecast</h3>
          </div>
          <span className="text-xs text-gray-500 font-medium">Scroll right ➔</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {weather.forecast15Days.map((day, idx) => (
            <div
              key={idx}
              className={`min-w-[130px] p-4 rounded-2xl border text-center transition flex flex-col items-center justify-between gap-2 ${
                idx === 0 ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="text-xs font-bold text-gray-500 uppercase">{day.dayName}</div>
              <div className="text-xs text-gray-400 font-medium">{day.date.split('-').slice(1).join('/')}</div>
              <div className="my-1">
                {day.rainProbPct > 50 ? (
                  <CloudRain className="w-7 h-7 text-blue-500 mx-auto" />
                ) : (
                  <Sun className="w-7 h-7 text-yellow-500 mx-auto" />
                )}
              </div>
              <div className="text-sm font-black text-gray-900">
                {day.tempMax}° / <span className="text-gray-500 font-normal text-xs">{day.tempMin}°</span>
              </div>
              <div className="text-[11px] text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded-full">
                💧 {day.rainProbPct}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Weather & Rainfall Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 text-lg mb-2">Historical Seasonal Rainfall & Temp Trends</h3>
        <p className="text-xs text-gray-500 mb-4">Monthly historical averages for agricultural planning</p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weather.historicalTrends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" textAnchor="end" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
              <YAxis yAxisId="right" orientation="right" stroke="#dc2626" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="rainfallMm" fill="#3b82f6" name="Rainfall (mm)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgTemp" stroke="#ef4444" strokeWidth={3} name="Avg Temp (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
