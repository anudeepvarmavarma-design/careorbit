import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  ShieldAlert,
  CheckCircle2,
  Package,
  Info,
  Truck,
  RotateCcw
} from 'lucide-react';

export const MedicineDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMedicineById, addToCart } = useApp();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const medicine = getMedicineById(id || '');

  if (!medicine) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-950">Medicine Product Not Found</h2>
        <p className="text-sm text-slate-500">The healthcare item you requested is not listed in our catalog.</p>
        <Link
          to="/medicines"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Medicine Store</span>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
  };

  const handleBuyNow = () => {
    addToCart(medicine, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <Link
        to="/medicines"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-soft grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image */}
        <div className="md:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center relative">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-72 sm:h-80 object-cover rounded-xl"
          />
          {medicine.prescriptionRequired && (
            <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
              Prescription Required
            </span>
          )}
        </div>

        {/* Right Column: Details & Add to Cart */}
        <div className="md:col-span-7 space-y-5">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
              {medicine.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
              {medicine.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manufactured by <strong className="text-slate-800">{medicine.brand}</strong> • {medicine.dosageForm}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{medicine.packSize}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-navy-950">₹{medicine.price}</span>
            {medicine.originalPrice > medicine.price && (
              <>
                <span className="text-sm text-slate-400 line-through">₹{medicine.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ₹{medicine.originalPrice - medicine.price}
                </span>
              </>
            )}
          </div>

          {/* Stock & Prescription Warning */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={`w-2 h-2 rounded-full ${medicine.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span className={medicine.inStock ? 'text-emerald-700' : 'text-rose-700'}>
                {medicine.inStock ? `In Stock (${medicine.stockCount} available)` : 'Currently Out of Stock'}
              </span>
            </div>

            {medicine.prescriptionRequired && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Prescription Verification Mandatory</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  A valid prescription from a registered medical practitioner is required. You can attach your prescription at checkout.
                </p>
              </div>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!medicine.inStock}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                medicine.inStock
                  ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-md'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart (₹{medicine.price * quantity})</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!medicine.inStock}
              className="py-3 px-5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery & Trust highlights */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Doorstep Delivery in 24-48 hrs</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Simulated Pharmacy Protocol</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Usage Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <span>Product Description</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {medicine.description}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
            <Package className="w-4 h-4 text-teal-600" />
            <span>Usage and Administration</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {medicine.usageInfo}
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500">
            Always consult a licensed medical clinician before taking new medications or modifying existing dosages.
          </div>
        </div>
      </div>
    </div>
  );
};
