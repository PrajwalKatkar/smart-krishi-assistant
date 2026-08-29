import { SCHEMES_DATABASE, CROPS_DATABASE, MANDI_DATABASE, DISEASES_DATABASE } from '../data/mockData.js';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  language?: string;
  imageUrl?: string;
  timestamp: string;
  quickReplies?: string[];
}

const FAQ_KNOWLEDGE_BASE: Record<string, string> = {
  'pm-kisan': 'PM-KISAN provides ₹6,000 yearly in 3 installments of ₹2,000 directly to farmer bank accounts. Mandatory documents: Aadhaar, 7/12 land extract, active bank account.',
  'pmfby': 'PMFBY crop insurance covers crop failure from flood, drought, or pests. Premium is 1.5% for Rabi and 2% for Kharif crops. Deadline for upcoming season is Sept 30, 2026.',
  'wheat-fertilizer': 'Recommended Wheat fertilizer per acre: 50 kg Urea (Basal), 40 kg DAP at sowing, and 25 kg MOP at crown root initiation stage (21 days post sowing).',
  'yellow-leaves': 'Yellow leaves can indicate Nitrogen deficiency or Yellow Stripe Rust fungal disease. If yellow dust rubs off on fingers, spray Propiconazole 25 EC @ 1 ml/liter.',
  'drip-subsidy': 'Government offers 55% subsidy for small/marginal farmers and 45% for general farmers under "Per Drop More Crop" scheme for drip irrigation installation.',
  'mandi-price': 'Today\'s Mandi Rates (Avg Modal): Wheat ₹2,380/q, Cotton ₹7,150/q, Soybean ₹4,500/q, Onion ₹2,350/q, Tomato ₹1,850/q.'
};

export function processChatQuery(userQuery: string, language: string = 'en', imageAttached: boolean = false): ChatMessage {
  const queryLower = userQuery.toLowerCase();
  let responseText = '';
  let quickReplies = ['PM-KISAN Status', 'Wheat Fertilizer Dose', 'Mandi Rates Today', 'Pest Control Help'];

  if (imageAttached) {
    responseText = 'I have visually analyzed the uploaded leaf photo. The crop exhibits symptoms consistent with Cercospora Leaf Spot (pustules with yellow halo). Recommended organic remedy: Spray Neem Oil @ 5ml/L water. Chemical remedy: Spray Copper Oxychloride @ 2.5 g/L.';
    quickReplies = ['How to prepare Neem Oil spray?', 'Calculate pesticide dose for 2 acres', 'Book Expert Video Call'];
  } else if (queryLower.includes('pm kisan') || queryLower.includes('kisan status') || queryLower.includes('installment')) {
    responseText = FAQ_KNOWLEDGE_BASE['pm-kisan'];
    quickReplies = ['Required documents for PM-KISAN', 'Check eligibility', 'Kisan Credit Card info'];
  } else if (queryLower.includes('insurance') || queryLower.includes('pmfby') || queryLower.includes('crop damage')) {
    responseText = FAQ_KNOWLEDGE_BASE['pmfby'];
    quickReplies = ['Submit Crop Insurance Claim', 'PMFBY Toll Free Helpline', 'Required Documents'];
  } else if (queryLower.includes('fertilizer') || queryLower.includes('npk') || queryLower.includes('urea') || queryLower.includes('dap')) {
    responseText = FAQ_KNOWLEDGE_BASE['wheat-fertilizer'];
    quickReplies = ['Calculate NPK for my land', 'Organic bio-fertilizer tips', 'Soil Health Card test'];
  } else if (queryLower.includes('yellow') || queryLower.includes('disease') || queryLower.includes('pest') || queryLower.includes('leaves')) {
    responseText = FAQ_KNOWLEDGE_BASE['yellow-leaves'];
    quickReplies = ['Upload Crop Photo for diagnosis', 'Organic Pest Remedies', 'Spraying weather forecast'];
  } else if (queryLower.includes('mandi') || queryLower.includes('price') || queryLower.includes('rate') || queryLower.includes('bhav')) {
    responseText = FAQ_KNOWLEDGE_BASE['mandi-price'];
    quickReplies = ['Cotton mandi rate in Nagpur', 'Onion rate in Lasalgaon', 'Best day to sell crops'];
  } else if (queryLower.includes('drip') || queryLower.includes('water') || queryLower.includes('subsidy') || queryLower.includes('solar')) {
    responseText = FAQ_KNOWLEDGE_BASE['drip-subsidy'];
    quickReplies = ['Subsidy Calculator', 'PM-KUSUM Solar Pump', 'Apply for Drip Irrigation'];
  } else {
    responseText = `Namaste! As your Smart Krishi AI Advisor, I can help you with weather advisories, crop disease diagnosis, government subsidies, and market prices. How can I assist your farm today?`;
  }

  // Handle multi-language translations prompt simulation
  if (language === 'hi') {
    if (responseText.includes('PM-KISAN provides')) {
      responseText = 'पीएम-किसान योजना के तहत किसानों को हर साल ₹6,000 3 किस्तों में सीधे बैंक खाते में दिए जाते हैं। आवश्यक दस्तावेज: आधार कार्ड, 7/12 खतौनी और बैंक खाता।';
    } else if (responseText.includes('Today\'s Mandi Rates')) {
      responseText = 'आज के मंडी भाव (औसत): गेहूं ₹2,380/क्विंटल, कपास ₹7,150/क्विंटल, सोयाबीन ₹4,500/क्विंटल, प्याज ₹2,350/क्विंटल।';
    } else if (responseText.includes('Namaste')) {
      responseText = 'नमस्ते! स्मार्ट कृषि सहायक के रूप में, मैं मौसम की जानकारी, फसल रोग निदान, सरकारी सब्सिडी और मंडी भाव में आपकी सहायता कर सकता हूँ।';
    }
  } else if (language === 'mr') {
    if (responseText.includes('PM-KISAN')) {
      responseText = 'पीएम-किसान योजनेअंतर्गत शेतकऱ्यांना दरवर्षी ₹६,००० ३ हप्त्यांमध्ये बँक खात्यात मिळतात. कागदपत्रे: आधार कार्ड, ७/१२ उतारा आणि बँक खाते.';
    } else if (responseText.includes('Namaste')) {
      responseText = 'नमस्कार! स्मार्ट कृषी सहाय्यक म्हणून, मी हवामान अंदाज, पीक रोग निदान, सरकारी सबसिडी आणि बाजारभावात मदत करू शकतो.';
    }
  }

  return {
    sender: 'bot',
    text: responseText,
    language,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quickReplies
  };
}
