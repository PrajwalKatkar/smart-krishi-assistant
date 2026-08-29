export type LanguageCode = 'en' | 'hi' | 'mr' | 'te' | 'ta' | 'pa' | 'gu' | 'bn';
export type UserRole = 'Farmer' | 'Buyer' | 'Labourer' | 'Truck Owner';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  aadhaarVerified: boolean;
  state: string;
  district: string;
  village: string;
  landAcres: number;
  category: 'Small' | 'Marginal' | 'Large' | 'Tenant';
  soilType: string;
  cropsGrown: string[];
  annualIncome: number;
  badges: string[];
  ecoPoints: number;
}

export interface FarmPin {
  id: string;
  ownerName: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  landAcres: number;
  crops: string[];
  lat: number;
  lng: number;
  privacy: 'exact' | 'village_only';
  trustBadge: boolean;
}

export interface TruckVehicle {
  id: string;
  ownerName: string;
  ownerPhone: string;
  vehicleType: 'Mini Truck' | 'Pickup Loader' | 'Heavy Duty Truck' | 'Tractor Trolley' | 'Electric Truck (EV)';
  capacityQuintals: number;
  baseFareINR: number;
  ratePerKmINR: number;
  location: string;
  available: boolean;
  rating: number;
}

export interface Labourer {
  id: string;
  name: string;
  phone: string;
  skills: string[];
  dailyWageINR: number;
  location: string;
  available: boolean;
  rating: number;
  experienceYears: number;
}

export interface LoanPayment {
  id: string;
  amount: number;
  date: string;
  loggedBy: 'lender' | 'borrower';
  confirmed: boolean;
  paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  proofUrl?: string;
  notes: string;
}

export interface P2PLoan {
  id: string;
  lenderName: string;
  lenderPhone: string;
  borrowerName: string;
  borrowerPhone: string;
  principalAmount: number;
  interestRatePct: number;
  startDate: string;
  dueDate: string;
  repaymentType: 'Lump Sum' | 'Monthly Installments';
  status: 'Active' | 'Overdue' | 'Fully Repaid';
  payments: LoanPayment[];
}

export interface CropYieldLog {
  id: string;
  cropName: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  quantityQuintals: number;
  areaHarvestedAcres: number;
  harvestDate: string;
  notes: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainfallMm: number;
  windSpeedKmh: number;
  windDirection: string;
  uvIndex: number;
  condition: string;
  soilMoisturePct: number;
  cropRiskIndex: {
    droughtRisk: number;
    floodRisk: number;
    heatwaveRisk: number;
    frostRisk: number;
    overallStatus: 'Safe' | 'Moderate Risk' | 'High Warning';
  };
  bestSprayingDay: {
    recommended: boolean;
    reason: string;
    bestTimeWindow: string;
  };
  bestIrrigationDay: {
    recommended: boolean;
    reason: string;
    waterVolumePct: number;
  };
  forecast15Days: {
    date: string;
    dayName: string;
    tempMax: number;
    tempMin: number;
    humidity: number;
    rainProbPct: number;
    rainfallMm: number;
    condition: string;
  }[];
  historicalTrends: {
    month: string;
    avgTemp: number;
    rainfallMm: number;
  }[];
}

export interface Scheme {
  id: string;
  name: string;
  hindiName: string;
  category: 'central' | 'state';
  state?: string;
  description: string;
  benefits: string;
  eligibility: {
    maxLandAcres?: number;
    minLandAcres?: number;
    cropsAllowed?: string[];
    farmerCategory?: string[];
    maxIncome?: number;
  };
  requiredDocuments: string[];
  subsidyPercentage?: number;
  maxSubsidyAmount?: number;
  portalUrl: string;
  deadline?: string;
}

export interface MandiRecord {
  id: string;
  commodity: string;
  hindiName: string;
  state: string;
  district: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'up' | 'down' | 'stable';
  date: string;
  historical: { date: string; price: number }[];
}

export interface DiseaseInfo {
  id: string;
  cropName: string;
  diseaseName: string;
  hindiName: string;
  confidenceScore: number;
  symptoms: string[];
  cause: string;
  organicRemedy: string;
  chemicalRemedy: string;
  preventiveMeasures: string[];
}
