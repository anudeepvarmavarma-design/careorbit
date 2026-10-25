import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RootLayout } from './layouts/RootLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DoctorDiscoveryPage } from './pages/DoctorDiscoveryPage';
import { DoctorDetailsPage } from './pages/DoctorDetailsPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicineStorePage } from './pages/MedicineStorePage';
import { MedicineDetailsPage } from './pages/MedicineDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { DashboardPage } from './pages/DashboardPage';
import { CareJourneyPage } from './pages/CareJourneyPage';
import { PrescriptionsPage } from './pages/PrescriptionsPage';
import { MedicineRemindersPage } from './pages/MedicineRemindersPage';
import { HealthRecordsPage } from './pages/HealthRecordsPage';
import { CareAssistantPage } from './pages/CareAssistantPage';
import { CostEstimatorPage } from './pages/CostEstimatorPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { FamilyProfilesPage } from './pages/FamilyProfilesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="doctors" element={<DoctorDiscoveryPage />} />
            <Route path="doctors/:id" element={<DoctorDetailsPage />} />
            <Route path="book-appointment" element={<BookAppointmentPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="medicines" element={<MedicineStorePage />} />
            <Route path="medicines/:id" element={<MedicineDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="care-journey" element={<CareJourneyPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            <Route path="reminders" element={<MedicineRemindersPage />} />
            <Route path="health-records" element={<HealthRecordsPage />} />
            <Route path="assistant" element={<CareAssistantPage />} />
            <Route path="cost-estimator" element={<CostEstimatorPage />} />
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="family-profiles" element={<FamilyProfilesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
