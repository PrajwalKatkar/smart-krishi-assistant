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

export interface CropInfo {
  id: string;
  name: string;
  hindiName: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  soilTypes: string[];
  optimalTemp: { min: number; max: number };
  rainfallRequiredMm: number;
  npkRequirement: { n: number; p: number; k: number };
  waterRequirementLiterPerAcre: number;
  durationDays: number;
  expectedYieldQuintalPerAcre: number;
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

export interface UserProfileData {
  id: string;
  name: string;
  phone: string;
  role: 'Farmer' | 'Buyer' | 'Labourer' | 'Truck Owner';
  aadhaarVerified: boolean;
  state: string;
  district: string;
  village: string;
  landAcres?: number;
  cropsGrown?: string[];
  vehicleType?: string;
  dailyRateINR?: number;
}

export interface FarmPinData {
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

export interface ProduceListingData {
  id: string;
  farmerName: string;
  farmerPhone: string;
  crop: string;
  quantityQuintals: number;
  pricePerQuintal: number;
  harvestDate: string;
  location: string;
  grade: 'A Super' | 'B Standard' | 'Organic';
  status: 'Available' | 'Negotiation' | 'Sold';
}

export interface TruckVehicleData {
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

export interface LabourerData {
  id: string;
  name: string;
  phone: string;
  skills: ('Harvesting' | 'Pesticide Spraying' | 'Tractor Tilling' | 'Weeding' | 'Pruning')[];
  dailyWageINR: number;
  location: string;
  available: boolean;
  rating: number;
  experienceYears: number;
}

export interface LoanPaymentRecord {
  id: string;
  amount: number;
  date: string;
  loggedBy: 'lender' | 'borrower';
  confirmed: boolean;
  paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  proofUrl?: string;
  notes: string;
}

export interface P2PLoanRecord {
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
  payments: LoanPaymentRecord[];
}

export interface CropYieldLogRecord {
  id: string;
  cropName: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  quantityQuintals: number;
  areaHarvestedAcres: number;
  harvestDate: string;
  notes: string;
}

// ---------------- DATABASES ----------------

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    hindiName: 'पीएम-किसान सम्मान निधि',
    category: 'central',
    description: 'Income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
    benefits: '₹6,000 direct bank transfer per year (3 installments of ₹2,000)',
    eligibility: { farmerCategory: ['Small', 'Marginal', 'Large'] },
    requiredDocuments: ['Aadhaar Card', 'Land Ownership Records (7/12 or Khatauni)', 'Active Bank Account linked with Aadhaar'],
    portalUrl: 'https://pmkisan.gov.in',
    deadline: 'Ongoing'
  },
  {
    id: 'pmfby',
    name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    hindiName: 'प्रधानमंत्री फसल बीमा योजना',
    category: 'central',
    description: 'Comprehensive crop insurance against natural risks, pests, and diseases from pre-sowing to post-harvest.',
    benefits: 'Low premium (1.5% Rabi, 2% Kharif, 5% Commercial crops). Up to 100% loss compensation.',
    eligibility: {
      cropsAllowed: ['Wheat', 'Rice', 'Soybean', 'Cotton', 'Sugarcane', 'Groundnut', 'Maize', 'Tomato', 'Onion', 'Potato'],
      farmerCategory: ['Small', 'Marginal', 'Large']
    },
    requiredDocuments: ['Land Possession Certificate', 'Sowing Certificate / Declaration', 'Aadhaar Card', 'Bank Passbook'],
    portalUrl: 'https://pmfby.gov.in',
    deadline: '2026-09-30'
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evamb Utthaan Mahabhiyan)',
    hindiName: 'पीएम कुसुम योजना (सोलर पंप सब्सिडी)',
    category: 'central',
    description: 'Subsidy up to 60% for installing stand-alone off-grid solar agriculture pumps.',
    benefits: '60% total subsidy (30% Central + 30% State) + 30% bank loan option. 90% reduced irrigation cost.',
    eligibility: { minLandAcres: 0.5, farmerCategory: ['Small', 'Marginal', 'Large'] },
    requiredDocuments: ['Aadhaar', 'Land Registry', 'Bank Passbook', 'Electricity Connection Status'],
    subsidyPercentage: 60,
    maxSubsidyAmount: 180000,
    portalUrl: 'https://pmkusum.mnre.gov.in',
    deadline: '2026-10-15'
  },
  {
    id: 'drip-irrigation',
    name: 'Per Drop More Crop (Micro Irrigation Scheme)',
    hindiName: 'प्रति बूंद अधिक फसल (ड्रिप/स्प्रिंकलर सिंचाई)',
    category: 'central',
    description: 'Financial assistance for installing drip and sprinkler irrigation systems for water conservation.',
    benefits: '55% subsidy for Small/Marginal farmers, 45% for Other farmers.',
    eligibility: { farmerCategory: ['Small', 'Marginal', 'Large'] },
    requiredDocuments: ['Water Source Proof', 'Soil & Water Test Report', 'Land Record (7/12)', 'Aadhaar'],
    subsidyPercentage: 55,
    maxSubsidyAmount: 75000,
    portalUrl: 'https://pmksy.gov.in',
    deadline: '2026-11-30'
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC) & Interest Subvention',
    hindiName: 'किसान क्रेडिट कार्ड (केसीसी)',
    category: 'central',
    description: 'Provides timely credit to farmers for crop cultivation, post-harvest expenses, and farm maintenance at low interest rates.',
    benefits: 'Credit limit up to ₹3 Lakhs at 4% effective interest rate (with 3% prompt repayment incentive).',
    eligibility: { farmerCategory: ['Small', 'Marginal', 'Large', 'Tenant Farmers'] },
    requiredDocuments: ['Application Form', 'ID & Address Proof', 'Land Ownership/Tenant Proof', 'No Dues Certificate'],
    portalUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    deadline: 'Ongoing'
  }
];

