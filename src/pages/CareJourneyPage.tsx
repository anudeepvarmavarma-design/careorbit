import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar,
  ShoppingBag,
  FileText,
  ShieldCheck,
  Stethoscope,
  Pill,
  Sparkles,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

export const CareJourneyPage: React.FC = () => {
  const { careJourneySteps, activeProfile, resetDemoData } = useApp();

  const completedCount = careJourneySteps.filter((s) => s.status === 'completed').length;
  const currentStep = careJourneySteps.find((s) => s.status === 'current') || careJourneySteps[0];
  const progressPercent = Math.round((completedCount / careJourneySteps.length) * 100);

  const getStageIcon = (key: string) => {
    switch (key) {
      case 'discover':
        return <Stethoscope className="w-5 h-5" />;
      case 'book':
        return <Calendar className="w-5 h-5" />;
      case 'prepare':
        return <FileText className="w-5 h-5" />;
      case 'details':
        return <Clock className="w-5 h-5" />;
      case 'prescription':
        return <ShieldCheck className="w-5 h-5" />;
      case 'browse_medicines':
        return <ShoppingBag className="w-5 h-5" />;
      case 'order_medicines':
        return <Pill className="w-5 h-5" />;
      case 'reminders':
        return <Clock className="w-5 h-5" />;
      case 'review_journey':
        return <Compass className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-navy-950 rounded-3xl p-6 sm:p-10 text-white shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Compass className="w-3.5 h-3.5" />
            <span>CareOrbit Signature Feature</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Connected Care Journey
          </h1>

          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            CareOrbit links every phase of healthcare into one intelligent continuum: from specialist discovery and consultations, to prescription validation, doorstep pharmacy delivery, and scheduled daily recovery.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-medium text-emerald-300">
            <span>Patient: <strong className="text-white">{activeProfile.name}</strong></span>
            <span>•</span>
            <span>Progress: <strong className="text-white">{completedCount} of 9 Stages Completed ({progressPercent}%)</strong></span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 max-w-xl bg-white/20 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-400 h-full rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Interactive 9-Stage Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-soft space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-navy-950">Patient Continuum Roadmap</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live synchronized steps based on your actual appointments, uploaded prescriptions, orders, and reminders.
            </p>
          </div>
          <button
            onClick={resetDemoData}
            className="text-xs font-semibold text-slate-400 hover:text-teal-700 flex items-center gap-1"
            title="Reset journey to initial sample state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo Journey</span>
          </button>
        </div>

        {/* Vertical Timeline on mobile / responsive stepped tree */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 sm:before:left-6 before:w-0.5 before:bg-slate-200">
          {careJourneySteps.map((step) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isPending = step.status === 'pending';

            return (
              <div
                key={step.id}
                className={`relative flex items-start gap-4 sm:gap-6 group transition-all ${
                  isCurrent ? 'scale-[1.01]' : ''
                }`}
              >
                {/* Stage Marker Badge */}
                <div
                  className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isCurrent
                      ? 'bg-teal-700 text-white ring-4 ring-teal-100 shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    getStageIcon(step.key)
                  )}
                </div>

                {/* Stage Card Content */}
                <div
                  className={`flex-1 p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-teal-50/50 border-teal-300 shadow-soft'
                      : isCompleted
                      ? 'bg-white border-slate-200/90 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200/60 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Stage {step.id}</span>
                      <h3
                        className={`text-base font-bold ${
                          isCurrent ? 'text-teal-900 font-extrabold' : 'text-navy-950'
                        }`}
                      >
                        {step.title}
                      </h3>
                      {step.date && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {step.date}
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full self-start sm:self-auto ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCurrent
                          ? 'bg-teal-100 text-teal-800 ring-1 ring-teal-300'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
                    <span className="text-[11px] text-slate-400">
                      {isCompleted
                        ? 'Completed in system'
                        : isCurrent
                        ? 'Action recommended now'
                        : 'Awaiting prior stage completion'}
                    </span>

                    <Link
                      to={step.actionLink}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                        isCurrent
                          ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-sm'
                          : isCompleted
                          ? 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{step.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
