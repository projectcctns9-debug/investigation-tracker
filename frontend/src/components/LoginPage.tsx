import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, Eye, EyeOff, AlertCircle, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('कृपया अपनी उपयोगकर्ता आईडी दर्ज करें।');
      return;
    }
    if (!password) {
      setErrorMessage('कृपया अपना पासवर्ड दर्ज करें।');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 font-sans text-slate-100">
      
      {/* Main Login Card */}
      <div className="max-w-md w-full my-auto">
        <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Header Banner - Clean & Direct */}
          <div className="bg-gradient-to-r from-police-navy-950 to-police-navy-900 p-6 text-white text-center border-b border-police-navy-800">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-police-gold-500/20 border border-police-gold-500/40 flex items-center justify-center text-police-gold-400 shadow-inner mb-2.5">
              <Shield className="w-7 h-7 fill-police-gold-400/20 text-police-gold-400" />
            </div>
            <h1 className="text-xl font-black text-white tracking-wide">
              छत्तीसगढ़ पुलिस
            </h1>
            <p className="text-sm font-bold text-police-gold-400 mt-0.5">
              NCLI Daily Monitoring
            </p>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-7 space-y-4">
            <div className="text-center">
              <h2 className="text-base font-black text-police-navy-950">
                लॉगिन
              </h2>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* User ID Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  यूजर आईडी
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="यूजर आईडी दर्ज करें"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-police-gold-500 focus:bg-white font-mono"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  पासवर्ड
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="पासवर्ड दर्ज करें"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-police-gold-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-police-navy-950 hover:bg-police-navy-900 text-police-gold-400 font-black py-2.5 px-4 rounded-xl text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>प्रत्यायन हो रहा है...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-police-gold-400" />
                    <span>लॉगिन करें</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
};
