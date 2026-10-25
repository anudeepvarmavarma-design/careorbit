import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Compass, Home, Calendar, ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-soft-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-700 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-navy-950">404</span>
          <h1 className="text-xl font-bold text-navy-950">Page Out of Orbit</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page you requested could not be found or has been relocated within the CareOrbit network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold pt-2">
          <Link
            to="/"
            className="p-3 rounded-xl bg-teal-700 text-white hover:bg-teal-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/doctors"
            className="p-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Find Doctors</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-center gap-4 text-xs font-medium text-teal-700">
          <Link to="/medicines" className="hover:underline">Medicine Store</Link>
          <span>•</span>
          <Link to="/care-journey" className="hover:underline">Care Journey</Link>
          <span>•</span>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </div>
    </div>
  );
};
