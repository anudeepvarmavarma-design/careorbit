import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FamilyProfile } from '../types';
import {
  Users,
  Plus,
  CheckCircle2,
  User,
  Heart,
  Phone,
  Calendar,
  X,
  ArrowRight
} from 'lucide-react';

export const FamilyProfilesPage: React.FC = () => {
  const { familyProfiles, activeProfile, setActiveProfile, addFamilyProfile } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Parent');
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('family.member@example.com');
  const [city, setCity] = useState('Hyderabad');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addFamilyProfile({
      name,
      relation,
      age: Number(age),
      gender,
      bloodGroup,
      phone,
      email,
      city,
      emergencyContact: `${activeProfile.phone} (${activeProfile.name})`
    });

    setShowAddModal(false);
    setName('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Family Healthcare Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Seamlessly switch between family members to manage their individual doctor visits, prescriptions, and health records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Profiles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyProfiles.map((member) => {
          const isActive = member.id === activeProfile.id;

          return (
            <div
              key={member.id}
              className={`bg-white rounded-3xl border p-6 transition-all shadow-xs flex flex-col justify-between space-y-4 ${
                isActive
                  ? 'border-teal-600 ring-2 ring-teal-500/20 shadow-soft-lg bg-mint-50/20'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-navy-950">{member.name}</h3>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {member.relation}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {member.age} yrs • {member.gender} • Blood Group: <strong className="text-slate-700">{member.bloodGroup}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{member.city}</p>
                  </div>
                </div>

                {isActive && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active
                  </span>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{member.phone}</span>

                {isActive ? (
                  <span className="text-xs font-bold text-teal-700">Currently Managing</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveProfile(member)}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-xs"
                  >
                    Switch to this Profile
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-navy-950">Add Family Member Profile</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name (Indian Name)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kavita Varma, Ramesh Rao"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Relationship
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Grandparent">Grandparent</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Blood Group
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-700 font-bold text-white hover:bg-teal-800"
                >
                  Add Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
