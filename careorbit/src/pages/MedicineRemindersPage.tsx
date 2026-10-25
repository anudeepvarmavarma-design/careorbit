import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MedicineReminder } from '../types';
import {
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  Pill,
  Trash2,
  Edit2,
  Bell,
  RotateCcw,
  X,
  Package
} from 'lucide-react';

export const MedicineRemindersPage: React.FC = () => {
  const {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    recordReminderStatus,
    activeProfile
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<MedicineReminder | null>(null);

  // Form state
  const [medicineName, setMedicineName] = useState('');
  const [schedule, setSchedule] = useState('Once Daily - Morning');
  const [time, setTime] = useState('08:30 AM');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [remainingSupply, setRemainingSupply] = useState<number>(30);
  const [refillReminderDate, setRefillReminderDate] = useState('');
  const [notes, setNotes] = useState('');

  const todayKey = new Date().toISOString().split('T')[0];

  const handleOpenAdd = () => {
    setEditingReminder(null);
    setMedicineName('');
    setSchedule('Once Daily - Morning');
    setTime('08:30 AM');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    setRemainingSupply(30);
    setRefillReminderDate('');
    setNotes('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (rem: MedicineReminder) => {
    setEditingReminder(rem);
    setMedicineName(rem.medicineName);
    setSchedule(rem.schedule);
    setTime(rem.time);
    setStartDate(rem.startDate);
    setEndDate(rem.endDate || '');
    setRemainingSupply(rem.remainingSupply || 30);
    setRefillReminderDate(rem.refillReminderDate || '');
    setNotes(rem.notes || '');
    setShowAddModal(true);
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName) return;

    if (editingReminder) {
      updateReminder(editingReminder.id, {
        medicineName,
        schedule,
        time,
        startDate,
        endDate: endDate || undefined,
        remainingSupply: Number(remainingSupply),
        refillReminderDate: refillReminderDate || undefined,
        notes: notes || undefined
      });
    } else {
      addReminder({
        patientId: activeProfile.id,
        medicineName,
        schedule,
        time,
        startDate,
        endDate: endDate || undefined,
        remainingSupply: Number(remainingSupply),
        refillReminderDate: refillReminderDate || undefined,
        notes: notes || undefined
      });
    }

    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Medicine Reminders & Refill Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalized dosing schedules and remaining supply trackers for <strong className="text-slate-800">{activeProfile.name}</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Dose Reminder</span>
        </button>
      </div>

      {/* Low Supply Refill Alert Banner (if any supply <= 5) */}
      {reminders.some((r) => r.remainingSupply !== undefined && r.remainingSupply <= 5) && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-amber-900 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold">Low Medicine Supply Warning</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                One or more of your recurring medications has 5 or fewer doses remaining. Consider ordering a refill now.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Today's Daily Schedule Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Today's Dosing Schedule ({new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })})</span>
          </h2>
          <span className="text-xs font-semibold text-slate-400">In-App Demo Alerts</span>
        </div>

        {reminders.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 space-y-2">
            <p>No reminders scheduled yet.</p>
            <button
              onClick={handleOpenAdd}
              className="text-teal-700 font-bold hover:underline"
            >
              Add your first medicine reminder →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reminders.map((rem) => {
              const status = rem.statusHistory[todayKey] || 'pending';
              const isTaken = status === 'taken';
              const isSkipped = status === 'skipped';
              const isLow = rem.remainingSupply !== undefined && rem.remainingSupply <= 5;

              return (
                <div
                  key={rem.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                    isTaken
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : isSkipped
                      ? 'bg-rose-50/40 border-rose-200'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-white shadow-xs text-teal-700">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-navy-950">{rem.medicineName}</h3>
                          <span className="text-[11px] font-bold text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-100">
                            {rem.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(rem)}
                          className="p-1 text-slate-400 hover:text-teal-700"
                          title="Edit reminder"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteReminder(rem.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Delete reminder"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">{rem.schedule}</p>
                    {rem.notes && <p className="text-[11px] text-slate-400 italic">"{rem.notes}"</p>}

                    {/* Supply alert indicator */}
                    {rem.remainingSupply !== undefined && (
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-slate-500">Remaining supply:</span>
                        <span
                          className={`font-bold ${
                            isLow ? 'text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded' : 'text-slate-800'
                          }`}
                        >
                          {rem.remainingSupply} doses left
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dose action buttons */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    {isTaken ? (
                      <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Marked Taken
                      </span>
                    ) : isSkipped ? (
                      <span className="text-rose-700 font-bold text-xs flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Marked Skipped
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => recordReminderStatus(rem.id, todayKey, 'taken')}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-xs"
                        >
                          Mark Taken
                        </button>
                        <button
                          type="button"
                          onClick={() => recordReminderStatus(rem.id, todayKey, 'skipped')}
                          className="py-1.5 px-3 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition-colors"
                        >
                          Skip
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-navy-950">
                {editingReminder ? 'Edit Medicine Reminder' : 'Add Medicine Reminder'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReminder} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  required
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g. Telma 40mg, Dolo 650"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Frequency / Instructions
                  </label>
                  <input
                    type="text"
                    required
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    placeholder="e.g. Twice Daily - After Food"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Time of Day
                  </label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 08:30 AM"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Remaining Supply (Doses)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={remainingSupply}
                    onChange={(e) => setRemainingSupply(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Refill Reminder Date
                  </label>
                  <input
                    type="date"
                    value={refillReminderDate}
                    onChange={(e) => setRefillReminderDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Optional Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Take with lukewarm water"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-700 font-bold text-white hover:bg-teal-800"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
