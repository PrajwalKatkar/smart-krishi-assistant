import { MANDI_DATABASE, MandiRecord } from '../data/mockData.js';

export function getMandiPrices(state?: string, commodity?: string): MandiRecord[] {
  let records = MANDI_DATABASE;

  if (state && state !== 'All') {
    records = records.filter(r => r.state.toLowerCase() === state.toLowerCase());
  }

  if (commodity && commodity !== 'All') {
    records = records.filter(r => r.commodity.toLowerCase().includes(commodity.toLowerCase()) || r.hindiName.includes(commodity));
  }

  return records;
}

export function getMandiPriceAlerts(): {
  commodity: string;
  hindiName: string;
  market: string;
  priceChangePct: number;
  direction: 'up' | 'down';
  alertMessage: string;
}[] {
  return [
    {
      commodity: 'Onion',
      hindiName: 'प्याज',
      market: 'Lasalgaon Mandi (Nashik)',
      priceChangePct: 12.5,
      direction: 'up',
      alertMessage: 'Price surged by ₹250/Quintal due to high out-of-state demand. Good time to sell stored onion crop.'
    },
    {
      commodity: 'Cotton',
      hindiName: 'कपास',
      market: 'Kalameshwar Mandi (Nagpur)',
      priceChangePct: 6.2,
      direction: 'up',
      alertMessage: 'Cotton prices holding strong at ₹7,150/Quintal (above MSP).'
    },
    {
      commodity: 'Tomato',
      hindiName: 'टमाटर',
      market: 'Kolar APMC (Karnataka)',
      priceChangePct: -8.4,
      direction: 'down',
      alertMessage: 'Arrival volume increased by 40%. Expect temporary price dip for next 4 days.'
    }
  ];
}
