import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import { useVerifyOtpMutation } from '../service/api';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Get email from navigation state

  const [otp, setOtp] = useState(['', '', '', '',]);
  const inputRefs = useRef([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  // Redirect if no email, otherwise focus first input on mount
  useEffect(() => {
    if (!email) {
      navigate('/register', { replace: true });
    } else if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [email, navigate]);

  if (!email) return null; // Avoid rendering the component if redirecting

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only numbers
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 4) return toast.error("Please enter full OTP");

    try {
      await verifyOtp({ email, otp: otpString }).unwrap();
      toast.success("Email verified! Welcome to DevBlog.");
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
          <p className="text-gray-500 mt-2">We've sent a 4-digit code to <br /> <span className="text-gray-900 font-medium">{email}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              />
            ))}
          </div>

          <button
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Verify Account"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button className="text-sm font-bold text-indigo-600 flex items-center justify-center gap-2 mx-auto hover:underline">
            <RefreshCw size={16} /> Resend Code
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm font-medium text-gray-400 flex items-center justify-center gap-2 mx-auto hover:text-gray-600"
          >
            <ArrowLeft size={16} /> Back to Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;