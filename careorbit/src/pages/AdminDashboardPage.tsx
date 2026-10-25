import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus, AppointmentStatus, Prescription } from '../types';
import {
  Settings,
  Calendar,
  ShoppingBag,
  FileCheck2,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    appointments,
    orders,
    prescriptions,
    medicines,
    doctors,
    updateAppointmentStatus,
    updateOrderStatus,
    updatePrescriptionStatus,
    updateMedicineStock,
    toggleDoctorAvailability,
    resetDemoData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'orders' | 'prescriptions' | 'inventory' | 'doctors'>('appointments');

  const pendingRxCount = prescriptions.filter((p) => p.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Admin Notice Header */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white relative shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Settings className="w-3.5 h-3.5" />
            <span>CareOrbit Demo Admin Panel</span>
            <span>•</span>
            <span className="text-teal-200">Admin: Neha Deshmukh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simulation Control Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Manage simulated doctor availability, advance delivery logistics, verify prescription queues, and update pharmacy inventory in shared application state.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Appointments</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-navy-950">{appointments.length}</div>
          <p className="text-[11px] text-teal-700 font-semibold mt-1">Total in state</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Active Orders</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-navy-950">{orders.length}</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Trackable deliveries</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Prescription Queue</span>
            <FileCheck2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-navy-950">{pendingRxCount}</div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">Pending review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Store Products</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-navy-950">{medicines.length}</div>
          <p className="text-[11px] text-blue-700 font-semibold mt-1">Catalog items</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
        {[
          { id: 'appointments', label: 'Appointments' },
          { id: 'orders', label: 'Medicine Orders' },
          { id: 'prescriptions', label: `Prescription Queue (${pendingRxCount})` },
          { id: 'inventory', label: 'Medicine Inventory' },
          { id: 'doctors', label: 'Doctor Availability' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-1 transition-colors relative whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-teal-700 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* 1. APPOINTMENTS MANAGEMENT TABLE */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-950">Appointments Roster</h2>
            <span className="text-xs text-slate-500">Update simulated status</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Reference</th>
                  <th className="p-3.5">Doctor</th>
                  <th className="p-3.5">Patient</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5 text-right">Simulated Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 pl-5 font-mono font-bold text-teal-800">{apt.referenceNumber}</td>
                    <td className="p-3.5 font-bold text-slate-900">{apt.doctorName}</td>
                    <td className="p-3.5 text-slate-600">{apt.patientName}</td>
                    <td className="p-3.5 text-slate-600">{apt.date} • {apt.time}</td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          apt.status === 'upcoming'
                            ? 'bg-emerald-100 text-emerald-800'
                            : apt.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <select
                        value={apt.status}
                        onChange={(e) =>
                          updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)
                        }
                        className="py-1 px-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. ORDERS MANAGEMENT TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-950">Medicine Fulfillment Table</h2>
            <span className="text-xs text-slate-500">Advance simulated tracking</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Order #</th>
                  <th className="p-3.5">Customer & City</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Current Stage</th>
                  <th className="p-3.5 pr-5 text-right">Advance Tracking Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 pl-5 font-mono font-bold text-teal-800">{ord.orderNumber}</td>
                    <td className="p-3.5 text-slate-900 font-bold">{ord.address.fullName} ({ord.address.city})</td>
                    <td className="p-3.5 text-slate-600">{ord.items.length} products</td>
                    <td className="p-3.5 font-bold text-slate-900">₹{ord.total}</td>
                    <td className="p-3.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-teal-50 text-teal-800 border border-teal-200">
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="py-1 px-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                      >
                        <option value="placed">Placed</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PRESCRIPTION VERIFICATION QUEUE */}
      {activeTab === 'prescriptions' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-navy-950">Prescription Verification Queue</h2>
            <span className="text-xs text-slate-500">Approve or reject doctor prescriptions</span>
          </div>

          <div className="space-y-3">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-4 rounded-2xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{rx.fileName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                        rx.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rx.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {rx.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Patient: {rx.patientName} • Uploaded: {rx.uploadDate} • Doctor: {rx.doctorName || 'General Practitioner'}
                  </p>
                  {rx.reviewNotes && (
                    <p className="text-[11px] text-teal-800 font-medium mt-1">Note: {rx.reviewNotes}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updatePrescriptionStatus(rx.id, 'approved', 'Verified and stamped by pharmacist')}
                    className="py-1.5 px-3 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors shadow-xs"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePrescriptionStatus(rx.id, 'rejected', 'Image illegible or missing doctor seal')}
                    className="py-1.5 px-3 rounded-lg border border-rose-200 text-rose-700 font-bold hover:bg-rose-50 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MEDICINE INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-950">Medicine Stock Management</h2>
            <span className="text-xs text-slate-500">Live inventory modification</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-5">Product Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock Count</th>
                  <th className="p-3.5 pr-5 text-right">Quick Stock Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {medicines.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 pl-5 font-bold text-slate-900">{med.name}</td>
                    <td className="p-3.5 text-slate-500">{med.category}</td>
                    <td className="p-3.5 font-bold text-slate-900">₹{med.price}</td>
                    <td className="p-3.5">
                      <span
                        className={`font-bold ${
                          med.stockCount <= 5 ? 'text-rose-600' : 'text-emerald-700'
                        }`}
                      >
                        {med.stockCount} in stock
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateMedicineStock(med.id, Math.max(0, med.stockCount - 10))}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                        >
                          -10
                        </button>
                        <button
                          type="button"
                          onClick={() => updateMedicineStock(med.id, med.stockCount + 10)}
                          className="px-2 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold"
                        >
                          +10
                        </button>
                        <button
                          type="button"
                          onClick={() => updateMedicineStock(med.id, med.stockCount === 0 ? 50 : 0)}
                          className={`px-2 py-1 rounded font-bold ${
                            med.stockCount === 0
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {med.stockCount === 0 ? 'Restock (50)' : 'Set 0 (OOS)'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. DOCTOR AVAILABILITY MANAGEMENT */}
      {activeTab === 'doctors' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-navy-950">Clinician Clinic Roster & Availability</h2>
            <span className="text-xs text-slate-500">Toggle immediate "Available Today" status</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl border border-slate-200 text-xs flex items-center justify-between gap-3 bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-11 h-11 rounded-xl object-cover object-top shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-teal-700 font-semibold">{doc.speciality}</p>
                    <p className="text-[10px] text-slate-400">{doc.clinicName}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleDoctorAvailability(doc.id)}
                  className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                    doc.isAvailableToday
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {doc.isAvailableToday ? 'Available' : 'Off-duty'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
