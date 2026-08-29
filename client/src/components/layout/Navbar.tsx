import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarmer } from '../../context/FarmerContext';
import { LanguageCode } from '../../types';
import { AuthModal } from '../auth/AuthModal';
import {
  Home,
  CloudSun,
  Landmark,
  Sprout,
  Bot,
  ShoppingBag,
  Users,
  User,
  Mic,
  MicOff,
  Eye,
  Award,
  MapPin,
  Truck,
  CreditCard,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t, listenSpeech, isListening, lowLiteracyMode, toggleLowLiteracyMode, speakText } = useLanguage();
  const { profile, activeRole } = useFarmer();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleVoiceCommand = () => {
    speakText(t('speakNow'));
    listenSpeech((spokenText) => {
      const query = spokenText.toLowerCase();
      if (query.includes('home') || query.includes('मुख्य') || query.includes('होम')) {
        setActiveTab('home');
        speakText('Opening Home Dashboard');
      } else if (query.includes('weather') || query.includes('मौसम') || query.includes('हवामान')) {
        setActiveTab('weather');
        speakText('Opening Weather Module');
      } else if (query.includes('scheme') || query.includes('योजना')) {
        setActiveTab('schemes');
        speakText('Opening Government Schemes');
      } else if (query.includes('map') || query.includes('नक्शा') || query.includes('नकाशा')) {
        setActiveTab('map');
        speakText('Opening Community Farm Map');
      } else if (query.includes('truck') || query.includes('भाडे') || query.includes('ट्रक')) {
        setActiveTab('logistics');
        speakText('Opening Truck Rental Marketplace');
      } else if (query.includes('labour') || query.includes('मजदूर') || query.includes('मजूर')) {
        setActiveTab('labour');
        speakText('Opening Labour Marketplace');
      } else if (query.includes('loan') || query.includes('कर्ज') || query.includes('बहीखाता')) {
        setActiveTab('loans');
        speakText('Opening P2P Synced Loan Ledger');
      } else {
        setActiveTab('home');
      }
    });
  };

  const navItems = [
    { id: 'home', label: t('home'), icon: Home, color: 'bg-emerald-600' },
    { id: 'weather', label: t('weather'), icon: CloudSun, color: 'bg-blue-500' },
    { id: 'schemes', label: t('schemes'), icon: Landmark, color: 'bg-amber-600' },
    { id: 'crop', label: t('cropMgmt'), icon: Sprout, color: 'bg-emerald-600' },
    { id: 'map', label: t('communityMap'), icon: MapPin, color: 'bg-teal-600' },
    { id: 'mandi', label: t('mandiConnect'), icon: TrendingUp, color: 'bg-emerald-700' },
    { id: 'logistics', label: t('logistics'), icon: Truck, color: 'bg-teal-700' },
    { id: 'labour', label: t('labour'), icon: Users, color: 'bg-orange-600' },
    { id: 'loans', label: t('loans'), icon: CreditCard, color: 'bg-amber-700' },
    { id: 'chat', label: t('aiAssistant'), icon: Bot, color: 'bg-purple-600' },
    { id: 'marketplace', label: t('marketplace'), icon: ShoppingBag, color: 'bg-teal-600' },
    { id: 'profile', label: t('profile'), icon: User, color: 'bg-slate-700' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md">
        {/* Top Accessibility & Identity Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between border-b border-emerald-800/80 text-xs gap-2">
          <div className="flex items-center gap-3">
            <span className="font-extrabold flex items-center gap-1 text-sm">
              <span className="text-xl">🌾</span> Smart Krishi Assistant
            </span>

            {/* Active Role Badge & Phone Auth Trigger */}
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-emerald-950 hover:bg-emerald-800 text-yellow-300 border border-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{profile.phone} ({activeRole})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Eco Points */}
            <div className="flex items-center gap-1 bg-emerald-950 text-yellow-300 px-2.5 py-1 rounded-full font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>{profile.ecoPoints} Pts</span>
            </div>

            {/* Icon Mode Toggle */}
            <button
              onClick={toggleLowLiteracyMode}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition ${
                lowLiteracyMode ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-emerald-800 hover:bg-emerald-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{lowLiteracyMode ? 'Text On' : t('lowLiteracyMode')}</span>
            </button>

            {/* Voice Command Button */}
            <button
              onClick={handleVoiceCommand}
              className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold shadow transition ${
                isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-emerald-700 hover:bg-emerald-600'
              }`}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isListening ? t('speechActive') : t('voiceCommand')}</span>
            </button>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-emerald-950 text-white text-xs rounded-md px-2 py-1 border border-emerald-700 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            >
              <option value="en">English 🇬🇧</option>
              <option value="hi">हिंदी (Hindi) 🇮🇳</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>
        </div>

        {/* Main Super-App Module Navigation */}
        <nav className="max-w-7xl mx-auto px-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start md:justify-center gap-1.5 py-2 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-emerald-900 shadow-md scale-105 font-bold ring-2 ring-yellow-400'
                      : 'text-emerald-100 hover:bg-emerald-800/80 hover:text-white'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950/80'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {!lowLiteracyMode && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};
