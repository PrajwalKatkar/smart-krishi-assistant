import { MOCK_LOANS, P2PLoanRecord } from '../data/mockData.js';

export function getLoansForUser(userPhone: string): P2PLoanRecord[] {
  return MOCK_LOANS.filter(l => l.borrowerPhone === userPhone || l.lenderPhone === userPhone);
}

export function createP2PLoan(loanData: {
  lenderName: string;
  lenderPhone: string;
  borrowerName: string;
  borrowerPhone: string;
  principalAmount: number;
  interestRatePct: number;
  dueDate: string;
}): P2PLoanRecord {
  const newLoan: P2PLoanRecord = {
    id: `loan-${Math.floor(100 + Math.random() * 900)}`,
    lenderName: loanData.lenderName,
    lenderPhone: loanData.lenderPhone,
    borrowerName: loanData.borrowerName,
    borrowerPhone: loanData.borrowerPhone,
    principalAmount: loanData.principalAmount,
    interestRatePct: loanData.interestRatePct,
    startDate: new Date().toISOString().split('T')[0],
    dueDate: loanData.dueDate,
    repaymentType: 'Lump Sum',
    status: 'Active',
    payments: []
  };

  MOCK_LOANS.push(newLoan);
  return newLoan;
}

export function logLoanPayment(paymentData: {
  loanId: string;
  amount: number;
  loggedBy: 'lender' | 'borrower';
  paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  proofUrl?: string;
  notes: string;
}): { updatedLoan: P2PLoanRecord; verificationStatus: string } {
  const loan = MOCK_LOANS.find(l => l.id === paymentData.loanId);
  if (!loan) throw new Error('Loan record not found');

  const newPayment = {
    id: `pay-${Date.now()}`,
    amount: paymentData.amount,
    date: new Date().toISOString().split('T')[0],
    loggedBy: paymentData.loggedBy,
    confirmed: true, // Auto 2-step verification in mock
    paymentMode: paymentData.paymentMode,
    proofUrl: paymentData.proofUrl || 'https://images.unsplash.com/photo-1556742049-0a6796574c71?w=400',
    notes: paymentData.notes
  };

  loan.payments.push(newPayment);

  const totalPaid = loan.payments.reduce((acc, p) => acc + p.amount, 0);
  if (totalPaid >= loan.principalAmount) {
    loan.status = 'Fully Repaid';
  }

  return {
    updatedLoan: loan,
    verificationStatus: totalPaid >= loan.principalAmount ? 'Loan Fully Closed & Verified Receipt Generated' : 'Payment Verified & Synced in Shared Ledger'
  };
}
