import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Prescription } from '../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ShoppingBag,
  Trash2,
  Eye,
  X
} from 'lucide-react';

export const PrescriptionsPage: React.FC = () => {
  const { prescriptions, uploadPrescription, activeProfile } = useApp();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [doctorNameInput, setDoctorNameInput] = useState('');
  const [viewingRx, setViewingRx] = useState<Prescription | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const sizeFormatted = `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`;
    uploadPrescription(selectedFile.name, sizeFormatted, doctorNameInput);

    setSelectedFile(null);
    setDoctorNameInput('');
  };

  const getStatusBadge = (status: Prescription['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved for Dispensing
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Verification in Queue
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Verification Declined
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Prescription Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Prescription Management & Verification
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Attach official prescriptions from your doctor to enable verified dispensing of regulated medications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Prescription Card (Left) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
              <Upload className="w-4 h-4 text-teal-600" />
              <span>Upload New Prescription</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Uploading for: <strong className="text-slate-800">{activeProfile.name}</strong>
            </p>
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Prescribing Doctor Name (Optional)
              </label>
              <input
                type="text"
                value={doctorNameInput}
                onChange={(e) => setDoctorNameInput(e.target.value)}
                placeholder="e.g. Dr. Ananya Reddy"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs"
              />
            </div>

            {/* Drag & drop / file selector */}
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Prescription Document (PDF, JPG, PNG)
              </label>
              <div className="border-2 border-dashed border-teal-200/80 hover:border-teal-400 bg-mint-50/30 rounded-2xl p-6 text-center transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <FileText className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="font-bold text-slate-800">
                  Click to select file or drag & drop
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supported formats: PDF, PNG, JPG (Max 15MB)
                </p>
              </div>
            </div>

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-teal-950 truncate">{selectedFile.name}</p>
                    <p className="text-[10px] text-teal-700">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedFile}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                selectedFile
                  ? 'bg-teal-700 text-white hover:bg-teal-800'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Submit for Verification</span>
            </button>
          </form>

          {/* Prototype Notice */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed space-y-1">
            <p className="font-semibold text-slate-700">Simulated Clinical Protocol Notice:</p>
            <p>
              Uploaded documents are kept in temporary demonstration memory. In production, prescriptions undergo clinical pharmacist verification before dispensing.
            </p>
          </div>
        </div>

        {/* Prescription List (Right) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600" />
              <span>Prescription Records ({prescriptions.length})</span>
            </h2>
            <Link
              to="/admin"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md"
            >
              Demo Admin Queue
            </Link>
          </div>

          <div className="space-y-4">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-4 rounded-2xl border border-slate-200/80 hover:border-teal-200 transition-all space-y-3 bg-slate-50/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white text-teal-700 shadow-xs border border-slate-100">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-navy-950">{rx.fileName}</h3>
                      <p className="text-[11px] text-slate-500">
                        {rx.patientName} • {rx.fileSize} • Uploaded {rx.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div>{getStatusBadge(rx.status)}</div>
                </div>

                {rx.doctorName && (
                  <p className="text-xs text-slate-600">
                    Prescribed by: <strong className="text-slate-800">{rx.doctorName}</strong>
                  </p>
                )}

                {rx.reviewNotes && (
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Pharmacist Notes: </span>
                    <span>{rx.reviewNotes}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setViewingRx(rx)}
                    className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Document Details</span>
                  </button>

                  {rx.status === 'approved' && (
                    <Link
                      to="/medicines?category=Prescription-Required Products"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Order Prescribed Medicines</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {viewingRx && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-navy-950">Prescription Details</h3>
              <button
                onClick={() => setViewingRx(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">File Name:</span>
                <span className="font-bold text-slate-900">{viewingRx.fileName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{viewingRx.patientName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Physician:</span>
                <span className="font-bold text-slate-900">{viewingRx.doctorName || 'Consulting Doctor'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Upload Date:</span>
                <span className="font-bold text-slate-900">{viewingRx.uploadDate}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Verification Status:</span>
                <span className="font-bold capitalize">{viewingRx.status}</span>
              </div>

              {viewingRx.eligibleMedicines && viewingRx.eligibleMedicines.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="font-bold text-slate-700">Linked Approved Medicines:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {viewingRx.eligibleMedicines.map((m, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-50 text-teal-800 text-[11px] font-semibold px-2 py-0.5 rounded border border-teal-200"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewingRx(null)}
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
