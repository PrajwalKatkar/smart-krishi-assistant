import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { FarmerProvider } from './context/FarmerContext';
import { Navbar } from './components/layout/Navbar';
import { UnifiedHome } from './components/platform/UnifiedHome';
import { WeatherModule } from './components/weather/WeatherModule';
import { SchemesModule } from './components/schemes/SchemesModule';
import { CropManagementModule } from './components/crop/CropManagementModule';
import { ProductionLog } from './components/crop/ProductionLog';
import { CommunityMap } from './components/map/CommunityMap';
import { MandiTransportCalc } from './components/mandi/MandiTransportCalc';
import { LogisticsModule } from './components/logistics/LogisticsModule';
import { LabourModule } from './components/labour/LabourModule';
import { LoanLedgerModule } from './components/loans/LoanLedgerModule';
import { ChatbotModule } from './components/chatbot/ChatbotModule';
import {
  ProfileDashboard,
  CommunityForum,
  ExpertConnect,
  MarketplaceModule,
  AnalyticsDashboard
} from './components/platform/PlatformModules';
import { PhoneCall } from 'lucide-react';

export const SmartKrishiApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6">
        {activeTab === 'home' && <UnifiedHome setActiveTab={setActiveTab} />}
        {activeTab === 'weather' && <WeatherModule />}
        {activeTab === 'schemes' && <SchemesModule />}
        {activeTab === 'crop' && (
          <div className="space-y-6">
            <CropManagementModule />
            <ProductionLog />
          </div>
        )}
        {activeTab === 'map' && <CommunityMap />}
        {activeTab === 'mandi' && <MandiTransportCalc />}
        {activeTab === 'logistics' && <LogisticsModule />}
        {activeTab === 'labour' && <LabourModule />}
        {activeTab === 'loans' && <LoanLedgerModule />}
        {activeTab === 'chat' && <ChatbotModule />}
        {activeTab === 'marketplace' && <MarketplaceModule />}
        {activeTab === 'community' && <CommunityForum />}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <ProfileDashboard />
            <AnalyticsDashboard />
          </div>
        )}
      </main>

      {/* Emergency Helpline Banner */}
      <div className="bg-emerald-950 text-white py-3 px-4 text-xs border-t border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>Kisan Call Centre Toll-Free Helpline: <strong>1800-180-1551</strong> (6:00 AM - 10:00 PM Daily)</span>
          </div>
          <div className="text-emerald-300 font-medium">
            Smart Krishi Super-App • Built for Indian Farmers 🌾
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <FarmerProvider>
        <SmartKrishiApp />
      </FarmerProvider>
    </LanguageProvider>
  );
}
