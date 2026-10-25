import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Shield,
  Edit2,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { activeProfile, updateProfile } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activeProfile.name);
  const [phone, setPhone] = useState(activeProfile.phone);
  const [email, setEmail] = useState(activeProfile.email);
  const [city, setCity] = useState(activeProfile.city);
  const [age, setAge] = useState(activeProfile.age);
  const [bloodGroup, setBloodGroup] = useState(activeProfile.bloodGroup);
  const [emergencyContact, setEmergencyContact] = useState(activeProfile.emergencyContact || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...activeProfile,
      name,
      phone,
      email,
      city,
      age: Number(age),
      bloodGroup,
      emergencyContact
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Personal Patient Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal healthcare information and emergency contacts.
          </p>
        </div>
        <Link
          to="/family-profiles"
          className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-2 rounded-xl border border-teal-200 hover:bg-teal-100 transition-colors flex items-center gap-1.5"
        >
          <Users className="w-4 h-4" />
          <span>Switch Family Profile</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-6">
          <img
            src={activeProfile.avatar}
            alt={activeProfile.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-teal-500/20 shadow-md"
          />

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-navy-950">{activeProfile.name}</h2>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {activeProfile.relation}
                </span>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 self-center sm:self-auto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500 pt-1">
              Age: {activeProfile.age} • Gender: {activeProfile.gender} • Blood Group: {activeProfile.bloodGroup}
            </p>
          </div>
        </div>

        {/* Profile Details or Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Age
                </label>
                <input
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
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

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="+91 98765 43210 (Sneha Kulkarni)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-teal-700 text-white font-bold hover:bg-teal-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Mail className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                <span className="font-semibold text-slate-800">{activeProfile.email}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Phone className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone</span>
                <span className="font-semibold text-slate-800">{activeProfile.phone}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">City</span>
                <span className="font-semibold text-slate-800">{activeProfile.city}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Heart className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Blood Group</span>
                <span className="font-bold text-slate-800">{activeProfile.bloodGroup}</span>
              </div>
            </div>

            {activeProfile.emergencyContact && (
              <div className="sm:col-span-2 p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100 flex items-center gap-3">
                <Shield className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="text-rose-700 block text-[10px] uppercase font-bold">Emergency Contact</span>
                  <span className="font-bold text-slate-900">{activeProfile.emergencyContact}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
