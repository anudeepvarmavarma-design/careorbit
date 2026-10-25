export type ConsultationMode = 'in-person' | 'online';

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  qualification: string;
  experience: number; // in years
  fee: number; // in INR
  rating: number; // demo rating
  reviewCount: number;
  languages: string[];
  clinicName: string;
  clinicAddress: string;
  consultationModes: ConsultationMode[];
  nextSlot: string;
  availableDates: string[]; // e.g. ["2026-10-25", "2026-10-26", "2026-10-27"]
  availableTimes: string[]; // e.g. ["09:30 AM", "11:00 AM", "02:30 PM", "05:00 PM"]
  services: string[];
  image: string;
  about: string;
  isAvailableToday?: boolean;
}

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  referenceNumber: string;
  doctorId: string;
  doctorName: string;
  doctorSpeciality: string;
  doctorImage: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  consultationMode: ConsultationMode;
  fee: number;
  reason?: string;
  status: AppointmentStatus;
  createdAt: string;
  notes?: string;
}

export type ProductCategory = 
  | 'OTC Healthcare Essentials'
  | 'First Aid'
  | 'Personal Care'
  | 'Wellness Products'
  | 'Prescription-Required Products';

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  genericName: string;
  category: ProductCategory;
  packSize: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  stockCount: number;
  prescriptionRequired: boolean;
  image: string;
  description: string;
  usageInfo: string;
  dosageForm: string; // Tablet, Syrup, Gel, Capsule, etc.
}

export interface CartItem {
  product: Medicine;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  pincode: string;
  type: 'Home' | 'Work' | 'Other';
}

export type OrderStatus = 'placed' | 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: DeliveryAddress;
  paymentMethod: string;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
  prescriptionId?: string;
}

export type PrescriptionStatus = 'pending' | 'approved' | 'rejected';

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: PrescriptionStatus;
  reviewNotes?: string;
  doctorName?: string;
  eligibleMedicines?: string[]; // IDs or names of medicines linked
}

export interface MedicineReminder {
  id: string;
  patientId: string;
  medicineName: string;
  schedule: string; // e.g. "Twice Daily - After meals"
  time: string; // e.g. "08:30 AM"
  startDate: string;
  endDate?: string;
  remainingSupply?: number;
  refillReminderDate?: string;
  notes?: string;
  statusHistory: {
    [dateKey: string]: 'taken' | 'skipped' | 'pending';
  };
}

export type HealthRecordCategory = 'prescription' | 'lab_report' | 'consultation_summary' | 'vaccination' | 'scan';

export interface HealthRecord {
  id: string;
  patientId: string;
  title: string;
  category: HealthRecordCategory;
  date: string;
  doctorOrLab: string;
  fileDetails: string;
  status: string;
  notes?: string;
}

export interface FamilyProfile {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  city: string;
  emergencyContact?: string;
  avatar: string;
}

export interface CareJourneyStep {
  id: number;
  key: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'unavailable';
  date?: string;
  actionText: string;
  actionLink: string;
}

export type Language = 'en' | 'te';