export const CROPS_DATABASE: CropInfo[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    hindiName: 'गेहूं',
    season: 'Rabi',
    soilTypes: ['Loam', 'Clay Loam', 'Alluvial'],
    optimalTemp: { min: 12, max: 25 },
    rainfallRequiredMm: 450,
    npkRequirement: { n: 120, p: 60, k: 40 },
    waterRequirementLiterPerAcre: 1600000,
    durationDays: 135,
    expectedYieldQuintalPerAcre: 22
  },
  {
    id: 'rice',
    name: 'Paddy Rice',
    hindiName: 'धान (चावल)',
    season: 'Kharif',
    soilTypes: ['Clay', 'Clay Loam', 'Alluvial'],
    optimalTemp: { min: 20, max: 35 },
    rainfallRequiredMm: 1200,
    npkRequirement: { n: 100, p: 50, k: 50 },
    waterRequirementLiterPerAcre: 4000000,
    durationDays: 140,
    expectedYieldQuintalPerAcre: 25
  },
  {
    id: 'cotton',
    name: 'Cotton',
    hindiName: 'कपास',
    season: 'Kharif',
    soilTypes: ['Black Cotton Soil', 'Deep Clay', 'Loam'],
    optimalTemp: { min: 21, max: 35 },
    rainfallRequiredMm: 700,
    npkRequirement: { n: 90, p: 45, k: 45 },
    waterRequirementLiterPerAcre: 2500000,
    durationDays: 160,
    expectedYieldQuintalPerAcre: 12
  },
  {
    id: 'soybean',
    name: 'Soybean',
    hindiName: 'सोयाबीन',
    season: 'Kharif',
    soilTypes: ['Black Soil', 'Loam', 'Silt Loam'],
    optimalTemp: { min: 18, max: 32 },
    rainfallRequiredMm: 600,
    npkRequirement: { n: 30, p: 60, k: 40 },
    waterRequirementLiterPerAcre: 1800000,
    durationDays: 100,
    expectedYieldQuintalPerAcre: 10
  },
  {
    id: 'tomato',
    name: 'Tomato',
    hindiName: 'टमाटर',
    season: 'Zaid',
    soilTypes: ['Sandy Loam', 'Clay Loam', 'Red Soil'],
    optimalTemp: { min: 18, max: 28 },
    rainfallRequiredMm: 400,
    npkRequirement: { n: 100, p: 80, k: 80 },
    waterRequirementLiterPerAcre: 1200000,
    durationDays: 90,
    expectedYieldQuintalPerAcre: 180
  },
  {
    id: 'onion',
    name: 'Onion',
    hindiName: 'प्याज',
    season: 'Rabi',
    soilTypes: ['Friable Sandy Loam', 'Alluvial'],
    optimalTemp: { min: 13, max: 24 },
    rainfallRequiredMm: 500,
    npkRequirement: { n: 100, p: 50, k: 50 },
    waterRequirementLiterPerAcre: 1400000,
    durationDays: 120,
    expectedYieldQuintalPerAcre: 130
  }
];

