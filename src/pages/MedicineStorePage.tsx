import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCategory, Medicine } from '../types';
import {
  Search,
  Filter,
  ShoppingBag,
  Plus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const MedicineStorePage: React.FC = () => {
  const { medicines, addToCart, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [sortBy, setSortBy] = useState<string>('popular'); // 'popular' | 'price_asc' | 'price_desc' | 'name'
  const [filterPrescriptionOnly, setFilterPrescriptionOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'OTC Healthcare Essentials',
    'First Aid',
    'Personal Care',
    'Wellness Products',
    'Prescription-Required Products'
  ];

  const filteredMedicines = useMemo(() => {
    return medicines
      .filter((med) => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = med.name.toLowerCase().includes(q);
          const matchGeneric = med.genericName.toLowerCase().includes(q);
          const matchBrand = med.brand.toLowerCase().includes(q);
          const matchCat = med.category.toLowerCase().includes(q);
          if (!matchName && !matchGeneric && !matchBrand && !matchCat) return false;
        }

        // Category
        if (selectedCategory !== 'All' && med.category !== selectedCategory) {
          return false;
        }

        // Prescription only toggle
        if (filterPrescriptionOnly && !med.prescriptionRequired) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // Popular default
      });
  }, [medicines, searchQuery, selectedCategory, filterPrescriptionOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFilterPrescriptionOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Store Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CareOrbit Pharmacy Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Order Medicines and Healthcare Products
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Browse genuine over-the-counter essentials, emergency first aid, daily wellness supplements, and prescription-dispensed drugs.
          </p>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines, vitamins, bandages..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Categories</span>
          </button>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="popular">Popular Essentials</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Layout: Category Sidebar + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Categories Sidebar */}
        <aside
          className={`md:col-span-4 lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 ${
            showMobileFilters ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>Categories</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Rx Filter Checkbox */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={filterPrescriptionOnly}
                onChange={(e) => setFilterPrescriptionOnly(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span>Prescription-Required Only</span>
            </label>
          </div>

          {/* Prescription Help Box */}
          <div className="p-4 rounded-xl bg-mint-50 border border-teal-100 text-xs space-y-2">
            <div className="font-bold text-teal-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-teal-700" />
              <span>Have a Prescription?</span>
            </div>
            <p className="text-[11px] text-teal-800 leading-relaxed">
              Upload your doctor's consultation prescription at our digital desk for simulated verification.
            </p>
            <Link
              to="/prescriptions"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-900 pt-1"
            >
              <span>Upload Prescription</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="md:col-span-8 lg:col-span-9 space-y-4">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>
              Showing <strong className="text-navy-950">{filteredMedicines.length}</strong> products
            </span>
            <span className="text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md text-[11px] font-semibold">
              Fast Doorstep Delivery
            </span>
          </div>

          {filteredMedicines.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-950">No products match your search</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for alternate generic names or switch to another category.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMedicines.map((med) => (
                <div
                  key={med.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-soft-lg transition-all p-4 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center">
                      <img
                        src={med.image}
                        alt={med.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {med.prescriptionRequired && (
                        <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          Rx Required
                        </span>
                      )}
                      {!med.inStock && (
                        <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div>
                      <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                        {med.category}
                      </span>
                      <Link to={`/medicines/${med.id}`}>
                        <h2 className="text-sm font-bold text-navy-950 mt-1 line-clamp-1 hover:text-teal-700 transition-colors">
                          {med.name}
                        </h2>
                      </Link>
                      <p className="text-[11px] text-slate-500 font-medium">{med.brand} • {med.dosageForm}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{med.packSize}</p>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
                    <div>
                      <span className="text-base font-black text-navy-950">₹{med.price}</span>
                      {med.originalPrice > med.price && (
                        <span className="text-xs text-slate-400 line-through ml-1.5">
                          ₹{med.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/medicines/${med.id}`}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => addToCart(med)}
                        disabled={!med.inStock}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          med.inStock
                            ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-xs'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
