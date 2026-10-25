import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Shield, Heart, AlertTriangle, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Important Emergency Callout */}
        <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border border-rose-900/60 rounded-2xl p-4 sm:p-5 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-200">Medical Emergency Notice</h4>
              <p className="text-xs text-rose-300/80 mt-0.5">
                CareOrbit is a digital clinic & pharmacy platform. In life-threatening emergencies, call 112 or visit the nearest trauma facility immediately.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-rose-200 bg-rose-900/50 px-3 py-1.5 rounded-lg border border-rose-700/50">
              National Emergency: 112
            </span>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 p-3 rounded-2xl inline-block mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              CareOrbit combines trusted doctor appointment booking, an online verified pharmacy, prescription tracking, and connected health journeys into a unified healthcare experience.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Cyber Towers, Hitec City, Hyderabad - 500081</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>1800-CARE-ORBIT (Demo Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@careorbit.example.com</span>
              </div>
            </div>
          </div>

          {/* Doctors by Speciality */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
              Doctor Specialities
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/doctors?speciality=Cardiology" className="hover:text-white transition-colors">Cardiologists</Link></li>
              <li><Link to="/doctors?speciality=General Physician" className="hover:text-white transition-colors">General Physicians</Link></li>
              <li><Link to="/doctors?speciality=Pediatrics" className="hover:text-white transition-colors">Pediatricians</Link></li>
              <li><Link to="/doctors?speciality=Dermatology" className="hover:text-white transition-colors">Dermatologists</Link></li>
              <li><Link to="/doctors?speciality=Orthopedics" className="hover:text-white transition-colors">Orthopedic Surgeons</Link></li>
              <li><Link to="/doctors?speciality=Gynecology" className="hover:text-white transition-colors">Gynecologists</Link></li>
            </ul>
          </div>

          {/* Pharmacy & Health */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
              Pharmacy & Care
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/medicines?category=OTC Healthcare Essentials" className="hover:text-white transition-colors">OTC Essentials</Link></li>
              <li><Link to="/medicines?category=Wellness Products" className="hover:text-white transition-colors">Vitamins & Wellness</Link></li>
              <li><Link to="/medicines?category=First Aid" className="hover:text-white transition-colors">First Aid Kits</Link></li>
              <li><Link to="/prescriptions" className="hover:text-white transition-colors">Upload Prescription</Link></li>
              <li><Link to="/reminders" className="hover:text-white transition-colors">Medicine Reminders</Link></li>
              <li><Link to="/cost-estimator" className="hover:text-white transition-colors">Cost Estimator</Link></li>
            </ul>
          </div>

          {/* Patient Account & Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
              Patient Hub
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link></li>
              <li><Link to="/appointments" className="hover:text-white transition-colors">My Appointments</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
              <li><Link to="/care-journey" className="hover:text-white transition-colors">Care Journey Timeline</Link></li>
              <li><Link to="/family-profiles" className="hover:text-white transition-colors">Family Profiles</Link></li>
              <li><Link to="/admin" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                Demo Admin Panel <ArrowUpRight className="w-3 h-3" />
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left leading-relaxed">
            CareOrbit Prototype Demonstration. Fictional doctors, appointments, prescriptions, and pharmacy orders are simulated for interactive demonstration. Not connected to live clinical or billing services.
          </p>
          <div className="flex items-center gap-4 text-slate-400 shrink-0">
            <span>© {new Date().getFullYear()} CareOrbit</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-teal-400">
              <Shield className="w-3.5 h-3.5" /> Healthcare Demo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