export const MANDI_DATABASE: MandiRecord[] = [
  {
    id: 'mandi-1',
    commodity: 'Wheat',
    hindiName: 'गेहूं',
    state: 'Punjab',
    district: 'Ludhiana',
    market: 'Ludhiana Mandi',
    minPrice: 2280,
    maxPrice: 2450,
    modalPrice: 2380,
    trend: 'up',
    date: '2026-08-29',
    historical: [
      { date: 'Aug 01', price: 2250 },
      { date: 'Aug 07', price: 2280 },
      { date: 'Aug 14', price: 2310 },
      { date: 'Aug 21', price: 2350 },
      { date: 'Aug 28', price: 2380 }
    ]
  },
  {
    id: 'mandi-2',
    commodity: 'Cotton',
    hindiName: 'कपास',
    state: 'Maharashtra',
    district: 'Nagpur',
    market: 'Kalameshwar Mandi',
    minPrice: 6800,
    maxPrice: 7400,
    modalPrice: 7150,
    trend: 'up',
    date: '2026-08-29',
    historical: [
      { date: 'Aug 01', price: 6900 },
      { date: 'Aug 07', price: 6980 },
      { date: 'Aug 14', price: 7020 },
      { date: 'Aug 21', price: 7100 },
      { date: 'Aug 28', price: 7150 }
    ]
  },
  {
    id: 'mandi-3',
    commodity: 'Soybean',
    hindiName: 'सोयाबीन',
    state: 'Madhya Pradesh',
    district: 'Indore',
    market: 'Indore APMC',
    minPrice: 4200,
    maxPrice: 4650,
    modalPrice: 4500,
    trend: 'stable',
    date: '2026-08-29',
    historical: [
      { date: 'Aug 01', price: 4450 },
      { date: 'Aug 07', price: 4480 },
      { date: 'Aug 14', price: 4500 },
      { date: 'Aug 21', price: 4490 },
      { date: 'Aug 28', price: 4500 }
    ]
  },
  {
    id: 'mandi-4',
    commodity: 'Onion',
    hindiName: 'प्याज',
    state: 'Maharashtra',
    district: 'Nashik',
    market: 'Lasalgaon Mandi',
    minPrice: 1800,
    maxPrice: 2600,
    modalPrice: 2350,
    trend: 'up',
    date: '2026-08-29',
    historical: [
      { date: 'Aug 01', price: 1900 },
      { date: 'Aug 07', price: 2050 },
      { date: 'Aug 14', price: 2180 },
      { date: 'Aug 21', price: 2280 },
      { date: 'Aug 28', price: 2350 }
    ]
  },
  {
    id: 'mandi-5',
    commodity: 'Tomato',
    hindiName: 'टमाटर',
    state: 'Karnataka',
    district: 'Kolar',
    market: 'Kolar APMC',
    minPrice: 1400,
    maxPrice: 2100,
    modalPrice: 1850,
    trend: 'down',
    date: '2026-08-29',
    historical: [
      { date: 'Aug 01', price: 2400 },
      { date: 'Aug 07', price: 2200 },
      { date: 'Aug 14', price: 2050 },
      { date: 'Aug 21', price: 1920 },
      { date: 'Aug 28', price: 1850 }
    ]
  }
];

