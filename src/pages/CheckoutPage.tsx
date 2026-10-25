import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DeliveryAddress } from '../types';
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Truck,
  Plus,
  ShieldAlert
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    placeOrder,
    activeProfile,
    prescriptions
  } = useApp();

  const navigate = useNavigate();

  // Saved demo addresses
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([
    {
      fullName: activeProfile.name,
      phone: activeProfile.phone,
      street: 'Flat 402, Green Meadows, Madhapur',
      landmark: 'Near Cyber Towers',
      city: 'Hyderabad',
      pincode: '500081',
      type: 'Home'
    },
    {
      fullName: activeProfile.name,
      phone: activeProfile.phone,
      street: 'Plot 18, Phase 2, Hitec City',
      landmark: 'Behind Tech Park',
      city: 'Hyderabad',
      pincode: '500081',
      type: 'Work'
    }
  ]);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code (Simulated)');
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New address form state
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newCity, setNewCity] = useState('Hyderabad');
  const [newPincode, setNewPincode] = useState('500081');
  const [newType, setNewType] = useState<'Home' | 'Work' | 'Other'>('Home');

  const hasRxItem = cart.some((i) => i.product.prescriptionRequired);
  const approvedRx = prescriptions.find((p) => p.status === 'approved');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newPincode) return;
    const added: DeliveryAddress = {
      fullName: activeProfile.name,
      phone: activeProfile.phone,
      street: newStreet,
      landmark: newLandmark,
      city: newCity,
      pincode: newPincode,
      type: newType
    };
    setAddresses((prev) => [...prev, added]);
    setSelectedAddressIndex(addresses.length);
    setShowNewAddressModal(false);
    setNewStreet('');
    setNewLandmark('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const address = addresses[selectedAddressIndex];
    if (!address) {
      setErrorMessage('Please select or add a delivery address.');
      return;
    }

    if (hasRxItem && !approvedRx) {
      setErrorMessage(
        'Your order includes prescription medicines. Please upload and verify your doctor prescription first.'
      );
      return;
    }

    const result = placeOrder(address, paymentMethod, approvedRx?.id);

    if ('error' in result) {
      setErrorMessage(result.error);
    } else {
      navigate(`/orders/${result.id}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-950">No Items to Checkout</h2>
        <p className="text-xs text-slate-500">Your cart is currently empty.</p>
        <Link
          to="/medicines"
          className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold inline-block"
        >
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
          Delivery Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Provide your delivery details and choose a simulated payment option.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Address & Payment */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Delivery Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>1. Select Delivery Address</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowNewAddressModal(true)}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((addr, idx) => {
                const isSelected = selectedAddressIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedAddressIndex(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all text-xs space-y-1 relative ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{addr.fullName}</span>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {addr.type}
                      </span>
                    </div>
                    <p className="text-slate-600 pt-1">{addr.street}</p>
                    {addr.landmark && <p className="text-slate-400">{addr.landmark}</p>}
                    <p className="text-slate-500 font-medium">
                      {addr.city} - {addr.pincode}
                    </p>
                    <p className="text-slate-500 pt-1">{addr.phone}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Prescription Review Verification */}
          {hasRxItem && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>2. Prescription Verification</span>
              </h2>

              {approvedRx ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold">Linked: {approvedRx.fileName}</p>
                      <p className="text-[11px] text-emerald-700">Verified by demo pharmacist</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Approved
                  </span>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>No Approved Prescription Found</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Some items in your cart require a verified prescription before dispensing.
                  </p>
                  <Link
                    to="/prescriptions"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 underline"
                  >
                    Go to Prescription Desk to Upload
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 3. Payment Method Selection (Simulated) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-navy-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-4 h-4 text-teal-600" />
              <span>3. Payment Method (Simulated Demo)</span>
            </h2>

            <div className="space-y-2 text-xs">
              {[
                { id: 'upi', name: 'UPI / QR Code (Google Pay, PhonePe, Paytm)', desc: 'Instant demo clearance' },
                { id: 'card', name: 'Credit or Debit Card', desc: 'Visa, Mastercard, RuPay' },
                { id: 'netbanking', name: 'Net Banking', desc: 'All Indian major banks supported in demo' },
                { id: 'cod', name: 'Pay on Delivery', desc: 'Cash or QR scan at doorstep' }
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === opt.name
                      ? 'border-teal-600 bg-teal-50/60'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.name}
                    checked={paymentMethod === opt.name}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-0.5 text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">{opt.name}</span>
                    <span className="text-[11px] text-slate-500">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>This is a prototype checkout. No financial charges will be made.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Demo Order CTA */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-navy-950 border-b border-slate-100 pb-3">
            Review Items ({cart.length})
          </h2>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between text-xs py-1 border-b border-slate-50">
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-900 whitespace-nowrap">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              {cartDeliveryFee === 0 ? (
                <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
              ) : (
                <span className="font-semibold text-slate-900">₹{cartDeliveryFee}</span>
              )}
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Savings</span>
                <span>-₹{cartDiscount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-sm">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl font-black text-navy-950">₹{cartTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-4 rounded-xl bg-teal-700 text-white font-extrabold text-sm hover:bg-teal-800 transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span>Place Demo Order (₹{cartTotal})</span>
          </button>
        </div>
      </form>

      {/* Add Address Modal */}
      {showNewAddressModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-navy-950">Add Delivery Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="Flat/House No., Building, Street"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={newLandmark}
                  onChange={(e) => setNewLandmark(e.target.value)}
                  placeholder="Near Metro Station, School, etc."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewAddressModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-700 font-bold text-white hover:bg-teal-800"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
