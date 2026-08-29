import { CROPS_DATABASE, DISEASES_DATABASE, CropInfo, DiseaseInfo } from '../data/mockData.js';

export interface SoilTestInput {
  nitrogen: number; // N in kg/ha (typical 100-300)
  phosphorus: number; // P in kg/ha (typical 10-60)
  potassium: number; // K in kg/ha (typical 100-400)
  ph: number; // pH 4.5 - 9.5
  soilType: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  landAcres: number;
}

export function recommendCrops(soilData: SoilTestInput): {
  recommendedCrops: { crop: CropInfo; suitabilityScore: number; reason: string }[];
  soilHealthReport: {
    nStatus: 'Deficient' | 'Optimal' | 'Excess';
    pStatus: 'Deficient' | 'Optimal' | 'Excess';
    kStatus: 'Deficient' | 'Optimal' | 'Excess';
    phCategory: 'Acidic' | 'Neutral' | 'Alkaline';
    fertilizerRecommendation: { name: string; dosePerAcreKg: number; timing: string }[];
  };
} {
  // Score crops
  const recommendations = CROPS_DATABASE.map(crop => {
    let score = 70;
    const reasons: string[] = [];

    // Season match
    if (crop.season === soilData.season) {
      score += 15;
      reasons.push(`Perfect fit for ${soilData.season} season`);
    }

    // Soil type match
    if (crop.soilTypes.some(s => s.toLowerCase().includes(soilData.soilType.toLowerCase()))) {
      score += 15;
      reasons.push(`Thrives in ${soilData.soilType} soil`);
    }

    // NPK match check
    const nRatio = soilData.nitrogen / crop.npkRequirement.n;
    if (nRatio >= 0.7 && nRatio <= 1.4) {
      score += 10;
    }

    return {
      crop,
      suitabilityScore: Math.min(98, score),
      reason: reasons.join('. ') || 'Suitable for current soil conditions.'
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // Generate Soil Health Report
  const nStatus = soilData.nitrogen < 140 ? 'Deficient' : soilData.nitrogen > 280 ? 'Excess' : 'Optimal';
  const pStatus = soilData.phosphorus < 20 ? 'Deficient' : soilData.phosphorus > 50 ? 'Excess' : 'Optimal';
  const kStatus = soilData.potassium < 140 ? 'Deficient' : soilData.potassium > 300 ? 'Excess' : 'Optimal';

  const phCategory = soilData.ph < 6.2 ? 'Acidic' : soilData.ph > 7.8 ? 'Alkaline' : 'Neutral';

  const fertilizers = [];
  if (nStatus === 'Deficient') {
    fertilizers.push({ name: 'Urea (46% N)', dosePerAcreKg: 50 * soilData.landAcres, timing: 'Basal dose + 30 days after sowing' });
    fertilizers.push({ name: 'Neem-coated Bio-Azotobacter', dosePerAcreKg: 2 * soilData.landAcres, timing: 'Seed treatment before sowing' });
  }
  if (pStatus === 'Deficient') {
    fertilizers.push({ name: 'DAP (18-46-0) or Single Super Phosphate (SSP)', dosePerAcreKg: 40 * soilData.landAcres, timing: 'At sowing time' });
  }
  if (kStatus === 'Deficient') {
    fertilizers.push({ name: 'Muriate of Potash (MOP 60% K)', dosePerAcreKg: 25 * soilData.landAcres, timing: 'During flowering/pod formation' });
  }

  if (fertilizers.length === 0) {
    fertilizers.push({ name: 'Organic Vermicompost / Farmyard Manure', dosePerAcreKg: 200 * soilData.landAcres, timing: 'Soil preparation' });
  }

  return {
    recommendedCrops: recommendations,
    soilHealthReport: {
      nStatus,
      pStatus,
      kStatus,
      phCategory,
      fertilizerRecommendation: fertilizers
    }
  };
}

export function classifyCropDisease(imageFilenameOrMock?: string, cropSelected?: string): DiseaseInfo {
  // If specific crop or image trigger is present, select appropriate diagnosis
  if (cropSelected?.toLowerCase().includes('wheat')) {
    return DISEASES_DATABASE[1]; // Yellow rust
  } else if (cropSelected?.toLowerCase().includes('rice')) {
    return DISEASES_DATABASE[2]; // Bacterial blight
  }
  return DISEASES_DATABASE[0]; // Leaf spot default
}

export function calculateWaterSchedule(cropId: string, landAcres: number, growthStage: 'sowing' | 'vegetative' | 'flowering' | 'harvest') {
  const crop = CROPS_DATABASE.find(c => c.id === cropId) || CROPS_DATABASE[0];
  
  let multiplier = 1.0;
  if (growthStage === 'flowering') multiplier = 1.4;
  else if (growthStage === 'vegetative') multiplier = 1.2;
  else if (growthStage === 'harvest') multiplier = 0.4;

  const totalWaterLiters = Math.round((crop.waterRequirementLiterPerAcre / crop.durationDays) * landAcres * multiplier);
  const dripHoursPerDay = parseFloat((totalWaterLiters / (landAcres * 2400)).toFixed(1)); // assuming 2400L/hr drip system per acre

  return {
    cropName: crop.name,
    growthStage,
    dailyWaterRequiredLiters: totalWaterLiters,
    dripIrrigationHours: Math.max(0.5, Math.min(6, dripHoursPerDay)),
    irrigationIntervalDays: growthStage === 'flowering' ? 3 : 5,
    tips: [
      'Irrigate during early morning (6:00 AM - 8:30 AM) to minimize evaporation losses.',
      'Check soil moisture at 15cm depth using finger test before running pumps.',
      'Use mulching around crop roots to conserve 30% soil moisture.'
    ]
  };
}

export function getCropRotationPlan(currentCrop: string): {
  nextCrop: string;
  reason: string;
  soilBenefit: string;
}[] {
  if (currentCrop.toLowerCase().includes('wheat') || currentCrop.toLowerCase().includes('rice')) {
    return [
      { nextCrop: 'Chickpea / Moong Dal (Legume)', reason: 'Fixes atmospheric nitrogen in root nodules', soilBenefit: '+40 kg/ha natural Nitrogen added to soil' },
      { nextCrop: 'Mustard / Sunflower', reason: 'Deep taproot system breaks soil compaction', soilBenefit: 'Improves soil aeration and suppresses weeds' },
      { nextCrop: 'Sesbania (Green Manure)', reason: 'Ploughed into soil before Kharif season', soilBenefit: 'Increases organic carbon content by 0.5%' }
    ];
  }
  return [
    { nextCrop: 'Wheat (Rabi)', reason: 'High market demand following leguminous crops', soilBenefit: 'Utilizes leftover nitrogen efficiently' },
    { nextCrop: 'Groundnut / Soybean', reason: 'Maintains organic biomass and soil structure', soilBenefit: 'Prevents soil erosion during monsoon' }
  ];
}