export const DISEASES_DATABASE: DiseaseInfo[] = [
  {
    id: 'leaf-spot',
    cropName: 'Cotton / Tomato',
    diseaseName: 'Cercospora Leaf Spot',
    hindiName: 'पत्ती धब्बा रोग',
    confidenceScore: 0.94,
    symptoms: ['Small dark brown spots on lower leaves', 'Yellow halo surrounding brown spots', 'Premature leaf fall'],
    cause: 'Fungal infection (Cercospora species) due to high humidity and warm temperatures.',
    organicRemedy: 'Spray Neem oil solution (5ml per liter of water) or Trichoderma viride bio-fungicide every 7 days.',
    chemicalRemedy: 'Spray Copper Oxychloride 50 WP @ 2.5 g/L or Mancozeb 75 WP @ 2 g/L of water.',
    preventiveMeasures: ['Maintain proper plant spacing for aeration', 'Avoid overhead irrigation in evening', 'Crop rotation with non-host crops']
  },
  {
    id: 'yellow-rust',
    cropName: 'Wheat',
    diseaseName: 'Yellow Stripe Rust',
    hindiName: 'पीला रतुआ (पीला रोग)',
    confidenceScore: 0.91,
    symptoms: ['Yellow linear stripes of pustules on leaves', 'Powdery yellow dust sticking to hands when touching leaves'],
    cause: 'Puccinia striiformis fungus thriving in cool (10-15°C) and moist weather.',
    organicRemedy: 'Dusting with fine sulfur powder or spraying fermented buttermilk solution (1L in 10L water).',
    chemicalRemedy: 'Spray Propiconazole 25% EC @ 1 ml/L or Tebuconazole @ 1 ml/L of water at first symptom onset.',
    preventiveMeasures: ['Sow resistant wheat varieties like HD-2967 or PBW-550', 'Destroy weed hosts along field borders']
  },
  {
    id: 'bacterial-blight',
    cropName: 'Rice',
    diseaseName: 'Bacterial Leaf Blight (BLB)',
    hindiName: 'धान का जीवाणु झुलसा रोग',
    confidenceScore: 0.89,
    symptoms: ['Water-soaked lesions turning yellow to white along leaf margins', 'Leaf tip drying and scorching appearance'],
    cause: 'Xanthomonas oryzae bacteria spread through irrigation water and wind rain.',
    organicRemedy: 'Spray Fresh Cow Dung Slurry extract (20 kg cow dung + 5 kg neem leaves in 200L water).',
    chemicalRemedy: 'Spray Streptocycline @ 6g + Copper Oxychloride @ 500g in 200 Liters of water per acre.',
    preventiveMeasures: ['Avoid excess Nitrogen application', 'Maintain field drainage during heavy rainfall']
  }
];

