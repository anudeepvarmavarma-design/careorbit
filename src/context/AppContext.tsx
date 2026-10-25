import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Doctor,
  Medicine,
  CartItem,
  Order,
  Prescription,
  MedicineReminder,
  HealthRecord,
  FamilyProfile,
  Appointment,
  Language,
  CareJourneyStep,
  DeliveryAddress,
  ConsultationMode
} from '../types';
import {
  INITIAL_FAMILY_PROFILES,
  INITIAL_DOCTORS,
  INITIAL_MEDICINES,
  INITIAL_APPOINTMENTS,
  INITIAL_ORDERS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_REMINDERS,
  INITIAL_HEALTH_RECORDS
} from '../data/mockData';
import { translations } from '../utils/translations';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;

  // Auth & Family Profiles
  isAuthenticated: boolean;
  currentUser: { name: string; email: string };
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  activeProfile: FamilyProfile;
  setActiveProfile: (profile: FamilyProfile) => void;
  familyProfiles: FamilyProfile[];
  addFamilyProfile: (profile: Omit<FamilyProfile, 'id' | 'avatar'>) => void;
  updateProfile: (profile: FamilyProfile) => void;

  // Doctors
  doctors: Doctor[];
  getDoctorById: (id: string) => Doctor | undefined;
  toggleDoctorAvailability: (id: string) => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (details: {
    doctorId: string;
    date: string;
    time: string;
    consultationMode: ConsultationMode;
    patientId: string;
    reason?: string;
  }) => Appointment | { error: string };
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => boolean;
  cancelAppointment: (id: string) => boolean;
  updateAppointmentStatus: (id: string, status: 'upcoming' | 'completed' | 'cancelled') => void;

  // Medicines & Store
  medicines: Medicine[];
  getMedicineById: (id: string) => Medicine | undefined;
  updateMedicineStock: (id: string, newStock: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (medicine: Medicine, quantity?: number) => boolean;
  updateCartQuantity: (medicineId: string, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartDiscount: number;
  cartTotal: number;
  cartCount: number;

  // Orders
  orders: Order[];
  placeOrder: (address: DeliveryAddress, paymentMethod: string, prescriptionId?: string) => Order | { error: string };
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  reorder: (order: Order) => void;

  // Prescriptions
  prescriptions: Prescription[];
  uploadPrescription: (fileName: string, fileSize: string, doctorName?: string) => Prescription;
  updatePrescriptionStatus: (id: string, status: Prescription['status'], notes?: string) => void;
  hasApprovedPrescriptionFor: (medicineName: string) => boolean;

  // Reminders
  reminders: MedicineReminder[];
  addReminder: (reminder: Omit<MedicineReminder, 'id' | 'statusHistory'>) => void;
  updateReminder: (id: string, data: Partial<MedicineReminder>) => void;
  deleteReminder: (id: string) => void;
  recordReminderStatus: (id: string, dateKey: string, status: 'taken' | 'skipped') => void;

  // Health Records
  records: HealthRecord[];
  addHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
  deleteHealthRecord: (id: string) => void;

  // Care Journey
  careJourneySteps: CareJourneyStep[];

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Admin / Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'careorbit_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('careorbit_lang');
    return (saved === 'te' ? 'te' : 'en');
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState({ name: 'Rahul Varma', email: 'rahul.varma@example.com' });

  const [familyProfiles, setFamilyProfiles] = useState<FamilyProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_family`);
    return saved ? JSON.parse(saved) : INITIAL_FAMILY_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activeProfileId`);
    return saved || 'fam-1';
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_doctors`);
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_appointments`);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_medicines`);
    return saved ? JSON.parse(saved) : INITIAL_MEDICINES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_cart`);
    return saved ? JSON.parse(saved) : [{ product: INITIAL_MEDICINES[0], quantity: 1 }];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_prescriptions`);
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [reminders, setReminders] = useState<MedicineReminder[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reminders`);
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [records, setRecords] = useState<HealthRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_records`);
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_RECORDS;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast handler
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_family`, JSON.stringify(familyProfiles));
  }, [familyProfiles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_activeProfileId`, activeProfileId);
  }, [activeProfileId]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_doctors`, JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_appointments`, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_medicines`, JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_prescriptions`, JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_reminders`, JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_records`, JSON.stringify(records));
  }, [records]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('careorbit_lang', lang);
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const activeProfile = familyProfiles.find((p) => p.id === activeProfileId) || familyProfiles[0];

  const setActiveProfile = (profile: FamilyProfile) => {
    setActiveProfileId(profile.id);
    showToast(`Switched active profile to ${profile.name}`, 'info');
  };

  const addFamilyProfile = (profileData: Omit<FamilyProfile, 'id' | 'avatar'>) => {
    const newProfile: FamilyProfile = {
      ...profileData,
      id: `fam-${Date.now()}`,
      avatar: profileData.gender === 'Female' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
    };
    setFamilyProfiles((prev) => [...prev, newProfile]);
    showToast(`Added profile for ${newProfile.name}`, 'success');
  };

  const updateProfile = (profile: FamilyProfile) => {
    setFamilyProfiles((prev) => prev.map((p) => (p.id === profile.id ? profile : p)));
    showToast('Profile information updated successfully', 'success');
  };

  const signIn = (email: string, name = 'Rahul Varma') => {
    setIsAuthenticated(true);
    setCurrentUser({ email, name });
    showToast(`Welcome back, ${name}!`, 'success');
  };

  const signOut = () => {
    setIsAuthenticated(false);
    showToast('Signed out of CareOrbit Demo', 'info');
  };

  // Doctors
  const getDoctorById = (id: string) => doctors.find((d) => d.id === id);

  const toggleDoctorAvailability = (id: string) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, isAvailableToday: !doc.isAvailableToday } : doc
      )
    );
    showToast('Doctor availability status updated', 'info');
  };

  // Appointments
  const bookAppointment = ({
    doctorId,
    date,
    time,
    consultationMode,
    patientId,
    reason
  }: {
    doctorId: string;
    date: string;
    time: string;
    consultationMode: ConsultationMode;
    patientId: string;
    reason?: string;
  }) => {
    const doctor = getDoctorById(doctorId);
    if (!doctor) return { error: 'Doctor not found.' };

    // Prevent double booking of same doctor at same date and time
    const conflict = appointments.find(
      (a) =>
        a.doctorId === doctorId &&
        a.date === date &&
        a.time === time &&
        a.status === 'upcoming'
    );

    if (conflict) {
      return { error: 'This appointment slot was just booked. Please select another time.' };
    }

    const patient = familyProfiles.find((p) => p.id === patientId) || activeProfile;

    const refNumber = `CO-APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      referenceNumber: refNumber,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpeciality: doctor.speciality,
      doctorImage: doctor.image,
      patientId: patient.id,
      patientName: patient.name,
      date,
      time,
      consultationMode,
      fee: doctor.fee,
      reason: reason || 'General Consultation',
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Update doctor available times for that day
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          return {
            ...d,
            availableTimes: d.availableTimes.filter((t) => t !== time)
          };
        }
        return d;
      })
    );

    showToast(`Appointment booked with ${doctor.name} on ${date}!`, 'success');
    return newAppointment;
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string): boolean => {
    const apt = appointments.find((a) => a.id === id);
    if (!apt) return false;

    // Check conflict
    const conflict = appointments.find(
      (a) =>
        a.id !== id &&
        a.doctorId === apt.doctorId &&
        a.date === newDate &&
        a.time === newTime &&
        a.status === 'upcoming'
    );

    if (conflict) {
      showToast('Selected new slot is already booked. Please pick another.', 'error');
      return false;
    }

    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime } : a))
    );
    showToast(`Appointment rescheduled to ${newDate} at ${newTime}`, 'success');
    return true;
  };

  const cancelAppointment = (id: string): boolean => {
    const apt = appointments.find((a) => a.id === id);
    if (!apt) return false;

    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    );
    showToast('Appointment successfully cancelled', 'info');
    return true;
  };

  const updateAppointmentStatus = (id: string, status: 'upcoming' | 'completed' | 'cancelled') => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    showToast(`Appointment status updated to ${status}`, 'info');
  };

  // Medicines
  const getMedicineById = (id: string) => medicines.find((m) => m.id === id);

  const updateMedicineStock = (id: string, newStock: number) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              stockCount: newStock,
              inStock: newStock > 0
            }
          : m
      )
    );
    showToast('Medicine inventory stock updated', 'info');
  };

  // Cart
  const addToCart = (medicine: Medicine, quantity = 1): boolean => {
    if (!medicine.inStock) {
      showToast(`${medicine.name} is currently out of stock`, 'error');
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: medicine, quantity }];
    });

    showToast(`Added ${medicine.name} to cart`, 'success');
    return true;
  };

  const updateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (medicineId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== medicineId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDeliveryFee = cart.length > 0 ? (cartSubtotal >= 500 ? 0 : 40) : 0;
  const cartDiscount = cartSubtotal >= 800 ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = Math.max(0, cartSubtotal + cartDeliveryFee - cartDiscount);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Orders
  const placeOrder = (
    address: DeliveryAddress,
    paymentMethod: string,
    prescriptionId?: string
  ) => {
    if (cart.length === 0) return { error: 'Your cart is empty.' };

    // Check if any cart item requires prescription
    const hasRxItem = cart.some((item) => item.product.prescriptionRequired);
    if (hasRxItem && !prescriptionId) {
      // Check if user has an approved prescription
      const hasApproved = prescriptions.some((p) => p.status === 'approved');
      if (!hasApproved) {
        return {
          error:
            'Your order contains prescription-required medicines. Please upload and verify your prescription before placing this order.'
        };
      }
    }

    const orderNumber = `CO-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: dateStr,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      discount: cartDiscount,
      total: cartTotal,
      address,
      paymentMethod,
      status: 'placed',
      prescriptionId,
      statusHistory: [
        {
          status: 'placed',
          timestamp: `${dateStr} ${timeStr}`,
          description: 'Demo order successfully registered in CareOrbit platform.'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const getOrderById = (id: string) => orders.find((o) => o.id === id);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const statusDescs: Record<Order['status'], string> = {
      placed: 'Order confirmed and registered in CareOrbit system',
      processing: 'Pharmacist packaged order items and sealed verification stamp',
      dispatched: 'Handed over to delivery courier for transit',
      out_for_delivery: 'CareOrbit courier partner is en route to delivery address',
      delivered: 'Package securely handed over to recipient'
    };

    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            statusHistory: [
              ...order.statusHistory,
              {
                status: newStatus,
                timestamp,
                description: statusDescs[newStatus]
              }
            ]
          };
        }
        return order;
      })
    );
    showToast(`Order status updated to ${newStatus.replace('_', ' ')}`, 'info');
  };

  const reorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    showToast('Items from previous order added to cart!', 'success');
  };

  // Prescriptions
  const uploadPrescription = (fileName: string, fileSize: string, doctorName?: string) => {
    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      patientId: activeProfile.id,
      patientName: activeProfile.name,
      fileName,
      fileSize,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      reviewNotes: 'Simulated pharmacist verification in queue.',
      doctorName: doctorName || 'Consulting Physician',
      eligibleMedicines: ['Augmentin 625 Duo Tablets', 'Glycomet 500 SR Tablets', 'Telma 40 Blood Pressure Tablets']
    };

    setPrescriptions((prev) => [newRx, ...prev]);
    showToast('Prescription submitted for simulated verification', 'success');
    return newRx;
  };

  const updatePrescriptionStatus = (id: string, status: Prescription['status'], notes?: string) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              reviewNotes: notes || (status === 'approved' ? 'Verified by CareOrbit demo pharmacist' : 'Document illegible or expired')
            }
          : p
      )
    );
    showToast(`Prescription review marked as ${status}`, 'info');
  };

  const hasApprovedPrescriptionFor = (medicineName: string) => {
    return prescriptions.some((p) => 
      p.status === 'approved' && 
      (p.eligibleMedicines?.some(m => m.toLowerCase().includes(medicineName.toLowerCase())) || true)
    );
  };

  // Reminders
  const addReminder = (data: Omit<MedicineReminder, 'id' | 'statusHistory'>) => {
    const newReminder: MedicineReminder = {
      ...data,
      id: `rem-${Date.now()}`,
      statusHistory: {}
    };
    setReminders((prev) => [newReminder, ...prev]);
    showToast(`Reminder set for ${data.medicineName}`, 'success');
  };

  const updateReminder = (id: string, data: Partial<MedicineReminder>) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );
    showToast('Medicine reminder updated', 'success');
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    showToast('Reminder deleted', 'info');
  };

  const recordReminderStatus = (id: string, dateKey: string, status: 'taken' | 'skipped') => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newRemaining = status === 'taken' && r.remainingSupply && r.remainingSupply > 0
            ? r.remainingSupply - 1
            : r.remainingSupply;

          return {
            ...r,
            remainingSupply: newRemaining,
            statusHistory: {
              ...r.statusHistory,
              [dateKey]: status
            }
          };
        }
        return r;
      })
    );
    showToast(`Dose marked as ${status}`, 'success');
  };

  // Health Records
  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: `rec-${Date.now()}`
    };
    setRecords((prev) => [newRecord, ...prev]);
    showToast('Health record saved successfully', 'success');
  };

  const deleteHealthRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Health record removed', 'info');
  };

  // Dynamically compute the 9 Care Journey Stages
  const hasUpcomingApt = appointments.some((a) => a.status === 'upcoming');
  const hasCompletedApt = appointments.some((a) => a.status === 'completed');
  const hasApprovedRx = prescriptions.some((p) => p.status === 'approved');
  const hasOrders = orders.length > 0;
  const hasReminders = reminders.length > 0;

  const careJourneySteps: CareJourneyStep[] = [
    {
      id: 1,
      key: 'discover',
      title: 'Discover a Doctor',
      description: 'Explore verified specialists across cardiology, pediatrics, dermatology, and general medicine.',
      status: appointments.length > 0 ? 'completed' : 'current',
      actionText: 'Browse Doctors',
      actionLink: '/doctors'
    },
    {
      id: 2,
      key: 'book',
      title: 'Book an Appointment',
      description: 'Choose convenient date, in-person or video consultation mode, and reserve your slot.',
      status: appointments.length > 0 ? 'completed' : 'pending',
      date: appointments[0]?.date,
      actionText: appointments.length > 0 ? 'View Bookings' : 'Book Appointment',
      actionLink: appointments.length > 0 ? '/appointments' : '/book-appointment'
    },
    {
      id: 3,
      key: 'prepare',
      title: 'Prepare for Consultation',
      description: 'Gather symptoms, previous medical history, and upload any existing lab reports.',
      status: hasUpcomingApt ? 'current' : (hasCompletedApt ? 'completed' : 'pending'),
      actionText: 'View Health Records',
      actionLink: '/health-records'
    },
    {
      id: 4,
      key: 'details',
      title: 'View Consultation Details',
      description: 'Access doctor clinic address, video link instructions, and appointment summaries.',
      status: appointments.length > 0 ? 'completed' : 'pending',
      actionText: 'My Appointments',
      actionLink: '/appointments'
    },
    {
      id: 5,
      key: 'prescription',
      title: 'Add or Review Prescription',
      description: 'Upload your doctor prescription to enable pharmacy dispensing of essential medications.',
      status: hasApprovedRx ? 'completed' : (prescriptions.length > 0 ? 'current' : 'pending'),
      actionText: 'Prescription Desk',
      actionLink: '/prescriptions'
    },
    {
      id: 6,
      key: 'browse_medicines',
      title: 'Browse Eligible Medicine Products',
      description: 'Select prescribed antibiotics, chronic maintenance medicines, and daily wellness items.',
      status: hasOrders ? 'completed' : 'current',
      actionText: 'Visit Pharmacy',
      actionLink: '/medicines'
    },
    {
      id: 7,
      key: 'order_medicines',
      title: 'Place Medicine Order',
      description: 'Review delivery address, apply savings, and place your doorstep delivery order.',
      status: hasOrders ? 'completed' : 'pending',
      date: orders[0]?.date,
      actionText: hasOrders ? 'Track Orders' : 'Go to Cart',
      actionLink: hasOrders ? '/orders' : '/cart'
    },
    {
      id: 8,
      key: 'reminders',
      title: 'Manage Medicine Reminders',
      description: 'Set smart dosing schedules and refill alerts so you never miss essential medication.',
      status: hasReminders ? 'completed' : 'pending',
      actionText: 'Manage Reminders',
      actionLink: '/reminders'
    },
    {
      id: 9,
      key: 'review_journey',
      title: 'Review Care Orbit',
      description: 'Track complete health continuum across appointments, test results, and wellness routines.',
      status: hasCompletedApt || hasOrders ? 'current' : 'pending',
      actionText: 'Care Journey Hub',
      actionLink: '/care-journey'
    }
  ];

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_family`);
    localStorage.removeItem(`${STORAGE_KEY}_activeProfileId`);
    localStorage.removeItem(`${STORAGE_KEY}_doctors`);
    localStorage.removeItem(`${STORAGE_KEY}_appointments`);
    localStorage.removeItem(`${STORAGE_KEY}_medicines`);
    localStorage.removeItem(`${STORAGE_KEY}_cart`);
    localStorage.removeItem(`${STORAGE_KEY}_orders`);
    localStorage.removeItem(`${STORAGE_KEY}_prescriptions`);
    localStorage.removeItem(`${STORAGE_KEY}_reminders`);
    localStorage.removeItem(`${STORAGE_KEY}_records`);

    setFamilyProfiles(INITIAL_FAMILY_PROFILES);
    setActiveProfileId('fam-1');
    setDoctors(INITIAL_DOCTORS);
    setAppointments(INITIAL_APPOINTMENTS);
    setMedicines(INITIAL_MEDICINES);
    setCart([{ product: INITIAL_MEDICINES[0], quantity: 1 }]);
    setOrders(INITIAL_ORDERS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setReminders(INITIAL_REMINDERS);
    setRecords(INITIAL_HEALTH_RECORDS);

    showToast('Demo data has been reset to default state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isAuthenticated,
        currentUser,
        signIn,
        signOut,
        activeProfile,
        setActiveProfile,
        familyProfiles,
        addFamilyProfile,
        updateProfile,
        doctors,
        getDoctorById,
        toggleDoctorAvailability,
        appointments,
        bookAppointment,
        rescheduleAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        medicines,
        getMedicineById,
        updateMedicineStock,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDeliveryFee,
        cartDiscount,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        reorder,
        prescriptions,
        uploadPrescription,
        updatePrescriptionStatus,
        hasApprovedPrescriptionFor,
        reminders,
        addReminder,
        updateReminder,
        deleteReminder,
        recordReminderStatus,
        records,
        addHealthRecord,
        deleteHealthRecord,
        careJourneySteps,
        toasts,
        showToast,
        removeToast,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
