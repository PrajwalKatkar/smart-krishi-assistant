import { MOCK_LABOURERS, LabourerData } from '../data/mockData.js';

export function getLabourers(skillFilter?: string): LabourerData[] {
  if (skillFilter && skillFilter !== 'All') {
    return MOCK_LABOURERS.filter(l => l.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase())));
  }
  return MOCK_LABOURERS;
}

export function createLabourHireRequest(request: {
  labourId: string;
  farmerName: string;
  taskType: string;
  durationDays: number;
  startDate: string;
  offeredDailyWageINR: number;
}) {
  const labour = MOCK_LABOURERS.find(l => l.id === request.labourId) || MOCK_LABOURERS[0];
  const totalContractINR = request.offeredDailyWageINR * request.durationDays;

  return {
    hireRequestId: `LAB-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    labourName: labour.name,
    phone: labour.phone,
    taskType: request.taskType,
    durationDays: request.durationDays,
    totalAgreedWageINR: totalContractINR,
    status: 'Hire Request Sent to Labourer',
    workLog: [
      { day: 1, status: 'Scheduled', hoursWorked: 8 }
    ]
  };
}