export const MOCK_USERS: UserProfileData[] = [
  {
    id: 'usr-1',
    name: 'Ramesh Patil',
    phone: '+91 98230 45678',
    role: 'Farmer',
    aadhaarVerified: true,
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'Pimplegaon Baswant',
    landAcres: 2.5,
    cropsGrown: ['Wheat', 'Onion', 'Tomato']
  },
  {
    id: 'usr-2',
    name: 'Anil Agrotech Buyers',
    phone: '+91 98900 11223',
    role: 'Buyer',
    aadhaarVerified: true,
    state: 'Maharashtra',
    district: 'Mumbai',
    village: 'APMC Vashi'
  },
  {
    id: 'usr-3',
    name: 'Suresh Kumar',
    phone: '+91 97110 33445',
    role: 'Labourer',
    aadhaarVerified: true,
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'Pimplegaon',
    dailyRateINR: 450
  },
  {
    id: 'usr-4',
    name: 'Ganesh Logistics',
    phone: '+91 98220 55667',
    role: 'Truck Owner',
    aadhaarVerified: true,
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'Pimplegaon',
    vehicleType: 'Pickup Loader'
  }
];

export const MOCK_FARMS: FarmPinData[] = [
  {
    id: 'farm-1',
    ownerName: 'Ramesh Patil',
    phone: '+91 98230 45678',
    village: 'Pimplegaon Baswant',
    district: 'Nashik',
    state: 'Maharashtra',
    landAcres: 2.5,
    crops: ['Wheat', 'Onion', 'Tomato'],
    lat: 20.173,
    lng: 73.987,
    privacy: 'exact',
    trustBadge: true
  },
  {
    id: 'farm-2',
    ownerName: 'Santosh Jadhav',
    phone: '+91 98231 11223',
    village: 'Ozar',
    district: 'Nashik',
    state: 'Maharashtra',
    landAcres: 5.0,
    crops: ['Grapes', 'Pomegranate', 'Sugarcane'],
    lat: 20.095,
    lng: 73.931,
    privacy: 'exact',
    trustBadge: true
  },
  {
    id: 'farm-3',
    ownerName: 'Eknath Shinde',
    phone: '+91 98232 44556',
    village: 'Niphad',
    district: 'Nashik',
    state: 'Maharashtra',
    landAcres: 8.5,
    crops: ['Wheat', 'Soybean', 'Onion'],
    lat: 20.078,
    lng: 74.108,
    privacy: 'village_only',
    trustBadge: true
  },
  {
    id: 'farm-4',
    ownerName: 'Vijay Deshmukh',
    phone: '+91 98233 77889',
    village: 'Sinnar',
    district: 'Nashik',
    state: 'Maharashtra',
    landAcres: 3.0,
    crops: ['Maize', 'Cotton', 'Bajra'],
    lat: 19.845,
    lng: 73.992,
    privacy: 'exact',
    trustBadge: false
  }
];

export const MOCK_PRODUCE_LISTINGS: ProduceListingData[] = [
  {
    id: 'prod-1',
    farmerName: 'Ramesh Patil',
    farmerPhone: '+91 98230 45678',
    crop: 'Nashik Red Onion',
    quantityQuintals: 45,
    pricePerQuintal: 2400,
    harvestDate: '2026-08-25',
    location: 'Pimplegaon, Nashik',
    grade: 'A Super',
    status: 'Available'
  },
  {
    id: 'prod-2',
    farmerName: 'Santosh Jadhav',
    farmerPhone: '+91 98231 11223',
    crop: 'Thompson Seedless Grapes',
    quantityQuintals: 80,
    pricePerQuintal: 6500,
    harvestDate: '2026-08-20',
    location: 'Ozar, Nashik',
    grade: 'A Super',
    status: 'Available'
  },
  {
    id: 'prod-3',
    farmerName: 'Vijay Deshmukh',
    farmerPhone: '+91 98233 77889',
    crop: 'Hybrid Cotton (BT-2)',
    quantityQuintals: 30,
    pricePerQuintal: 7200,
    harvestDate: '2026-08-28',
    location: 'Sinnar, Nashik',
    grade: 'B Standard',
    status: 'Negotiation'
  }
];

