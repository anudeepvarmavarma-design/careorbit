import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  Compass,
  FileText,
  Clock,
  Users,
  Settings,
  Bot,
  Calculator,
  LogOut,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    cartCount,
    activeProfile,
    familyProfiles,
    setActiveProfile,
    isAuthenticated,
    signOut,
    resetDemoData
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const location = useLocation();

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/doctors', label: t('findDoctors') },
    { to: '/medicines', label: t('medicines') },
    { to: '/care-journey', label: t('careJourney'), badge: 'Orbit' },
    { to: '/health-records', label: t('myHealth') },
    { to: '/cost-estimator', label: t('costEstimator') },
    { to: '/assistant', label: t('assistant') }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-sm transition-all">
      {/* Top micro-bar for Demo Notice & Fast Actions */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-navy-900 text-teal-100 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-400/30">
              Interactive Demo
            </span>
            <span className="text-teal-200">
              Smart Healthcare Platform • Profiles, appointments, and pharmacy are simulated for preview.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1 text-[11px] font-medium text-teal-300">
              <Settings className="w-3 h-3" />
              Demo Admin Panel
            </Link>
            <button
              onClick={resetDemoData}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-200"
              title="Reset demo data to default initial state"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo */}
          <Logo showTagline={true} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'text-teal-700 bg-teal-50/80 shadow-xs'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-600 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-teal-400 hover:bg-teal-50/50 transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>{language === 'en' ? 'EN' : 'తెలుగు'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between ${
                      language === 'en' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('te');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between ${
                      language === 'te' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>తెలుగు (Telugu)</span>
                    {language === 'te' && <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl text-slate-700 hover:text-teal-700 hover:bg-teal-50/70 transition-colors"
              aria-label={`View cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-teal-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Menu Dropdown */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/40 transition-all text-slate-800"
                  aria-label="User account menu"
                >
                  <img
                    src={activeProfile.avatar}
                    alt={activeProfile.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-teal-600/30"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {activeProfile.name}
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium">
                      {activeProfile.relation}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 divide-y divide-slate-100 animate-in fade-in duration-150">
                    {/* Active Profile Info & Family Switcher Quick bar */}
                    <div className="p-3 bg-mint-50/60 rounded-xl mb-1">
                      <div className="text-[11px] uppercase font-bold tracking-wider text-teal-800 mb-2">
                        Active Family Profile
                      </div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <img
                          src={activeProfile.avatar}
                          alt={activeProfile.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-teal-600"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{activeProfile.name}</p>
                          <p className="text-xs text-slate-500 truncate">{activeProfile.phone}</p>
                        </div>
                      </div>

                      {/* Switch Family Profiles Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-teal-100">
                        {familyProfiles.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setActiveProfile(f)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              f.id === activeProfile.id
                                ? 'bg-teal-700 text-white shadow-xs'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
                            }`}
                          >
                            {f.name.split(' ')[0]} ({f.relation})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1 text-xs font-medium text-slate-700">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700 transition-colors"
                      >
                        <User className="w-4 h-4 text-teal-600" />
                        {t('myDashboard')}
                      </Link>
                      <Link
                        to="/appointments"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-teal-600" />
                        {t('myAppointments')}
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-teal-600" />
                        {t('myOrders')}
                      </Link>
                      <Link
                        to="/reminders"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700 transition-colors"
                      >
                        <Clock className="w-4 h-4 text-teal-600" />
                        {t('medicineReminders')}
                      </Link>
                      <Link
                        to="/health-records"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700 transition-colors"
                      >
                        <FileText className="w-4 h-4 text-teal-600" />
                        {t('healthRecords')}
                      </Link>
                      <Link
                        to="/family-profiles"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-teal-700 transition-colors"
                      >
                        <Users className="w-4 h-4 text-teal-600" />
                        {t('familyProfiles')}
                      </Link>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100/60 font-semibold transition-colors mt-1"
                      >
                        <Settings className="w-4 h-4 text-emerald-700" />
                        {t('admin')}
                      </Link>
                    </div>

                    {/* Sign out */}
                    <div className="pt-1">
                      <button
                        onClick={signOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('signOut')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
              >
                {t('signIn')}
              </Link>
            )}

            {/* Primary Book Appointment CTA Button */}
            <Link
              to="/book-appointment"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 text-white font-semibold text-xs tracking-wide shadow-md shadow-teal-900/10 hover:from-teal-800 hover:to-teal-900 hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t('bookAppointment')}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  isActive(link.to)
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-teal-600 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <Link
              to="/book-appointment"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-700 text-white font-bold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              {t('bookAppointment')}
            </Link>

            <Link
              to="/admin"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
            >
              <Settings className="w-3.5 h-3.5" />
              {t('admin')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
