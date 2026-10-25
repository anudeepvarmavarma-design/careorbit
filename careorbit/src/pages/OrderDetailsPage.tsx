import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  RotateCcw,
  Compass,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, reorder } = useApp();
  const navigate = useNavigate();

  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-950">Order Not Found</h2>
        <p className="text-sm text-slate-500">The order reference was not found in the demo records.</p>
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
      </div>
    );
  }

  const timelineSteps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'placed', label: 'Order Placed', desc: 'Order verified and registered' },
    { status: 'processing', label: 'Processing', desc: 'Packed and sealed by pharmacy' },
    { status: 'dispatched', label: 'Dispatched', desc: 'Handed over for regional transit' },
    { status: 'out_for_delivery', label: 'Out for Delivery', desc: 'Courier en route to address' },
    { status: 'delivered', label: 'Delivered', desc: 'Package handed over safely' }
  ];

  const currentStepIndex = timelineSteps.findIndex((s) => s.status === order.status);

  const handleReorder = () => {
    reorder(order);
    navigate('/cart');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Orders</span>
      </Link>

      {/* Header Info */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            Order Tracking
          </span>
          <h1 className="text-2xl font-black text-navy-950 mt-1">
            {order.orderNumber}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Placed on {order.date}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReorder}
            className="py-2 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reorder</span>
          </button>
          <Link
            to="/care-journey"
            className="py-2 px-3.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Care Journey</span>
          </Link>
        </div>
      </div>

      {/* Visual Tracking Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft space-y-6">
        <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
          <Truck className="w-5 h-5 text-teal-600" />
          <span>Fulfillment Status</span>
        </h2>

        {/* Timeline Bar */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2">
            {timelineSteps.map((step, idx) => {
              const isPassed = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.status} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 relative">
                  {/* Step Circle */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                      isCurrent
                        ? 'bg-teal-700 text-white ring-4 ring-teal-100 shadow-md scale-110'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  {/* Label */}
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-teal-800 font-extrabold'
                          : isPassed
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-500 hidden sm:block mt-0.5 leading-tight">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Event Logs */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
          <h3 className="font-bold text-slate-700">Detailed Status History:</h3>
          <div className="space-y-1.5">
            {order.statusHistory.map((history, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <div>
                  <span className="font-semibold text-slate-900 capitalize">
                    {history.status.replace(/_/g, ' ')}:
                  </span>{' '}
                  <span>{history.description}</span>{' '}
                  <span className="text-[10px] text-slate-400">({history.timestamp})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ordered Items & Address Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Items List */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-navy-950 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Package className="w-4 h-4 text-teal-600" />
            <span>Ordered Items ({order.items.length})</span>
          </h2>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-2 border-b border-slate-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <Link
                      to={`/medicines/${item.product.id}`}
                      className="font-bold text-slate-900 hover:text-teal-700 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-slate-900">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-slate-900">₹{order.deliveryFee}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount:</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex justify-between text-sm">
              <span className="font-bold text-slate-900">Total Paid:</span>
              <span className="font-black text-navy-950 text-base">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address & Payment */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-3">
            <h2 className="text-base font-bold text-navy-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Delivery Address</span>
            </h2>

            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-900">{order.address.fullName}</p>
              <p className="text-slate-600">{order.address.street}</p>
              {order.address.landmark && <p className="text-slate-400">{order.address.landmark}</p>}
              <p className="text-slate-600">
                {order.address.city} - {order.address.pincode}
              </p>
              <p className="text-slate-500 pt-1">Phone: {order.address.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-2 text-xs">
            <h3 className="font-bold text-navy-950 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-teal-600" />
              <span>Payment Mode</span>
            </h3>
            <p className="text-slate-600">{order.paymentMethod}</p>
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-[11px] font-medium flex items-center gap-1.5 mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demo Transaction Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
