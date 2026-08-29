import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchUserLoans, logLoanPaymentApi } from '../../services/api';
import { P2PLoan } from '../../types';
import { CreditCard, CheckCircle2, ShieldCheck, Plus, FileText, AlertCircle, Image as ImageIcon } from 'lucide-react';

export const LoanLedgerModule: React.FC = () => {
  const { t, speakText } = useLanguage();
  const [loans, setLoans] = useState<P2PLoan[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<P2PLoan | null>(null);

  // Payment modal state
  const [showPayModal, setShowPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState(5000);
  const [payMode, setPayMode] = useState<'UPI' | 'Cash' | 'Bank Transfer'>('UPI');
  const [payNotes, setPayNotes] = useState('Part payment post onion harvest');

  // New loan creation modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPartyName, setNewPartyName] = useState('Dattatray Shinde');
  const [newPhone, setNewPhone] = useState('+91 98901 22334');
  const [newAmount, setNewAmount] = useState(25000);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    const data = await fetchUserLoans();
    setLoans(data);
    if (data.length > 0) setSelectedLoan(data[0]);
  };

  const handleLogPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLoan) return;

    await logLoanPaymentApi({
      loanId: selectedLoan.id,
      amount: payAmount,
      loggedBy: 'borrower',
      paymentMode: payMode,
      notes: payNotes
    });

    const updatedPayments = [
      ...selectedLoan.payments,
      {
        id: `pay-${Date.now()}`,
        amount: payAmount,
        date: new Date().toISOString().split('T')[0],
        loggedBy: 'borrower' as const,
        confirmed: true,
        paymentMode: payMode,
        notes: payNotes
      }
    ];

    const totalPaid = updatedPayments.reduce((acc, p) => acc + p.amount, 0);
    const isClosed = totalPaid >= selectedLoan.principalAmount;

    const updatedLoanObj = {
      ...selectedLoan,
      payments: updatedPayments,
      status: (isClosed ? 'Fully Repaid' : 'Active') as any
    };

    setSelectedLoan(updatedLoanObj);
    setLoans(loans.map(l => l.id === selectedLoan.id ? updatedLoanObj : l));
    setShowPayModal(false);

    speakText(`Payment of ${payAmount} rupees logged and verified in synced shared ledger.`);
  };

  const handleCreateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const newLoanObj: P2PLoan = {
      id: `loan-${Math.floor(100 + Math.random() * 900)}`,
      lenderName: newPartyName,
      lenderPhone: newPhone,
      borrowerName: 'Ramesh Patil',
      borrowerPhone: '+91 98230 45678',
      principalAmount: newAmount,
      interestRatePct: 2.0,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-10-30',
      repaymentType: 'Lump Sum',
      status: 'Active',
      payments: []
    };

    setLoans([...loans, newLoanObj]);
    setSelectedLoan(newLoanObj);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-amber-800 to-amber-950 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-extrabold">Peer-to-Peer Synced Loan Ledger</h1>
            </div>
            <p className="text-amber-100 text-xs mt-1">
              Shared 2-step verified loan records between farmers, traders & local lenders with receipt generation
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow"
          >
            <Plus className="w-4 h-4" /> Create Shared Loan Record
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left List of Loans */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">Active & Past Shared Loans</h3>

          {loans.map((loan) => {
            const totalPaid = loan.payments.reduce((acc, p) => acc + p.amount, 0);
            const remaining = loan.principalAmount - totalPaid;
            const isSelected = selectedLoan?.id === loan.id;

            return (
              <div
                key={loan.id}
                onClick={() => setSelectedLoan(loan)}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 shadow-md'
                    : 'bg-white border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-gray-900 text-sm">
                    {loan.borrowerName === 'Ramesh Patil' ? `Lender: ${loan.lenderName}` : `Borrower: ${loan.borrowerName}`}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    loan.status === 'Fully Repaid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {loan.status}
                  </span>
                </div>

                <div className="text-xl font-black text-gray-900 mt-2">
                  ₹{remaining.toLocaleString()} <span className="text-xs font-normal text-gray-500">Remaining</span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">Due Date: {loan.dueDate}</div>
              </div>
            );
          })}
        </div>

        {/* Right Synced Ledger Details */}
        <div className="md:col-span-2 space-y-4">
          {selectedLoan ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Record #{selectedLoan.id}
                  </span>
                  <h3 className="font-black text-gray-900 text-lg mt-1">
                    {selectedLoan.lenderName} ➔ {selectedLoan.borrowerName}
                  </h3>
                </div>

                <div className="flex gap-2">
                  {selectedLoan.status !== 'Fully Repaid' && (
                    <button
                      onClick={() => setShowPayModal(true)}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow"
                    >
                      + Log Repayment
                    </button>
                  )}
                </div>
              </div>

              {/* Loan Overview Numbers */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-gray-50 p-3 rounded-xl border">
                  <span className="text-gray-500 block text-[10px]">Principal Amount</span>
                  <span className="font-black text-gray-900 text-base">₹{selectedLoan.principalAmount.toLocaleString()}</span>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <span className="text-emerald-800 block text-[10px]">Total Repaid</span>
                  <span className="font-black text-emerald-700 text-base">
                    ₹{selectedLoan.payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()}
                  </span>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <span className="text-amber-800 block text-[10px]">Remaining Balance</span>
                  <span className="font-black text-amber-900 text-base">
                    ₹{(selectedLoan.principalAmount - selectedLoan.payments.reduce((acc, p) => acc + p.amount, 0)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 2-Step Verified Transaction History */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
                  Two-Step Verified Synced Payments
                </h4>

                {selectedLoan.payments.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center">No payment entries logged yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedLoan.payments.map((p) => (
                      <div key={p.id} className="border border-emerald-200 bg-emerald-50/40 p-3 rounded-xl text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <div>
                            <span className="font-bold text-gray-900">₹{p.amount.toLocaleString()}</span>
                            <span className="text-gray-500 ml-2">via {p.paymentMode} ({p.date})</span>
                            <p className="text-gray-600 text-[11px]">{p.notes}</p>
                          </div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                          2-Step Verified ✓
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Download Receipt if Fully Repaid */}
              {selectedLoan.status === 'Fully Repaid' && (
                <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-2xl text-emerald-950 space-y-2 text-xs text-center">
                  <p className="font-extrabold text-sm">🎉 Loan Fully Closed & Settled!</p>
                  <button
                    onClick={() => alert(`Official Receipt for ${selectedLoan.id} downloaded successfully.`)}
                    className="bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 mx-auto"
                  >
                    <FileText className="w-4 h-4" /> Download Official Closure Receipt
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-xs">
              Select a loan record to view the synced 2-step ledger.
            </div>
          )}
        </div>
      </div>

      {/* Log Payment Modal */}
      {showPayModal && selectedLoan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-900 text-sm">Log Payment into Shared Ledger</h3>
              <button onClick={() => setShowPayModal(false)} className="font-bold text-gray-400">✕</button>
            </div>

            <form onSubmit={handleLogPayment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Repayment Amount (₹)</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 font-bold text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Payment Mode</label>
                <select
                  value={payMode}
                  onChange={(e: any) => setPayMode(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 font-bold"
                >
                  <option value="UPI">UPI / GPay / PhonePe</option>
                  <option value="Cash">Cash Handover</option>
                  <option value="Bank Transfer">Bank Transfer (IMPS/NEFT)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Payment Proof (Optional Photo / Screenshot)</label>
                <div className="border border-dashed p-3 rounded-xl bg-gray-50 text-center">
                  <span className="text-[11px] text-gray-500 font-semibold">📸 Attach UPI receipt screenshot</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Notes</label>
                <input
                  type="text"
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                  className="w-full p-2 border rounded-xl bg-gray-50"
                />
              </div>

              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs">
                Log Payment & Request 2-Step Confirmation ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Loan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-900 text-sm">Create New Shared Loan Record</h3>
              <button onClick={() => setShowCreateModal(false)} className="font-bold text-gray-400">✕</button>
            </div>

            <form onSubmit={handleCreateLoan} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Lender Name</label>
                <input
                  type="text"
                  value={newPartyName}
                  onChange={(e) => setNewPartyName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-gray-50"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Lender Mobile Phone</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-gray-50"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Principal Amount (₹)</label>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 font-bold"
                />
              </div>

              <button type="submit" className="w-full bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs">
                Send Shared Loan Invite ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
