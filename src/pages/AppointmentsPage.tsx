import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Appointment, AppointmentStatus } from '../types';
import {
  Calendar,
  Clock,
  Building,
  Video,
  User,
  X,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  CalendarDays,
  Plus,
  ArrowRight
} from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { appointments, rescheduleAppointment, cancelAppointment, doctors } = useApp();

  const [activeTab, setActiveTab] = useState<AppointmentStatus | 'all'>('upcoming');

  // Reschedule Modal State
  const [reschedulingApt, setReschedulingApt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');

  // Cancel Modal State
  const [cancellingApt, setCancellingApt] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === 'all') return true;
    return apt.status === activeTab;
  });

  const handleOpenReschedule = (apt: Appointment) => {
    setReschedulingApt(apt);
    const doc = doctors.find((d) => d.id === apt.doctorId);
    setNewDate(doc?.availableDates[0] || '2026-10-27');
    setNewTime(doc?.availableTimes[0] || '11:00 AM');
  };

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reschedulingApt || !newDate || !newTime) return;
    const success = rescheduleAppointment(reschedulingApt.id, newDate, newTime);
    if (success) {
      setReschedulingApt(null);
    }
  };

  const handleConfirmCancel = () => {
    if (!cancellingApt) return;
    cancelAppointment(cancellingApt.id);
    setCancellingApt(null);
  };

  const targetDoctor = reschedulingApt ? doctors.find((d) => d.id === reschedulingApt.doctorId) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track and manage your upcoming clinic visits, video consultations, and booking history.
          </p>
        </div>
        <Link
          to="/book-appointment"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Appointment</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
        {(['upcoming', 'completed', 'cancelled', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 capitalize transition-colors relative whitespace-nowrap ${
              activeTab === tab
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab === 'all' ? 'All Bookings' : tab}</span>
            <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-semibold">
              {tab === 'all'
                ? appointments.length
                : appointments.filter((a) => a.status === tab).length}
            </span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">No {activeTab} appointments found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don't have any appointments under this tab. Book a slot with top specialists across India.
          </p>
          <div className="pt-2">
            <Link
              to="/doctors"
              className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors inline-block"
            >
              Explore Doctors
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft transition-all p-5 flex flex-col md:flex-row gap-5 items-start justify-between"
            >
              {/* Doctor Info & Photo */}
              <div className="flex gap-4 items-start w-full md:w-auto">
                <img
                  src={apt.doctorImage}
                  alt={apt.doctorName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top ring-1 ring-slate-200 shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-navy-950">{apt.doctorName}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        apt.status === 'upcoming'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-teal-700">{apt.doctorSpeciality}</p>
                  <p className="text-xs text-slate-600">
                    Patient: <strong className="text-slate-800">{apt.patientName}</strong>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{apt.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{apt.time}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1 font-semibold text-slate-800 capitalize">
                      {apt.consultationMode === 'in-person' ? (
                        <>
                          <Building className="w-3.5 h-3.5 text-teal-600" />
                          <span>Clinic</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-3.5 h-3.5 text-teal-600" />
                          <span>Online</span>
                        </>
                      )}
                    </div>
                  </div>

                  {apt.reason && (
                    <p className="text-xs text-slate-500 pt-1 italic">
                      "{apt.reason}"
                    </p>
                  )}
                </div>
              </div>

              {/* Right side: Ref, Fee, Actions */}
              <div className="w-full md:w-56 md:text-right flex md:flex-col justify-between items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <div>
                  <div className="text-[11px] text-slate-400">Ref: {apt.referenceNumber}</div>
                  <div className="text-base font-extrabold text-navy-950">₹{apt.fee}</div>
                </div>

                {apt.status === 'upcoming' && (
                  <div className="flex gap-2 w-full justify-end">
                    <button
                      type="button"
                      onClick={() => handleOpenReschedule(apt)}
                      className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => setCancellingApt(apt)}
                      className="py-1.5 px-3 rounded-xl border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {apt.status === 'completed' && (
                  <Link
                    to="/prescriptions"
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                  >
                    <span>View Prescriptions</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {reschedulingApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-navy-950">Reschedule Appointment</h3>
              <button
                onClick={() => setReschedulingApt(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Select a new date and time slot for your consultation with{' '}
              <strong className="text-slate-800">{reschedulingApt.doctorName}</strong>.
            </p>

            <form onSubmit={handleConfirmReschedule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select New Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {targetDoctor?.availableDates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setNewDate(d)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        newDate === d
                          ? 'bg-teal-700 text-white border-teal-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select New Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {targetDoctor?.availableTimes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewTime(t)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        newTime === t
                          ? 'bg-teal-700 text-white border-teal-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReschedulingApt(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRMATION MODAL */}
      {cancellingApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-navy-950">Cancel Appointment?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to cancel your appointment with {cancellingApt.doctorName} on {cancellingApt.date}?
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancellingApt(null)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
