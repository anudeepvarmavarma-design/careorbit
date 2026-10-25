import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  ShoppingBag,
  Clock,
  FileText,
  Compass,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  Building,
  Video,
  User,
  Users,
  Activity,
  Heart,
  ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    activeProfile,
    appointments,
    orders,
    reminders,
    records,
    careJourneySteps,
    recordReminderStatus
  } = useApp();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const upcomingApts = appointments.filter((a) => a.status === 'upcoming');
  const nextApt = upcomingApts[0];

  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const recentOrder = orders[0];

  const todayKey = new Date().toISOString().split('T')[0];
  const dueReminders = reminders.filter((r) => r.statusHistory[todayKey] !== 'taken');

  // Care Journey progress calculation
  const completedStages = careJourneySteps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedStages / careJourneySteps.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-navy-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Patient Dashboard</span>
              <span>•</span>
              <span className="text-teal-200">{currentDate}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {activeProfile.name}!
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl">
              Viewing personal healthcare records and family profile for <strong className="text-white">{activeProfile.name}</strong> ({activeProfile.relation}).
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/book-appointment"
              className="py-2.5 px-4 rounded-xl bg-emerald-500 text-navy-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <Link
              to="/medicines"
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20 flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Store</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          to="/appointments"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg hover:border-teal-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Appointments</span>
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-navy-950">{upcomingApts.length}</div>
          <p className="text-[11px] text-teal-700 font-semibold mt-1">
            {upcomingApts.length > 0 ? 'Upcoming active slot' : 'No upcoming slots'}
          </p>
        </Link>

        <Link
          to="/orders"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg hover:border-teal-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Orders</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-navy-950">{activeOrders.length}</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            {activeOrders.length > 0 ? 'In fulfillment transit' : 'All delivered'}
          </p>
        </Link>

        <Link
          to="/reminders"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg hover:border-teal-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Due Doses</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-navy-950">{dueReminders.length}</div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">
            {dueReminders.length > 0 ? 'Pending today' : 'All doses taken today'}
          </p>
        </Link>

        <Link
          to="/health-records"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg hover:border-teal-300 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Health Records</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-navy-950">{records.length}</div>
          <p className="text-[11px] text-blue-700 font-semibold mt-1">Securely archived</p>
        </Link>
      </div>

      {/* Quick Actions Ribbon */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 px-1">
          Quick Healthcare Actions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-semibold">
          <Link
            to="/book-appointment"
            className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-700 transition-colors flex flex-col items-center text-center gap-1.5"
          >
            <Calendar className="w-5 h-5 text-teal-600" />
            <span>Book Doctor</span>
          </Link>
          <Link
            to="/medicines"
            className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-700 transition-colors flex flex-col items-center text-center gap-1.5"
          >
            <ShoppingBag className="w-5 h-5 text-teal-600" />
            <span>Shop Pharmacy</span>
          </Link>
          <Link
            to="/prescriptions"
            className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-700 transition-colors flex flex-col items-center text-center gap-1.5"
          >
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span>Upload Rx</span>
          </Link>
          <Link
            to="/reminders"
            className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-700 transition-colors flex flex-col items-center text-center gap-1.5"
          >
            <Clock className="w-5 h-5 text-teal-600" />
            <span>Dose Alerts</span>
          </Link>
          <Link
            to="/health-records"
            className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-700 transition-colors flex flex-col items-center text-center gap-1.5"
          >
            <FileText className="w-5 h-5 text-teal-600" />
            <span>My Records</span>
          </Link>
          <Link
            to="/care-journey"
            className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-700 transition-colors flex flex-col items-center text-center gap-1.5"
          >
            <Compass className="w-5 h-5 text-teal-600" />
            <span>Care Journey</span>
          </Link>
        </div>
      </div>

      {/* Main Content Grid: Upcoming Appointment & Due Reminders (Left), Orders & Care Journey (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upcoming Appointment Spotlight */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Next Upcoming Appointment</span>
              </h2>
              <Link
                to="/appointments"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {nextApt ? (
              <div className="p-4 rounded-2xl bg-mint-50/50 border border-teal-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={nextApt.doctorImage}
                    alt={nextApt.doctorName}
                    className="w-14 h-14 rounded-2xl object-cover object-top ring-1 ring-teal-500/30 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-navy-950">{nextApt.doctorName}</h3>
                    <p className="text-xs font-semibold text-teal-700">{nextApt.doctorSpeciality}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                      <span className="font-bold text-slate-900">{nextApt.date}</span>
                      <span>at</span>
                      <span className="font-bold text-slate-900">{nextApt.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded capitalize">
                    {nextApt.consultationMode === 'in-person' ? (
                      <>
                        <Building className="w-3 h-3" /> Clinic Visit
                      </>
                    ) : (
                      <>
                        <Video className="w-3 h-3" /> Online Call
                      </>
                    )}
                  </span>
                  <Link
                    to="/appointments"
                    className="text-xs font-bold text-teal-700 hover:underline pt-1 text-right"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-500 space-y-2">
                <p>No upcoming appointments booked right now.</p>
                <Link
                  to="/doctors"
                  className="px-3.5 py-1.5 rounded-xl bg-teal-700 text-white font-bold inline-block"
                >
                  Book with a Doctor
                </Link>
              </div>
            )}
          </div>

          {/* Today's Medicine Reminders */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Medicine Reminders Due Today</span>
              </h2>
              <Link
                to="/reminders"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
              >
                <span>Manage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {reminders.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No medicine reminders configured.</p>
            ) : (
              <div className="space-y-3">
                {reminders.slice(0, 3).map((r) => {
                  const isTaken = r.statusHistory[todayKey] === 'taken';
                  return (
                    <div
                      key={r.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{r.medicineName}</span>
                          <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                            {r.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{r.schedule}</p>
                      </div>

                      {isTaken ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 px-2 py-1 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Taken
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => recordReminderStatus(r.id, todayKey, 'taken')}
                          className="px-3 py-1 rounded-lg bg-teal-700 text-white font-bold hover:bg-teal-800 transition-colors shadow-xs"
                        >
                          Mark Taken
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Care Journey Progress Widget */}
          <div className="bg-gradient-to-br from-teal-900 to-navy-950 text-white rounded-3xl p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Care Journey Progress</span>
              </span>
              <span className="text-xs font-black">{progressPercent}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <p className="text-xs text-teal-100/90 leading-relaxed">
              {completedStages} of {careJourneySteps.length} stages completed for your continuum of care.
            </p>

            <Link
              to="/care-journey"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 text-navy-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
            >
              <span>Open Care Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Recent Medicine Orders Widget */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-teal-600" />
                <span>Recent Order</span>
              </h2>
              <Link
                to="/orders"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
              >
                <span>All Orders</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrder ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-teal-800">{recentOrder.orderNumber}</span>
                  <span className="capitalize font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {recentOrder.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="text-slate-500">
                  {recentOrder.items.length} items • Total: <strong className="text-slate-800">₹{recentOrder.total}</strong>
                </div>
                <Link
                  to={`/orders/${recentOrder.id}`}
                  className="text-xs font-bold text-teal-700 hover:underline block pt-1"
                >
                  Track Delivery Timeline →
                </Link>
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3 text-center">No orders placed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
