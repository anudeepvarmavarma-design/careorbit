import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ToastContainer } from '../components/common/ToastContainer';
import { Bot, Calendar, ShoppingBag, Heart, User, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const { cartCount } = useApp();

  const isAssistantPage = location.pathname === '/assistant';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />

      {/* Floating Care Assistant Quick launcher (when not on assistant page) */}
      {!isAssistantPage && (
        <Link
          to="/assistant"
          className="fixed bottom-20 sm:bottom-6 right-5 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-teal-800 text-white shadow-xl shadow-teal-900/25 hover:bg-teal-900 hover:scale-105 transition-all duration-200 group border border-teal-600/30"
          aria-label="Open Care Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-emerald-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            Care Assistant
          </span>
        </Link>
      )}

      {/* Mobile Sticky Bottom Quick Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <Link
          to="/doctors"
          className={`flex flex-col items-center text-[10px] font-semibold ${
            location.pathname.startsWith('/doctors') ? 'text-teal-700' : 'text-slate-500'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Doctors</span>
        </Link>
        <Link
          to="/medicines"
          className={`flex flex-col items-center text-[10px] font-semibold relative ${
            location.pathname.startsWith('/medicines') ? 'text-teal-700' : 'text-slate-500'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>Store</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1 bg-emerald-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        <Link
          to="/care-journey"
          className={`flex flex-col items-center text-[10px] font-semibold ${
            location.pathname.startsWith('/care-journey') ? 'text-teal-700' : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Journey</span>
        </Link>
        <Link
          to="/health-records"
          className={`flex flex-col items-center text-[10px] font-semibold ${
            location.pathname.startsWith('/health-records') ? 'text-teal-700' : 'text-slate-500'
          }`}
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span>Records</span>
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center text-[10px] font-semibold ${
            location.pathname.startsWith('/dashboard') ? 'text-teal-700' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};