export const MOCK_TRUCKS: TruckVehicleData[] = [
  {
    id: 'trk-1',
    ownerName: 'Ganesh Transport Services',
    ownerPhone: '+91 98220 55667',
    vehicleType: 'Pickup Loader',
    capacityQuintals: 25,
    baseFareINR: 600,
    ratePerKmINR: 18,
    location: 'Pimplegaon, Nashik',
    available: true,
    rating: 4.8
  },
  {
    id: 'trk-2',
    ownerName: 'Kisan Eco EV Logistics',
    ownerPhone: '+91 98221 88990',
    vehicleType: 'Electric Truck (EV)',
    capacityQuintals: 35,
    baseFareINR: 500,
    ratePerKmINR: 12,
    location: 'Ozar, Nashik',
    available: true,
    rating: 4.9
  },
  {
    id: 'trk-3',
    ownerName: 'Maratha Heavy Express',
    ownerPhone: '+91 98222 11447',
    vehicleType: 'Heavy Duty Truck',
    capacityQuintals: 120,
    baseFareINR: 1500,
    ratePerKmINR: 32,
    location: 'Nashik APMC',
    available: true,
    rating: 4.6
  },
  {
    id: 'trk-4',
    ownerName: 'Patil Tractor Rentals',
    ownerPhone: '+91 98223 33669',
    vehicleType: 'Tractor Trolley',
    capacityQuintals: 50,
    baseFareINR: 800,
    ratePerKmINR: 20,
    location: 'Sinnar, Nashik',
    available: true,
    rating: 4.7
  }
];

export const MOCK_LABOURERS: LabourerData[] = [
  {
    id: 'lab-1',
    name: 'Suresh Kumar',
    phone: '+91 97110 33445',
    skills: ['Harvesting', 'Pesticide Spraying', 'Weeding'],
    dailyWageINR: 450,
    location: 'Pimplegaon, Nashik',
    available: true,
    rating: 4.9,
    experienceYears: 6
  },
  {
    id: 'lab-2',
    name: 'Babu Lal & Team (4 Workers)',
    phone: '+91 97111 66778',
    skills: ['Harvesting', 'Tractor Tilling', 'Pruning'],
    dailyWageINR: 1800,
    location: 'Ozar, Nashik',
    available: true,
    rating: 4.8,
    experienceYears: 10
  },
  {
    id: 'lab-3',
    name: 'Ramu Rao',
    phone: '+91 97112 88990',
    skills: ['Pesticide Spraying', 'Weeding'],
    dailyWageINR: 400,
    location: 'Niphad, Nashik',
    available: true,
    rating: 4.5,
    experienceYears: 4
  }
];

export const MOCK_LOANS: P2PLoanRecord[] = [
  {
    id: 'loan-101',
    lenderName: 'Dattatray Shinde (Local Agronomist)',
    lenderPhone: '+91 98901 22334',
    borrowerName: 'Ramesh Patil',
    borrowerPhone: '+91 98230 45678',
    principalAmount: 25000,
    interestRatePct: 2.0,
    startDate: '2026-06-01',
    dueDate: '2026-09-15',
    repaymentType: 'Lump Sum',
    status: 'Active',
    payments: [
      {
        id: 'pay-1',
        amount: 10000,
        date: '2026-07-15',
        loggedBy: 'borrower',
        confirmed: true,
        paymentMode: 'UPI',
        proofUrl: 'https://images.unsplash.com/photo-1556742049-0a6796574c71?w=400',
        notes: 'Part repayment after selling early tomato harvest.'
      }
    ]
  },
  {
    id: 'loan-102',
    lenderName: 'Ramesh Patil',
    lenderPhone: '+91 98230 45678',
    borrowerName: 'Babu Lal (Labour Supervisor)',
    borrowerPhone: '+91 97111 66778',
    principalAmount: 5000,
    interestRatePct: 0.0,
    startDate: '2026-08-01',
    dueDate: '2026-08-30',
    repaymentType: 'Lump Sum',
    status: 'Active',
    payments: []
  }
];

export const MOCK_YIELD_LOGS: CropYieldLogRecord[] = [
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
