import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Video,
  Building,
  CheckCircle2,
  Shield,
  ArrowLeft,
  Languages,
  Award,
  ChevronRight
} from 'lucide-react';
import { ConsultationMode } from '../types';

export const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDoctorById } = useApp();
  const navigate = useNavigate();

  const doctor = getDoctorById(id || '');

  const [selectedDate, setSelectedDate] = useState<string>(doctor?.availableDates[0] || '2026-10-25');
  const [selectedTime, setSelectedTime] = useState<string>(doctor?.availableTimes[0] || '10:00 AM');
  const [selectedMode, setSelectedMode] = useState<ConsultationMode>(
    doctor?.consultationModes[0] || 'in-person'
  );

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-950">Doctor Profile Not Found</h2>
        <p className="text-sm text-slate-500">The physician you are looking for is not listed or has been moved.</p>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctor Directory</span>
        </Link>
      </div>
    );
  }

  const handleProceedToBooking = () => {
    navigate(
      `/book-appointment?doctorId=${doctor.id}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}&mode=${selectedMode}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <Link
        to="/doctors"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Doctors</span>
      </Link>

      {/* Main Doctor Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft flex flex-col md:flex-row gap-6 items-start justify-between">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover object-top ring-2 ring-teal-600/30 shrink-0"
          />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">{doctor.name}</h1>
              {doctor.isAvailableToday && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Available Today
                </span>
              )}
            </div>

            <p className="text-sm font-bold text-teal-700">{doctor.speciality}</p>
            <p className="text-xs text-slate-500">{doctor.qualification}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{doctor.rating}</span>
                <span className="text-slate-400 font-normal">({doctor.reviewCount} demo reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-teal-600" />
                <span>{doctor.experience} years experience</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Languages className="w-4 h-4 text-slate-400" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-600 pt-2">
              <Building className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">{doctor.clinicName}</span>
                <p className="text-slate-500 text-[11px]">{doctor.clinicAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Highlight Card */}
        <div className="bg-mint-50/70 p-5 rounded-2xl border border-teal-100 w-full md:w-56 text-center space-y-2 shrink-0">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Consultation Fee</span>
          <div className="text-3xl font-black text-navy-950">₹{doctor.fee}</div>
          <p className="text-[11px] text-teal-800 font-medium">Free follow-up query included in demo</p>
        </div>
      </div>

      {/* Grid: Details Left, Interactive Booking Slot Picker Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: About & Services */}
        <div className="lg:col-span-7 space-y-6">
          {/* About Bio */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-navy-950">About {doctor.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{doctor.about}</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
              Note: This is an illustrative demonstration profile. All credentials and appointment availability are simulated.
            </div>
          </div>

          {/* Clinical Services */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-navy-950">Services & Specializations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {doctor.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Slot Selection Widget */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-5">
          <h2 className="text-base font-bold text-navy-950 flex items-center justify-between">
            <span>Select Consultation Slot</span>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              Instant Reserve
            </span>
          </h2>

          {/* Mode Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Consultation Mode
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {doctor.consultationModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedMode(mode)}
                  className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                    selectedMode === mode
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {mode === 'in-person' ? (
                    <>
                      <Building className="w-4 h-4" />
                      <span>Clinic Visit</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4" />
                      <span>Video Call</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Available Dates */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Available Dates
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {doctor.availableDates.map((date) => {
                const dateObj = new Date(date);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                const isSelected = selectedDate === date;

                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-xs ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-slate-400">{dayName}</div>
                    <div className="text-xs font-extrabold mt-0.5">{dayNum}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Times */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 gap-2">
              {doctor.availableTimes.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>Appointment:</span>
              <span className="font-semibold text-slate-900">{selectedDate} at {selectedTime}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Mode:</span>
              <span className="font-semibold capitalize text-slate-900">{selectedMode}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Payable:</span>
              <span className="font-bold text-teal-700">₹{doctor.fee}</span>
            </div>
          </div>

          {/* Book Action */}
          <button
            type="button"
            onClick={handleProceedToBooking}
            className="w-full py-3.5 px-4 rounded-xl bg-teal-700 text-white font-bold text-sm hover:bg-teal-800 transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>Proceed to Booking Flow</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
