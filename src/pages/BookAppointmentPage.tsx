import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ConsultationMode, Doctor, Appointment } from '../types';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Building,
  Video,
  User,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  FileText,
  CreditCard
} from 'lucide-react';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { doctors, familyProfiles, activeProfile, bookAppointment } = useApp();

  // Query params initializers
  const initialDoctorId = searchParams.get('doctorId') || doctors[0]?.id || '';
  const initialDate = searchParams.get('date');
  const initialTime = searchParams.get('time');
  const initialMode = (searchParams.get('mode') as ConsultationMode) || 'in-person';

  // State
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctorId);
  const [consultationMode, setConsultationMode] = useState<ConsultationMode>(initialMode);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientId, setPatientId] = useState<string>(activeProfile.id);
  const [visitReason, setVisitReason] = useState<string>('');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  // Set default dates and times whenever selected doctor changes
  useEffect(() => {
    if (selectedDoctor) {
      if (initialDate && selectedDoctor.availableDates.includes(initialDate)) {
        setSelectedDate(initialDate);
      } else {
        setSelectedDate(selectedDoctor.availableDates[0] || '2026-10-25');
      }

      if (initialTime && selectedDoctor.availableTimes.includes(initialTime)) {
        setSelectedTime(initialTime);
      } else {
        setSelectedTime(selectedDoctor.availableTimes[0] || '10:00 AM');
      }
    }
  }, [selectedDoctorId]);

  const selectedPatient = familyProfiles.find((p) => p.id === patientId) || activeProfile;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (!selectedDoctorId || !selectedDate || !selectedTime) {
      setBookingError('Please ensure a doctor, date, and appointment time are selected.');
      return;
    }

    const result = bookAppointment({
      doctorId: selectedDoctorId,
      date: selectedDate,
      time: selectedTime,
      consultationMode,
      patientId,
      reason: visitReason
    });

    if ('error' in result) {
      setBookingError(result.error);
    } else {
      setConfirmedAppointment(result);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedAppointment) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-teal-100 shadow-soft-xl p-6 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Booking Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 mt-1">
              Appointment Successfully Reserved!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your appointment has been registered in the CareOrbit demonstration system.
            </p>
          </div>

          {/* Reference Receipt Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 text-left text-xs space-y-3">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Reference Number</span>
              <span className="font-mono font-bold text-sm text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {confirmedAppointment.referenceNumber}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Doctor</span>
              <span className="font-bold text-slate-900">{confirmedAppointment.doctorName}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Speciality</span>
              <span className="font-semibold text-teal-700">{confirmedAppointment.doctorSpeciality}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Date & Time</span>
              <span className="font-bold text-slate-900">
                {confirmedAppointment.date} at {confirmedAppointment.time}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Consultation Type</span>
              <span className="capitalize font-semibold text-slate-900 flex items-center gap-1">
                {confirmedAppointment.consultationMode === 'in-person' ? (
                  <>
                    <Building className="w-3.5 h-3.5 text-teal-600" />
                    <span>Clinic Visit</span>
                  </>
                ) : (
                  <>
                    <Video className="w-3.5 h-3.5 text-teal-600" />
                    <span>Video Consultation</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Patient Name</span>
              <span className="font-bold text-slate-900">{confirmedAppointment.patientName}</span>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Consultation Fee</span>
              <span className="font-black text-sm text-slate-900">₹{confirmedAppointment.fee}</span>
            </div>
          </div>

          <div className="p-3 bg-teal-50 rounded-xl text-teal-900 text-xs flex items-center gap-2 text-left">
            <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Demo Notice: This booking is simulated. No actual doctor or payment gateway was billed.</span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              to="/appointments"
              className="w-full py-3 px-4 rounded-xl bg-teal-700 text-white font-bold text-xs sm:text-sm hover:bg-teal-800 transition-colors shadow-sm text-center"
            >
              View My Appointments
            </Link>
            <Link
              to="/dashboard"
              className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors text-center"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-teal-700 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctor Directory</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
          Book Doctor Appointment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete the steps below to reserve your consultation slot in shared application state.
        </p>
      </div>

      {bookingError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{bookingError}</span>
        </div>
      )}

      <form onSubmit={handleConfirmBooking} className="space-y-6">
        {/* Step 1: Select Doctor */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-sm font-bold text-navy-950">Select Doctor</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {doctors.map((doc) => {
              const isSelected = selectedDoctorId === doc.id;
              return (
                <button
                  type="button"
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-12 h-12 rounded-lg object-cover object-top shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{doc.name}</p>
                    <p className="text-[11px] text-teal-700 font-semibold">{doc.speciality}</p>
                    <p className="text-[11px] text-slate-500 font-bold mt-1">₹{doc.fee}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Consultation Mode */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-sm font-bold text-navy-950">Select Consultation Mode</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setConsultationMode('in-person')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                consultationMode === 'in-person'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-1 ring-teal-500'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-lg bg-teal-100 text-teal-800">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">In-Person Clinic Visit</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Meet at {selectedDoctor.clinicName}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setConsultationMode('online')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                consultationMode === 'online'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-1 ring-teal-500'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Online Video Consultation</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Secure tele-health call link sent prior to slot
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Step 3: Date and Time Slot */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="text-sm font-bold text-navy-950">Select Date & Time Slot</h2>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Available Dates
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedDoctor.availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const isSelected = selectedDate === date;
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        isSelected
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold opacity-80">
                        {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-xs font-black mt-0.5">
                        {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Available Time
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {selectedDoctor.availableTimes.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 & 5: Patient Profile & Reason */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h2 className="text-sm font-bold text-navy-950">Patient Details & Reason for Visit</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Booking For (Family Member)
              </label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-white"
              >
                {familyProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.relation}) • Age {p.age}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Reason for Visit (Optional)
              </label>
              <input
                type="text"
                value={visitReason}
                onChange={(e) => setVisitReason(e.target.value)}
                placeholder="e.g. Follow-up for chest ache, viral fever check"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Step 6: Review & Fee Breakdown */}
        <div className="bg-mint-50/60 p-5 sm:p-6 rounded-2xl border border-teal-100 space-y-3">
          <h3 className="text-sm font-bold text-teal-900">Step 6: Review Booking Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Doctor:</span>
              <span className="font-bold text-slate-900">{selectedDoctor.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Date & Time:</span>
              <span className="font-bold text-slate-900">{selectedDate} at {selectedTime}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Patient:</span>
              <span className="font-bold text-slate-900">{selectedPatient.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Payable Fee:</span>
              <span className="font-extrabold text-teal-800 text-sm">₹{selectedDoctor.fee}</span>
            </div>
          </div>
        </div>

        {/* Step 7: Confirm CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-teal-700 text-white font-extrabold text-sm sm:text-base hover:bg-teal-800 transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span>Confirm Demo Appointment (₹{selectedDoctor.fee})</span>
          </button>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Simulated booking: saves to local state and updates Care Journey and available calendar slots instantly.
          </p>
        </div>
      </form>
    </div>
  );
};
