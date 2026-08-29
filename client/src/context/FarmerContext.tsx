import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FarmerProfile, UserRole } from '../types';

interface FarmerContextType {
  profile: FarmerProfile;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<FarmerProfile>) => void;
  awardBadge: (badgeName: string) => void;
  addEcoPoints: (points: number) => void;
  isLoggedIn: boolean;
  loginWithPhoneOtp: (phone: string, otp: string, role: UserRole) => void;
  verifyAadhaar: () => void;
  logout: () => void;
}

const defaultProfile: FarmerProfile = {
  id: 'usr-1',
  name: 'Ramesh Patil',
  phone: '+91 98230 45678',
  role: 'Farmer',
  aadhaarVerified: true,
  state: 'Maharashtra',
  district: 'Nashik',
  village: 'Pimplegaon Baswant',
  landAcres: 2.5,
  category: 'Small',
  soilType: 'Black Cotton Soil',
  cropsGrown: ['Wheat', 'Onion', 'Tomato'],
  annualIncome: 180000,
  badges: ['Organic Pioneer 🌿', 'Water Saver 💧', 'Verified Farmer ✅'],
  ecoPoints: 520
};

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export const FarmerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<FarmerProfile>(defaultProfile);
  const [activeRole, setActiveRole] = useState<UserRole>('Farmer');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const updateProfile = (updated: Partial<FarmerProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const loginWithPhoneOtp = (phone: string, otp: string, role: UserRole) => {
    setIsLoggedIn(true);
    setActiveRole(role);
    setProfile(prev => ({ ...prev, phone, role }));
  };

  const verifyAadhaar = () => {
    setProfile(prev => ({
      ...prev,
      aadhaarVerified: true,
      badges: prev.badges.includes('Verified Farmer Identity ✅') ? prev.badges : [...prev.badges, 'Verified Farmer Identity ✅']
    }));
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const awardBadge = (badgeName: string) => {
    if (!profile.badges.includes(badgeName)) {
      setProfile(prev => ({
        ...prev,
        badges: [...prev.badges, badgeName],
        ecoPoints: prev.ecoPoints + 50
      }));
    }
  };

  const addEcoPoints = (points: number) => {
    setProfile(prev => ({ ...prev, ecoPoints: prev.ecoPoints + points }));
  };

  return (
    <FarmerContext.Provider
      value={{
        profile,
        activeRole,
        setActiveRole,
        updateProfile,
        awardBadge,
        addEcoPoints,
        isLoggedIn,
        loginWithPhoneOtp,
        verifyAadhaar,
        logout
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
};

export const useFarmer = () => {
  const context = useContext(FarmerContext);
  if (!context) throw new Error('useFarmer must be used within FarmerProvider');
  return context;
};
