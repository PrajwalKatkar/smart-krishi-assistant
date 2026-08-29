import { MOCK_FARMS, FarmPinData } from '../data/mockData.js';

export function getNearbyFarms(cropFilter?: string, maxDistanceKm: number = 25): FarmPinData[] {
  let result = MOCK_FARMS;

  if (cropFilter && cropFilter !== 'All') {
    result = result.filter(f => f.crops.some(c => c.toLowerCase().includes(cropFilter.toLowerCase())));
  }

  // Mask exact GPS coordinates if privacy setting is 'village_only'
  return result.map(f => {
    if (f.privacy === 'village_only') {
      return {
        ...f,
        lat: parseFloat((f.lat + 0.01).toFixed(3)), // offset pin to village center
        lng: parseFloat((f.lng + 0.01).toFixed(3))
      };
    }
    return f;
  });
}
