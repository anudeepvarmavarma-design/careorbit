import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HealthRecord, HealthRecordCategory } from '../types';
import {
  FileText,
  Search,
  Filter,
  Upload,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
  X,
  FileCheck
} from 'lucide-react';

export const HealthRecordsPage: React.FC = () => {
  const { records, addHealthRecord, deleteHealthRecord, activeProfile } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<HealthRecord | null>(null);

  // New record form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<HealthRecordCategory>('lab_report');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctorOrLab, setDoctorOrLab] = useState('');
  const [fileDetails, setFileDetails] = useState('PDF Document • 1.5 MB');
  const [notes, setNotes] = useState('');

  const categories: (HealthRecordCategory | 'All')[] = [
    'All',
    'lab_report',
    'prescription',
    'consultation_summary',
    'vaccination',
    'scan'
  ];

  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = rec.title.toLowerCase().includes(q);
          const matchLab = rec.doctorOrLab.toLowerCase().includes(q);
          const matchNotes = rec.notes?.toLowerCase().includes(q) || false;
          if (!matchTitle && !matchLab && !matchNotes) return false;
        }

        if (selectedCategory !== 'All' && rec.category !== selectedCategory) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records, searchQuery, selectedCategory]);

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !doctorOrLab) return;

    addHealthRecord({
      patientId: activeProfile.id,
      title,
      category,
      date,
      doctorOrLab,
      fileDetails,
      status: 'Verified',
      notes: notes || undefined
    });

    setShowUploadModal(false);
    setTitle('');
    setDoctorOrLab('');
    setNotes('');
  };

  const formatCategoryName = (cat: string) => {
    return cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Digital Health Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Centralized diagnostic reports, test summaries, and vaccination histories for <strong className="text-slate-800">{activeProfile.name}</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Record</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records, lab name, or test results..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'All Categories' : formatCategoryName(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Records Listing */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">No health records found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or upload a new medical report.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-soft transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {formatCategoryName(rec.category)}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-navy-950 line-clamp-1 group-hover:text-teal-700 transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{rec.doctorOrLab}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{rec.fileDetails}</p>
                </div>

                {rec.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                    {rec.notes}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{rec.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingRecord(rec)}
                    className="p-1 text-teal-700 hover:text-teal-900 font-bold"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteHealthRecord(rec.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-navy-950">Upload Health Record</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Document / Report Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Complete Blood Count (CBC), ECG Trace"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as HealthRecordCategory)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="lab_report">Lab Report</option>
                    <option value="prescription">Prescription</option>
                    <option value="consultation_summary">Consultation Summary</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="scan">Scan / Imaging</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Report Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Issuing Doctor / Diagnostic Lab
                </label>
                <input
                  type="text"
                  required
                  value={doctorOrLab}
                  onChange={(e) => setDoctorOrLab(e.target.value)}
                  placeholder="e.g. Vijaya Diagnostics, Dr. Ananya Reddy"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Key Findings / Clinical Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. All parameters within normal reference ranges"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-700 font-bold text-white hover:bg-teal-800"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD DETAILS MODAL */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-navy-950">Record Summary</h3>
              <button
                onClick={() => setViewingRecord(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Document Title:</span>
                <span className="font-bold text-slate-900">{viewingRecord.title}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Category:</span>
                <span className="font-bold capitalize">{formatCategoryName(viewingRecord.category)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Issued By:</span>
                <span className="font-bold text-slate-900">{viewingRecord.doctorOrLab}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Date:</span>
                <span className="font-bold text-slate-900">{viewingRecord.date}</span>
              </div>
              {viewingRecord.notes && (
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="font-bold text-slate-700">Clinical Summary:</span>
                  <p className="text-slate-600 leading-relaxed">{viewingRecord.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewingRecord(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
