import { SCHEMES_DATABASE, Scheme } from '../data/mockData.js';

export interface FarmerProfile {
  name?: string;
  state: string;
  district: string;
  landAcres: number;
  category: 'Small' | 'Marginal' | 'Large' | 'Tenant';
  cropsGrown: string[];
  annualIncome: number;
}

export function recommendSchemes(profile: FarmerProfile): {
  recommendedSchemes: Scheme[];
  matchScoreMap: Record<string, number>;
} {
  const matchScoreMap: Record<string, number> = {};

  const recommendedSchemes = SCHEMES_DATABASE.filter(scheme => {
    let score = 50; // base match score

    // State filter
    if (scheme.category === 'state' && scheme.state) {
      if (scheme.state.toLowerCase() !== profile.state.toLowerCase()) {
        return false;
      }
      score += 25;
    } else {
      score += 15;
    }

    // Land filter
    if (scheme.eligibility.maxLandAcres && profile.landAcres > scheme.eligibility.maxLandAcres) {
      return false;
    }
    if (scheme.eligibility.minLandAcres && profile.landAcres < scheme.eligibility.minLandAcres) {
      return false;
    }

    // Income filter
    if (scheme.eligibility.maxIncome && profile.annualIncome > scheme.eligibility.maxIncome) {
      return false;
    }

    // Category filter
    if (scheme.eligibility.farmerCategory && scheme.eligibility.farmerCategory.length > 0) {
      if (!scheme.eligibility.farmerCategory.includes(profile.category)) {
        return false;
      }
      score += 20;
    }

    // Crop match boost
    if (scheme.eligibility.cropsAllowed && scheme.eligibility.cropsAllowed.length > 0) {
      const hasCropMatch = profile.cropsGrown.some(crop =>
        scheme.eligibility.cropsAllowed?.some(allowed => allowed.toLowerCase().includes(crop.toLowerCase()))
      );
      if (hasCropMatch) {
        score += 20;
      }
    }

    matchScoreMap[scheme.id] = Math.min(99, score);
    return true;
  });

  return {
    recommendedSchemes,
    matchScoreMap
  };
}

export function calculateSubsidy(type: 'drip' | 'solar_pump' | 'tractor' | 'seed', unitCost: number, farmerCategory: string, landAcres: number) {
  let subsidyPct = 50;
  let maxSubsidy = 100000;
  let schemeName = 'PMKSY Micro Irrigation';

  if (type === 'drip') {
    subsidyPct = farmerCategory === 'Small' || farmerCategory === 'Marginal' ? 55 : 45;
    maxSubsidy = 75000 * Math.min(5, Math.max(1, landAcres));
    schemeName = 'Per Drop More Crop (Micro Irrigation Scheme)';
  } else if (type === 'solar_pump') {
    subsidyPct = 60; // 30% Central + 30% State
    maxSubsidy = 180000;
    schemeName = 'PM-KUSUM Component B (Solar Water Pump)';
  } else if (type === 'tractor') {
    subsidyPct = farmerCategory === 'Small' ? 50 : 40;
    maxSubsidy = 125000;
    schemeName = 'Sub-Mission on Agricultural Mechanization (SMAM)';
  } else if (type === 'seed') {
    subsidyPct = 50;
    maxSubsidy = 25000;
    schemeName = 'Rashtriya Krishi Vikas Yojana (RKVY Seed Subsidy)';
  }

  const calculatedSubsidy = Math.min((unitCost * subsidyPct) / 100, maxSubsidy);
  const netFarmerShare = Math.max(0, unitCost - calculatedSubsidy);

  return {
    type,
    schemeName,
    unitCost,
    subsidyPercentage: subsidyPct,
    estimatedSubsidyAmount: Math.round(calculatedSubsidy),
    netFarmerShare: Math.round(netFarmerShare),
    eligibleBankLoan: Math.round(netFarmerShare * 0.8)
  };
}

export function submitInsuranceClaim(claimData: {
  policyNumber: string;
  cropName: string;
  damageReason: 'Heavy Rain / Flood' | 'Drought' | 'Pest Attack' | 'Hailstorm' | 'Unseasonal Frost';
  affectedAreaAcres: number;
  incidentDate: string;
}) {
  const claimId = `PMFBY-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedPayoutPerAcre = claimData.damageReason === 'Heavy Rain / Flood' || claimData.damageReason === 'Drought'
    ? 18000
    : 12000;

  const totalEstimatedPayout = estimatedPayoutPerAcre * claimData.affectedAreaAcres;

  return {
    claimId,
    status: 'Claim Submitted & Inspection Scheduled',
    verificationSteps: [
      { step: 1, title: 'Notice Intimation Registered', done: true, date: new Date().toISOString().split('T')[0] },
      { step: 2, title: 'Loss Inspection by Krishi Officer & Insurance Representative', done: false, expectedDate: 'Within 72 Hours' },
      { step: 3, title: 'Satellite Loss Assessment Verification', done: false, expectedDate: 'Within 7 Days' },
      { step: 4, title: 'Direct Benefit Transfer Payout to Bank Account', done: false, expectedDate: 'Within 15 Days' }
    ],
    estimatedPayoutINR: totalEstimatedPayout,
    helplineNumber: '1800-180-1551 (PMFBY Toll Free Helpline)'
  };
}
