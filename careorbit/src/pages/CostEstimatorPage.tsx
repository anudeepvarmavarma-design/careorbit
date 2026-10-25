import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  Stethoscope,
  ShoppingBag,
  Truck,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const CostEstimatorPage: React.FC = () => {
  const { doctors, medicines } = useApp();

  const [budget, setBudget] = useState<number>(2000);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || '');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    medicines[0]?.id || '',
    medicines[1]?.id || ''
  ]);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);
  const doctorFee = selectedDoctor ? selectedDoctor.fee : 0;

  const chosenProducts = medicines.filter((m) => selectedProductIds.includes(m.id));
  const productSubtotal = chosenProducts.reduce((acc, curr) => acc + curr.price, 0);

  const deliveryFee = productSubtotal > 0 ? (productSubtotal >= 500 ? 0 : 40) : 0;
  const estimatedTotal = doctorFee + productSubtotal + deliveryFee;

  const difference = budget - estimatedTotal;
  const isWithinBudget = difference >= 0;

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Healthcare Affordability Calculator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Healthcare Cost Estimator
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Estimate consultation fees, necessary medicines, and delivery charges against your monthly healthcare budget with clear arithmetic.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Configuration (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Budget Input */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Monthly Healthcare Budget (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Select Doctor Consultation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. Select Doctor Consultation
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {doctors.map((doc) => {
                const isSelected = selectedDoctorId === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(isSelected ? '' : doc.id)}
                    className={`p-3 rounded-2xl border cursor-pointer text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-10 h-10 rounded-xl object-cover object-top"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{doc.name}</p>
                        <p className="text-[11px] text-teal-700">{doc.speciality}</p>
                      </div>
                    </div>
                    <span className="font-black text-navy-950 text-sm">₹{doc.fee}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Select Medicines */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              3. Select Necessary Medicines & Products
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {medicines.map((med) => {
                const isSelected = selectedProductIds.includes(med.id);
                return (
                  <div
                    key={med.id}
                    onClick={() => toggleProduct(med.id)}
                    className={`p-3 rounded-2xl border cursor-pointer text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{med.name}</p>
                        <p className="text-[10px] text-slate-400">{med.packSize}</p>
                      </div>
                    </div>
                    <span className="font-black text-navy-950 text-sm whitespace-nowrap">
                      ₹{med.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculation & Budget Feedback Card (Right 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft space-y-5 sticky top-24">
          <h2 className="text-base font-bold text-navy-950 border-b border-slate-100 pb-3">
            Affordability Summary
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Your Budget:</span>
              <span className="font-black text-slate-900 text-sm">₹{budget}</span>
            </div>

            <div className="flex justify-between">
              <span>Doctor Consultation:</span>
              <span className="font-semibold text-slate-900">₹{doctorFee}</span>
            </div>

            <div className="flex justify-between">
              <span>Medicines ({chosenProducts.length} items):</span>
              <span className="font-semibold text-slate-900">₹{productSubtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              {deliveryFee === 0 ? (
                <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
              ) : (
                <span className="font-semibold text-slate-900">₹{deliveryFee}</span>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
              <span className="font-bold text-slate-900">Estimated Total:</span>
              <span className="text-2xl font-black text-navy-950">₹{estimatedTotal}</span>
            </div>
          </div>

          {/* Budget Health Outcome */}
          <div
            className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
              isWithinBudget
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isWithinBudget ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600" />
              )}
              <span>{isWithinBudget ? 'Within Budget' : 'Exceeds Budget'}</span>
            </div>
            <p className="leading-relaxed">
              {isWithinBudget
                ? `You have ₹${difference} remaining from your allocated monthly healthcare budget.`
                : `This selection exceeds your budget by ₹${Math.abs(difference)}.`}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2">
            {selectedDoctor && (
              <Link
                to={`/book-appointment?doctorId=${selectedDoctor.id}`}
                className="w-full py-3 px-4 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Book {selectedDoctor.name}</span>
              </Link>
            )}

            <Link
              to="/medicines"
              className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Products in Store</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
