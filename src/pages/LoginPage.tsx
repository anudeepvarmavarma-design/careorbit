import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { signIn } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('rahul.varma@example.com');
  const [password, setPassword] = useState('demo12345');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your registered email address and password.');
      return;
    }
    signIn(email, 'Rahul Varma');
    navigate('/dashboard');
  };

  const handleInstantDemoLogin = () => {
    signIn('rahul.varma@example.com', 'Rahul Varma');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-soft-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block mb-1">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-950">Sign In to CareOrbit</h1>
          <p className="text-xs text-slate-500">
            Access your medical bookings, prescriptions, and family health continuum.
          </p>
        </div>

        {/* Instant Demo Shortcut */}
        <div className="p-3.5 bg-mint-50/70 border border-teal-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold text-teal-950">Quick Demonstration Access</p>
            <p className="text-[11px] text-teal-700">Explore with pre-populated patient data</p>
          </div>
          <button
            type="button"
            onClick={handleInstantDemoLogin}
            className="px-3 py-1.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-xs shrink-0"
          >
            Instant Demo Sign In
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-teal-700 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-teal-700 text-white font-bold text-xs sm:text-sm hover:bg-teal-800 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-teal-700 font-bold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
