import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  Calendar,
  ShoppingBag,
  Compass,
  Clock,
  ShieldCheck,
  Star,
  ChevronRight,
  Heart,
  Activity,
  ArrowRight,
  Stethoscope,
  Pill,
  FileCheck2,
  CheckCircle2,
  Plus,
  HelpCircle,
  PhoneCall,
  Sparkles,
  Calculator
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, doctors, medicines, addToCart, careJourneySteps } = useApp();
  const navigate = useNavigate();

  // Search tabs state
  const [searchTab, setSearchTab] = useState<'doctor' | 'medicine'>('doctor');
  const [doctorQuery, setDoctorQuery] = useState('');
  const [doctorSpeciality, setDoctorSpeciality] = useState('All');
  const [medicineQuery, setMedicineQuery] = useState('');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDoctorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (doctorQuery) params.set('q', doctorQuery);
    if (doctorSpeciality && doctorSpeciality !== 'All') params.set('speciality', doctorSpeciality);
    navigate(`/doctors?${params.toString()}`);
  };

  const handleMedicineSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (medicineQuery) params.set('q', medicineQuery);
    navigate(`/medicines?${params.toString()}`);
  };

  const specialities = [
    { name: 'General Physician', icon: Stethoscope, count: '12+ Specialists', color: 'bg-emerald-50 text-emerald-700' },
    { name: 'Cardiology', icon: Heart, count: '8+ Specialists', color: 'bg-rose-50 text-rose-700' },
    { name: 'Pediatrics', icon: Activity, count: '9+ Specialists', color: 'bg-amber-50 text-amber-700' },
    { name: 'Dermatology', icon: Sparkles, count: '10+ Specialists', color: 'bg-teal-50 text-teal-700' },
    { name: 'Orthopedics', icon: Activity, count: '7+ Specialists', color: 'bg-blue-50 text-blue-700' },
    { name: 'Gynecology', icon: Heart, count: '11+ Specialists', color: 'bg-purple-50 text-purple-700' },
    { name: 'Dental Care', icon: ShieldCheck, count: '6+ Specialists', color: 'bg-cyan-50 text-cyan-700' },
    { name: 'Ophthalmology', icon: EyeIcon, count: '5+ Specialists', color: 'bg-indigo-50 text-indigo-700' }
  ];

  function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  const faqs = [
    {
      q: 'How does CareOrbit connect doctor visits and pharmacy orders?',
      a: 'CareOrbit connects your entire care continuum through our signature Care Journey. After consulting with your doctor, eligible prescriptions are uploaded directly, allowing verified dispensing of required medicines and automated reminder scheduling without juggling multiple platforms.'
    },
    {
      q: 'Can I book both in-person clinic appointments and online video consultations?',
      a: 'Yes. Each doctor profile clearly displays supported consultation modes. You can select an in-person visit at their verified clinic or a convenient online video consultation slot.'
    },
    {
      q: 'How are prescription-required medicines verified on CareOrbit?',
      a: 'Prescription-required products cannot be checked out like ordinary OTC products. In our simulated review workflow, you upload your doctor prescription file, which is reviewed before dispensing approval is simulated for demo fulfillment.'
    },
    {
      q: 'Can I manage healthcare appointments and records for my family members?',
      a: 'Yes! CareOrbit includes built-in Family Profiles. You can switch between profiles (e.g., spouse, children, or elderly parents) to book appointments, manage individual health records, and set independent medicine schedules.'
    },
    {
      q: 'What is the Healthcare Cost Estimator tool?',
      a: 'The Cost Estimator allows you to plan your medical budget transparently. You can select a doctor consultation fee, add needed medicines, set your target budget, and instantly preview total estimated expenses.'
    }
  ];

  const testimonials = [
    {
      quote: "Scheduling a cardiology follow-up with Dr. Ananya Reddy and having my father's regular blood pressure medicine scheduled with refills in one app has saved our family so much time.",
      name: 'Sneha Kulkarni',
      role: 'Software Architect, Hyderabad',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      quote: "The connected Care Journey makes healthcare feel structured and clear. Finding Dr. Arjun Sharma for seasonal viral fever was quick, and the medicine reminders helped me complete my antibiotic course.",
      name: 'Rahul Varma',
      role: 'Product Lead, Bengaluru',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      quote: "The prescription verification and reminder tracking give peace of mind when taking care of senior family members. The interface is clean, uncluttered, and very responsive.",
      name: 'Vikram Deshmukh',
      role: 'Operations Director, Pune',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-mint-50/40 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-teal-100/60">
        {/* Soft background glow accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-teal-200/30 to-emerald-200/30 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Smart Healthcare and Medicine Booking Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-[1.12]">
                Your Health, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                  All in One Orbit.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Book trusted healthcare appointments, order medicines, and manage your care in one convenient place with connected timelines and intelligent reminders.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/doctors"
                  className="px-6 py-3.5 rounded-xl bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-900/15 hover:bg-teal-800 hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>{t('findDoctorCta')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  to="/medicines"
                  className="px-6 py-3.5 rounded-xl bg-white border border-teal-200 text-teal-800 font-bold text-sm shadow-xs hover:bg-teal-50/60 hover:border-teal-300 transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-teal-600" />
                  <span>{t('orderMedicinesCta')}</span>
                </Link>
              </div>

              {/* Key Trust Stats (Illustrative) */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-teal-100/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-black text-navy-950">25+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Verified Specialities</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-navy-950">1,500+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Healthcare Products</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-navy-950">4.9/5</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Demonstration Rating</div>
                </div>
              </div>
            </div>

            {/* Right Doctor & Healthcare Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card with Physician Photo */}
                <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-soft-xl border border-teal-100/80 relative">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Ananya Reddy - Senior Cardiologist"
                    className="w-full h-80 sm:h-96 object-cover object-top rounded-2xl"
                  />

                  {/* Overlay doctor badge */}
                  <div className="p-4 bg-white/95 backdrop-blur-sm rounded-2xl mt-3 border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <h4 className="text-sm font-bold text-navy-950">Dr. Ananya Reddy</h4>
                      </div>
                      <p className="text-xs text-teal-700 font-medium">Senior Cardiologist • Apollo Care</p>
                    </div>
                    <Link
                      to="/doctors/doc-1"
                      className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors"
                    >
                      Book Slot
                    </Link>
                  </div>
                </div>

                {/* Floating Widget 1: Next Slot Notification */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce-subtle">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Earliest Available</p>
                    <p className="text-xs font-bold text-navy-950">Today at 04:30 PM</p>
                  </div>
                </div>

                {/* Floating Widget 2: Medicine Reminder */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Daily Dose Reminder</p>
                    <p className="text-xs font-bold text-navy-950">Telma 40mg • Taken 08:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unified Search Component with Tabs */}
          <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl shadow-soft-xl border border-teal-100 p-4 sm:p-6">
            {/* Tab toggles */}
            <div className="flex border-b border-slate-100 pb-3 mb-5 gap-4">
              <button
                type="button"
                onClick={() => setSearchTab('doctor')}
                className={`flex items-center gap-2 pb-2 text-sm font-bold transition-all relative ${
                  searchTab === 'doctor'
                    ? 'text-teal-700'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>{t('searchDoctorsTab')}</span>
                {searchTab === 'doctor' && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSearchTab('medicine')}
                className={`flex items-center gap-2 pb-2 text-sm font-bold transition-all relative ${
                  searchTab === 'medicine'
                    ? 'text-teal-700'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('searchMedicinesTab')}</span>
                {searchTab === 'medicine' && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></span>
                )}
              </button>
            </div>

            {/* Doctor Search Form */}
            {searchTab === 'doctor' ? (
              <form onSubmit={handleDoctorSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-6 relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={doctorQuery}
                    onChange={(e) => setDoctorQuery(e.target.value)}
                    placeholder="Doctor name, symptom or condition (e.g. Dr. Ananya, chest pain)..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 placeholder:text-slate-400"
                  />
                </div>

                <div className="md:col-span-4">
                  <select
                    value={doctorSpeciality}
                    onChange={(e) => setDoctorSpeciality(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    <option value="All">All Specialities</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Dental Care">Dental Care</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-teal-700 text-white font-bold text-sm hover:bg-teal-800 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Medicine Search Form */
              <form onSubmit={handleMedicineSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-9 relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={medicineQuery}
                    onChange={(e) => setMedicineQuery(e.target.value)}
                    placeholder="Search Paracetamol, ORS, sunscreen, vitamins, thermometers..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 placeholder:text-slate-400"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-teal-700 text-white font-bold text-sm hover:bg-teal-800 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Browse Store</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 2. POPULAR MEDICAL SPECIALITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Clinical Expertise</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
              Popular Medical Specialities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consult certified practitioners across leading primary care and specialized disciplines.
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 shrink-0"
          >
            <span>View All Doctors</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {specialities.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={`/doctors?speciality=${encodeURIComponent(item.name)}`}
                className="group p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl ${item.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy-950 group-hover:text-teal-700 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{item.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED DOCTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Experienced Care</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
              Featured Doctors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fictional demonstration clinician profiles with verified slot availability.
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 shrink-0"
          >
            <span>Explore All Specialists</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                  </div>
                  {doctor.isAvailableToday && (
                    <div className="absolute bottom-2.5 left-2.5 bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide shadow-xs">
                      Available Today
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div>
                    <h3 className="text-base font-bold text-navy-950 leading-snug group-hover:text-teal-700 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700">{doctor.speciality}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{doctor.qualification}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{doctor.experience} yrs exp</span>
                    <span className="font-bold text-navy-950">₹{doctor.fee}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                    <Clock className="w-3 h-3 text-teal-600 shrink-0" />
                    <span className="truncate">{doctor.nextSlot}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
                <Link
                  to={`/doctors/${doctor.id}`}
                  className="py-2 px-3 rounded-xl border border-slate-200 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Profile
                </Link>
                <Link
                  to={`/book-appointment?doctorId=${doctor.id}`}
                  className="py-2 px-3 rounded-xl bg-teal-700 text-white text-center text-xs font-bold hover:bg-teal-800 transition-colors shadow-xs"
                >
                  Book Slot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR HEALTHCARE PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Digital Pharmacy</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
              Popular Healthcare Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified over-the-counter essentials, first aid, and wellness supplements.
            </p>
          </div>
          <Link
            to="/medicines"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 shrink-0"
          >
            <span>Visit Medicine Store</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.slice(0, 4).map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg transition-all p-4 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center">
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {med.prescriptionRequired && (
                    <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      Rx Required
                    </span>
                  )}
                  {med.originalPrice > med.price && (
                    <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {Math.round(((med.originalPrice - med.price) / med.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                    {med.category}
                  </span>
                  <Link to={`/medicines/${med.id}`} className="block">
                    <h3 className="text-sm font-bold text-navy-950 mt-0.5 line-clamp-1 hover:text-teal-700 transition-colors">
                      {med.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 mt-0.5">{med.packSize}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
                <div>
                  <span className="text-base font-extrabold text-navy-950">₹{med.price}</span>
                  {med.originalPrice > med.price && (
                    <span className="text-xs text-slate-400 line-through ml-1.5">
                      ₹{med.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(med)}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs hover:bg-teal-700 hover:text-white transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW CAREORBIT WORKS */}
      <section className="bg-gradient-to-b from-white via-mint-50/50 to-white py-16 border-y border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Seamless Continuum</span>
            <h2 className="text-3xl font-extrabold text-navy-950 mt-1">
              How CareOrbit Works
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Three simple steps that seamlessly connect consultation, verified medicine delivery, and ongoing recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-soft relative flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xl mb-5 shadow-xs">
                1
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">Find & Book Your Doctor</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Filter by verified speciality, clinic location, or video consultation. Reserve your appointment with conflict-free slot scheduling.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-soft relative flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl mb-5 shadow-xs">
                2
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">Verify Prescription & Order</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Upload your doctor consultation prescription. Seamlessly attach verified medications to your order for prompt doorstep delivery.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-soft relative flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-900 text-teal-100 flex items-center justify-center font-black text-xl mb-5 shadow-xs">
                3
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">Track Care Journey & Reminders</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Never miss a dose with interactive daily schedules, refill notices, and a unified health record dashboard for your whole family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE FEATURE PREVIEW: CARE JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-navy-950 rounded-3xl p-8 sm:p-12 text-white shadow-soft-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Signature Differentiator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              The Connected Care Journey
            </h2>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              Healthcare shouldn't feel like a disconnected maze of separate apps. CareOrbit automatically links your doctor bookings, prescription approvals, medicine orders, and daily recovery routines into one synchronized visual timeline.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                to="/care-journey"
                className="px-6 py-3 rounded-xl bg-emerald-500 text-navy-950 font-bold text-sm hover:bg-emerald-400 transition-colors shadow-md flex items-center gap-2"
              >
                <span>Explore Care Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cost-estimator"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors flex items-center gap-2 border border-white/20"
              >
                <Calculator className="w-4 h-4 text-teal-300" />
                <span>Cost Estimator</span>
              </Link>
            </div>
          </div>

          {/* Quick mini-stages display */}
          <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-teal-700/60 max-w-2xl relative z-10 text-xs">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
              <div className="text-emerald-400 font-bold">Stage 1-3</div>
              <div className="text-teal-100 font-medium mt-0.5">Doctor Booking & Prep</div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
              <div className="text-emerald-400 font-bold">Stage 4-7</div>
              <div className="text-teal-100 font-medium mt-0.5">Rx Review & Pharmacy</div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
              <div className="text-emerald-400 font-bold">Stage 8-9</div>
              <div className="text-teal-100 font-medium mt-0.5">Dosing & Holistic Review</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PATIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Patient Experiences</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
            Loved by Families Across India
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Clearly labelled illustrative demonstration feedback from fictional patient personas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-600/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-navy-950">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Help & Guidance</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-navy-950 hover:text-teal-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-90 text-teal-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
