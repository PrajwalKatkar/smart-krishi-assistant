import { Router } from 'express';
import { getWeatherData } from '../services/weatherService.js';
import { recommendSchemes, calculateSubsidy, submitInsuranceClaim } from '../services/schemeService.js';
import { recommendCrops, classifyCropDisease, calculateWaterSchedule, getCropRotationPlan } from '../services/cropService.js';
import { getMandiPrices, getMandiPriceAlerts } from '../services/mandiService.js';
import { processChatQuery } from '../services/chatbotService.js';
import { getIotTelemetry } from '../services/iotService.js';
import { sendRealtimeOtp, verifyRealtimeOtp, registerNewUser, toggleAadhaarVerification } from '../services/authService.js';
import { getNearbyFarms } from '../services/mapService.js';
import { getAvailableTrucks, bookTruckTransport } from '../services/logisticsService.js';
import { getLabourers, createLabourHireRequest } from '../services/labourService.js';
import { getLoansForUser, createP2PLoan, logLoanPayment } from '../services/loanService.js';
import { SCHEMES_DATABASE, MOCK_PRODUCE_LISTINGS, MOCK_YIELD_LOGS } from '../data/mockData.js';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'Smart Krishi Assistant Server', timestamp: new Date().toISOString() });
});

// Authentication & Identity Endpoints
router.post('/auth/send-otp', async (req, res) => {
  const { phone, smsApiKey } = req.body;
  const result = await sendRealtimeOtp(phone || '+91 98230 45678', smsApiKey);
  res.json(result);
});

router.post('/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  const result = verifyRealtimeOtp(phone, otp);
  res.json(result);
});

router.post('/auth/signup', (req, res) => {
  const result = registerNewUser(req.body);
  res.json(result);
});

router.post('/auth/aadhaar-verify', (req, res) => {
  const { userId } = req.body;
  res.json(toggleAadhaarVerification(userId));
});

// Community Map
router.get('/map/farms', (req, res) => {
  const crop = req.query.crop as string;
  const radius = Number(req.query.radius || 25);
  res.json(getNearbyFarms(crop, radius));
});

// Mandi Connect & Transport Calculator
router.post('/mandi/calculate-transport', (req, res) => {
  const { distanceKm, vehicleType } = req.body;
  const dist = Number(distanceKm || 35);

  let mileageKmPerL = 10;
  let fuelType: 'Diesel' | 'Petrol' | 'Electric' = 'Diesel';
  let fuelPricePerUnit = 92;
  let evKwhPerKm = 0.8;

  if (vehicleType === 'Pickup Loader') { mileageKmPerL = 12; fuelType = 'Diesel'; }
  else if (vehicleType === 'Heavy Duty Truck') { mileageKmPerL = 6; fuelType = 'Diesel'; }
  else if (vehicleType === 'Tractor Trolley') { mileageKmPerL = 5; fuelType = 'Diesel'; }
  else if (vehicleType === 'Electric Truck (EV)') { fuelType = 'Electric'; fuelPricePerUnit = 9; }

  let estimatedCost = 0;
  let fuelRequiredUnits = 0;

  if (fuelType === 'Electric') {
    fuelRequiredUnits = parseFloat((dist * evKwhPerKm).toFixed(1));
    estimatedCost = Math.round(fuelRequiredUnits * fuelPricePerUnit);
  } else {
    fuelRequiredUnits = parseFloat((dist / mileageKmPerL).toFixed(1));
    estimatedCost = Math.round(fuelRequiredUnits * fuelPricePerUnit);
  }

  res.json({
    distanceKm: dist,
    vehicleType: vehicleType || 'Mini Truck',
    fuelType,
    fuelRequiredUnits,
    unitLabel: fuelType === 'Electric' ? 'kWh' : 'Liters',
    estimatedFuelCostINR: estimatedCost,
    tollEstimateINR: dist > 40 ? 120 : 0,
    totalTransportCostINR: estimatedCost + (dist > 40 ? 120 : 0)
  });
});

router.get('/mandi/produce-listings', (req, res) => {
  res.json(MOCK_PRODUCE_LISTINGS);
});

// Logistics & Truck Rental
router.get('/logistics/trucks', (req, res) => {
  const quantity = Number(req.query.quantity || 30);
  res.json(getAvailableTrucks(quantity));
});

router.post('/logistics/book', (req, res) => {
  res.json(bookTruckTransport(req.body));
});

// Labour Marketplace
router.get('/labour/list', (req, res) => {
  const skill = req.query.skill as string;
  res.json(getLabourers(skill));
});

router.post('/labour/hire', (req, res) => {
  res.json(createLabourHireRequest(req.body));
});

// Peer-to-Peer Loan Tracker & Shared Ledger
router.get('/loans/my-loans', (req, res) => {
  const phone = (req.query.phone as string) || '+91 98230 45678';
  res.json(getLoansForUser(phone));
});

router.post('/loans/create', (req, res) => {
  res.json(createP2PLoan(req.body));
});

router.post('/loans/log-payment', (req, res) => {
  res.json(logLoanPayment(req.body));
});

// Crop Yield Logs
router.get('/crop/yield-logs', (req, res) => {
  res.json(MOCK_YIELD_LOGS);
});

router.post('/crop/log-yield', (req, res) => {
  const newLog = {
    id: `ylog-${Date.now()}`,
    ...req.body,
    harvestDate: req.body.harvestDate || new Date().toISOString().split('T')[0]
  };
  MOCK_YIELD_LOGS.push(newLog);
  res.json({ success: true, log: newLog });
});

// Weather API
router.get('/weather', async (req, res) => {
  try {
    const location = (req.query.location as string) || 'Nashik';
    const data = await getWeatherData(location);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Scheme Discovery & Eligibility
router.get('/schemes/all', (req, res) => {
  res.json(SCHEMES_DATABASE);
});

router.post('/schemes/recommend', (req, res) => {
  res.json(recommendSchemes(req.body));
});

router.post('/schemes/subsidy', (req, res) => {
  const { type, unitCost, farmerCategory, landAcres } = req.body;
  res.json(calculateSubsidy(type, Number(unitCost), farmerCategory, Number(landAcres)));
});

router.post('/schemes/claim', (req, res) => {
  res.json(submitInsuranceClaim(req.body));
});

// Crop Management & ML Recommendation
router.post('/crop/recommend', (req, res) => {
  res.json(recommendCrops(req.body));
});

router.post('/crop/diagnose', (req, res) => {
  const { imageName, cropSelected } = req.body;
  res.json(classifyCropDisease(imageName, cropSelected));
});

router.post('/crop/water-schedule', (req, res) => {
  const { cropId, landAcres, growthStage } = req.body;
  res.json(calculateWaterSchedule(cropId, Number(landAcres), growthStage));
});

router.get('/crop/rotation', (req, res) => {
  const currentCrop = (req.query.crop as string) || 'Wheat';
  res.json({ currentCrop, rotationOptions: getCropRotationPlan(currentCrop) });
});

// Mandi Prices
router.get('/mandi/prices', (req, res) => {
  const state = req.query.state as string;
  const commodity = req.query.commodity as string;
  res.json(getMandiPrices(state, commodity));
});

router.get('/mandi/alerts', (req, res) => {
  res.json(getMandiPriceAlerts());
});

// AI Chatbot
router.post('/chat', (req, res) => {
  const { message, language, hasImage } = req.body;
  res.json(processChatQuery(message || '', language || 'en', Boolean(hasImage)));
});

// IoT Sensor Telemetry
router.get('/iot/telemetry', (req, res) => {
  res.json(getIotTelemetry());
});

export default router;
