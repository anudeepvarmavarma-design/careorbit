import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Video,
  Building,
  CheckCircle2,
  Calendar,
  RotateCcw,
  Languages,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { ConsultationMode } from '../types';

export const DoctorDiscoveryPage: React.FC = () => {
  const { doctors, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSpeciality, setSelectedSpeciality] = useState(searchParams.get('speciality') || 'All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [maxFee, setMaxFee] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('availability'); // 'availability' | 'fee_asc' | 'rating' | 'experience'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const specialities = [
    'All',
    'General Physician',
    'Cardiology',
    'Pediatrics',
    'Dermatology',
    'Orthopedics',
    'Gynecology',
    'Dental Care',
    'Ophthalmology'
  ];

  const languagesList = ['All', 'English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Marathi'];

  // Filtered and Sorted Doctors
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        // Search query matching name, speciality, clinic, or services
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = doc.name.toLowerCase().includes(q);
          const matchSpec = doc.speciality.toLowerCase().includes(q);
          const matchClinic = doc.clinicName.toLowerCase().includes(q) || doc.clinicAddress.toLowerCase().includes(q);
          const matchServices = doc.services.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchSpec && !matchClinic && !matchServices) return false;
        }

        // Speciality
        if (selectedSpeciality !== 'All' && doc.speciality !== selectedSpeciality) {
          return false;
        }

        // Mode
        if (selectedMode !== 'All' && !doc.consultationModes.includes(selectedMode as ConsultationMode)) {
          return false;
        }

        // Language
        if (selectedLanguage !== 'All' && !doc.languages.includes(selectedLanguage)) {
          return false;
        }

        // Fee
        if (doc.fee > maxFee) {
          return false;
        }

        // Rating
        if (doc.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'fee_asc') return a.fee - b.fee;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'experience') return b.experience - a.experience;
        // Default earliest availability (today first)
        if (a.isAvailableToday && !b.isAvailableToday) return -1;
        if (!a.isAvailableToday && b.isAvailableToday) return 1;
        return 0;
      });
  }, [doctors, searchQuery, selectedSpeciality, selectedMode, selectedLanguage, maxFee, minRating, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSpeciality('All');
    setSelectedMode('All');
    setSelectedLanguage('All');
    setMaxFee(1000);
    setMinRating(0);
    setSortBy('availability');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Clinic Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Find and Book Trusted Doctors
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Search top specialists across India with transparent consultation fees, clinic locations, and simulated real-time appointment slots.
          </p>
        </div>
      </div>

      {/* Main Search & Sorting Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name, speciality, or condition..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="availability">Earliest Availability</option>
              <option value="fee_asc">Lowest Consultation Fee</option>
              <option value="rating">Highest Rating</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Layout: Sidebar Filters + Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Filters */}
        <aside
          className={`md:col-span-4 lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 ${
            showMobileFilters ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Speciality Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Speciality
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {specialities.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpeciality(spec)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedSpeciality === spec
                      ? 'bg-teal-700 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Consultation Mode
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {['All', 'in-person', 'online'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold capitalize border transition-all ${
                    selectedMode === mode
                      ? 'bg-teal-50 border-teal-600 text-teal-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {mode === 'in-person' ? 'Clinic' : mode === 'online' ? 'Video' : 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Max Fee Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase tracking-wider">Max Fee</span>
              <span className="text-teal-700 font-black">₹{maxFee}</span>
            </div>
            <input
              type="range"
              min="500"
              max="1000"
              step="50"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹500</span>
              <span>₹1,000</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-1 text-xs">
              {[0, 4.0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`py-1.5 rounded-lg text-center font-semibold border transition-all ${
                    minRating === rating
                      ? 'bg-teal-700 border-teal-700 text-white'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {rating === 0 ? 'Any' : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Languages spoken */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white"
            >
              {languagesList.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Doctor Cards Listing */}
        <main className="md:col-span-8 lg:col-span-9 space-y-4">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>
              Showing <strong className="text-navy-950">{filteredDoctors.length}</strong> verified doctors
            </span>
            <span className="text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md text-[11px] font-semibold">
              Demo Directory
            </span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-950">No doctors match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your search terms, adjusting the fee slider, or clearing the speciality filter.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start justify-between"
                >
                  {/* Photo & Modes */}
                  <div className="flex gap-4 items-start w-full sm:w-auto">
                    <div className="relative shrink-0">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top ring-1 ring-slate-200"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-800 flex items-center gap-0.5 shadow-xs border border-slate-100">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base sm:text-lg font-bold text-navy-950 hover:text-teal-700 transition-colors">
                          <Link to={`/doctors/${doc.id}`}>{doc.name}</Link>
                        </h2>
                        {doc.isAvailableToday && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            Available Today
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-bold text-teal-700">{doc.speciality}</p>
                      <p className="text-xs text-slate-500">{doc.qualification}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                        <span>{doc.experience} years experience</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Languages className="w-3 h-3 text-slate-400" />
                          <span>{doc.languages.join(', ')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                        <Building className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{doc.clinicName}</span>
                        <span className="text-slate-400 text-[11px] truncate">({doc.clinicAddress})</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Slot, Fee, CTAs */}
                  <div className="w-full sm:w-48 sm:text-right flex sm:flex-col justify-between items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                    <div>
                      <div className="text-[11px] text-slate-400">Consultation Fee</div>
                      <div className="text-lg font-black text-navy-950">₹{doc.fee}</div>
                    </div>

                    <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{doc.nextSlot}</span>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full">
                      <Link
                        to={`/doctors/${doc.id}`}
                        className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        View Profile
                      </Link>
                      <Link
                        to={`/book-appointment?doctorId=${doc.id}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-teal-700 text-white text-center text-xs font-bold hover:bg-teal-800 transition-colors shadow-xs"
                      >
                        Book Slot
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
