export interface IotSensorData {
  nodeId: string;
  nodeName: string;
  lastUpdated: string;
  soilMoisturePct: number;
  soilTemperatureC: number;
  ambientTemperatureC: number;
  humidityPct: number;
  soilPh: number;
  batteryPct: number;
  status: 'Online' | 'Offline' | 'Alert';
  alerts: string[];
}

export function getIotTelemetry(): IotSensorData[] {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Generate realistic sensor data
  const soilMoisture = Math.round(32 + Math.random() * 6);
  const soilTemp = parseFloat((24 + Math.random() * 2).toFixed(1));
  const alerts: string[] = [];

  if (soilMoisture < 30) {
    alerts.push('Low Soil Moisture (<30%). Drip irrigation trigger recommended.');
  }

  return [
    {
      nodeId: 'NODE-SOUTH-FIELD-01',
      nodeName: 'Field Block A (Cotton & Wheat)',
      lastUpdated: now,
      soilMoisturePct: soilMoisture,
      soilTemperatureC: soilTemp,
      ambientTemperatureC: 29.4,
      humidityPct: 62,
      soilPh: 6.8,
      batteryPct: 88,
      status: alerts.length > 0 ? 'Alert' : 'Online',
      alerts
    },
    {
      nodeId: 'NODE-POLYHOUSE-02',
      nodeName: 'Polyhouse Block B (Tomato)',
      lastUpdated: now,
      soilMoisturePct: 54,
      soilTemperatureC: 22.1,
      ambientTemperatureC: 26.5,
      humidityPct: 78,
      soilPh: 6.5,
      batteryPct: 95,
      status: 'Online',
      alerts: []
    }
  ];
}
