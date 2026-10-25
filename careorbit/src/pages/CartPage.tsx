import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  Tag,
  CheckCircle2
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    prescriptions
  } = useApp();

  const navigate = useNavigate();

  const hasRxItem = cart.some((item) => item.product.prescriptionRequired);
  const hasApprovedRx = prescriptions.some((p) => p.status === 'approved');

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-navy-950">Your Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Explore our wide range of trusted healthcare products, over-the-counter essentials, and daily wellness items.
        </p>
        <div className="pt-2">
          <Link
            to="/medicines"
            className="px-6 py-3 rounded-xl bg-teal-700 text-white font-bold text-xs sm:text-sm hover:bg-teal-800 transition-colors inline-block shadow-sm"
          >
            Start Shopping Medicines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Shopping Cart ({cart.length} items)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review your healthcare essentials before proceeding to delivery checkout.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      {/* Prescription Notice if Rx Item exists */}
      {hasRxItem && (
        <div
          className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            hasApprovedRx
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {hasApprovedRx ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <div>
              <p className="font-bold">
                {hasApprovedRx
                  ? 'Prescription Verified for this order'
                  : 'Prescription-Required Items in Cart'}
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {hasApprovedRx
                  ? 'Your active verified prescription will be linked during checkout.'
                  : 'Please upload your doctor prescription before finalizing simulated dispensing.'}
              </p>
            </div>
          </div>
          {!hasApprovedRx && (
            <Link
              to="/prescriptions"
              className="px-3.5 py-1.5 rounded-xl bg-amber-700 text-white font-bold text-xs hover:bg-amber-800 transition-colors shrink-0"
            >
              Upload Prescription
            </Link>
          )}
        </div>
      )}

      {/* Main Grid: Cart Items Left, Order Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-navy-950 hover:text-teal-700 transition-colors">
                      <Link to={`/medicines/${item.product.id}`}>{item.product.name}</Link>
                    </h3>
                    {item.product.prescriptionRequired && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                        Rx
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{item.product.packSize}</p>
                  <p className="text-xs font-black text-navy-950 mt-1">₹{item.product.price} each</p>
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="text-sm font-black text-navy-950">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/medicines"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-navy-950 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Cart Subtotal</span>
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

            {cartSubtotal < 500 && (
              <p className="text-[10px] text-teal-700 italic">
                Add items worth ₹{500 - cartSubtotal} more for free delivery.
              </p>
            )}

            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Volume Savings (10%)</span>
                </span>
                <span>-₹{cartDiscount}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-sm">
              <span className="font-bold text-slate-900">Total Payable</span>
              <span className="text-xl font-black text-navy-950">₹{cartTotal}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-teal-700 text-white font-bold text-xs sm:text-sm hover:bg-teal-800 transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            Simulated checkout • No actual monetary transaction takes place.
          </p>
        </div>
      </div>
    </div>
  );
};
