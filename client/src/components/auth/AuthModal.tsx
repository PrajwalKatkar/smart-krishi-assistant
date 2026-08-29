import React, { useState, useEffect } from 'react';
import { useFarmer } from '../../context/FarmerContext';
import { sendOtpApi, verifyOtpApi, signUpUserApi } from '../../services/api';
import { UserRole } from '../../types';
import { ShieldCheck, Phone, KeyRound, CheckCircle2, UserCheck, RefreshCw, AlertCircle, MessageSquare, Key } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { profile, activeRole, setActiveRole, loginWithPhoneOtp, verifyAadhaar } = useFarmer();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [phone, setPhone] = useState(profile.phone);
  const [smsApiKey, setSmsApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');
  const [smsBannerInfo, setSmsBannerInfo] = useState('');

  // Signup fields
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Farmer');
  const [village, setVillage] = useState('Pimplegaon Baswant');
  const [district, setDistrict] = useState('Nashik');
  const [state, setState] = useState('Maharashtra');
  const [landAcres, setLandAcres] = useState(2.5);
  const [aadhaarNumber, setAadhaarNumber] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const res = await sendOtpApi(phone, smsApiKey);
    setLoading(false);
    setOtpSent(true);
    setTimer(60);
    setSmsBannerInfo(res.message);
  };

  const handleVerifyAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput || otpInput.trim().length < 6) {
      setErrorMsg('Please enter the 6-digit OTP code received on your phone SMS.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    const res = await verifyOtpApi(phone, otpInput.trim());
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    if (mode === 'signup') {
      await signUpUserApi({
        name: name || 'Ramesh Patil',
        phone,
        role: selectedRole,
        state,
        district,
        village,
        landAcres,
        aadhaarNumber
      });

      loginWithPhoneOtp(phone, otpInput, selectedRole);
      setSuccessToast(`Account Created & Logged In as ${selectedRole}!`);
    } else {
      loginWithPhoneOtp(phone, otpInput, res.user?.role || selectedRole);
      setSuccessToast('✓ OTP Verified! Logged In Successfully.');
    }

    setTimeout(() => {
      setSuccessToast('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Success Toast */}
        {successToast && (
          <div className="bg-emerald-600 text-white text-xs font-extrabold p-3 text-center rounded-2xl animate-bounce shadow-lg">
            {successToast}
          </div>
        )}

        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-extrabold text-lg text-gray-900">Real-Time Phone SMS Authentication</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="flex bg-gray-100 p-1 rounded-2xl text-xs font-extrabold">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition ${mode === 'signin' ? 'bg-emerald-700 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Sign In with Phone SMS
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition ${mode === 'signup' ? 'bg-emerald-700 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            New Farmer Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-xl flex items-center gap-2 font-bold animate-pulse">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleVerifyAndSubmit} className="space-y-4 text-xs">
          {/* Phone Input Step */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Mobile Phone Number (+91)</label>
            <div className="flex gap-2">
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-xl px-3 text-gray-700 font-bold text-sm">
                +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98230 45678"
                className="flex-1 border border-gray-300 rounded-xl p-2.5 bg-gray-50 font-bold focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs transition shadow"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : 'Send SMS OTP'}
              </button>
            </div>
          </div>

          {/* Optional Real SMS Gateway API Key Config Toggle */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowApiKeyInput(prev => !prev)}
              className="text-[11px] text-emerald-800 font-semibold underline hover:text-emerald-950 flex items-center gap-1 ml-auto"
            >
              <Key className="w-3 h-3" /> Config Real SMS Gateway API Key (Twilio / Fast2SMS)
            </button>

            {showApiKeyInput && (
              <div className="mt-2 bg-gray-50 p-2.5 border rounded-xl text-left space-y-1">
                <span className="text-[10px] text-gray-600 font-bold">Fast2SMS / Twilio API Key (Optional for real phone SMS):</span>
                <input
                  type="password"
                  value={smsApiKey}
                  onChange={(e) => setSmsApiKey(e.target.value)}
                  placeholder="Paste Fast2SMS or Twilio API key..."
                  className="w-full text-xs p-1.5 border rounded-lg bg-white"
                />
              </div>
            )}
          </div>

          {/* Real-time SMS Instruction Banner (No code shown on screen) */}
          {otpSent && (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{smsBannerInfo || `OTP SMS sent to ${phone}. Check your phone SMS inbox.`}</span>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-gray-800 text-xs block">Paste Real 6-Digit OTP Code Here:</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Paste 6-digit OTP code"
                  className="w-full text-center tracking-widest text-lg font-black border border-emerald-400 rounded-xl p-2.5 bg-white focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold px-1">
                <span>Didn't receive SMS code on your phone?</span>
                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={handleSendOtp}
                  className={`font-bold ${timer > 0 ? 'text-gray-400' : 'text-emerald-700 underline cursor-pointer'}`}
                >
                  {timer > 0 ? `Resend SMS in ${timer}s` : 'Resend SMS OTP'}
                </button>
              </div>
            </div>
          )}

          {/* Signup Profile Fields */}
          {mode === 'signup' && (
            <div className="space-y-3 pt-2 border-t">
              <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">Farmer Profile Details</h4>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full border border-gray-300 rounded-xl p-2.5 bg-gray-50 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Select Role</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Farmer', 'Buyer', 'Labourer', 'Truck Owner'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRole(r)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                        selectedRole === r ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Village</label>
                  <input type="text" value={village} onChange={(e) => setVillage(e.target.value)} className="w-full border rounded-xl p-2 bg-gray-50" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">District</label>
                  <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full border rounded-xl p-2 bg-gray-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Land Size (Acres)</label>
                  <input type="number" value={landAcres} onChange={(e) => setLandAcres(Number(e.target.value))} className="w-full border rounded-xl p-2 bg-gray-50 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Aadhaar No. (Optional)</label>
                  <input type="text" maxLength={12} value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} placeholder="12-digit Aadhaar" className="w-full border rounded-xl p-2 bg-gray-50" />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition text-sm shadow-md mt-2"
          >
            {mode === 'signup' ? 'Verify SMS OTP & Complete Sign Up ➔' : 'Verify SMS OTP & Sign In ➔'}
          </button>
        </form>
      </div>
    </div>
  );
};
