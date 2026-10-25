import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import {
  ShoppingBag,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, reorder } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const navigate = useNavigate();

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return order.status !== 'delivered';
    return order.status === filterStatus;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'dispatched':
      case 'out_for_delivery':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  const handleReorder = (order: Order) => {
    reorder(order);
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            My Medicine Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track fulfillment progress, view invoices, and easily reorder regular healthcare products.
          </p>
        </div>
        <Link
          to="/medicines"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-sm self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shop Medicines</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs sm:text-sm font-bold overflow-x-auto">
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'active', label: 'Active Transit' },
          { id: 'delivered', label: 'Delivered' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`pb-3 px-1 transition-colors relative whitespace-nowrap ${
              filterStatus === tab.id
                ? 'text-teal-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {filterStatus === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">No orders found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don't have any orders matching the selected filter.
          </p>
          <Link
            to="/medicines"
            className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors inline-block mt-2"
          >
            Visit Medicine Store
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft transition-all p-5 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-xs text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {order.orderNumber}
                  </span>
                  <span className="text-xs text-slate-400">Placed on {order.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm font-black text-navy-950">₹{order.total}</span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-500">
                  Deliver to: <strong className="text-slate-800">{order.address.fullName}</strong>, {order.address.city}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleReorder(order)}
                    className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>

                  <Link
                    to={`/orders/${order.id}`}
                    className="py-1.5 px-3.5 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <span>Track Order</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
