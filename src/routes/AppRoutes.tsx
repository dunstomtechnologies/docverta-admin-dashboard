import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { PatientsPage } from '../pages/Patients/PatientsPage';
import { DoctorsPage } from '../pages/Doctors/DoctorsPage';
import { DoctorVerificationPage } from '../pages/DoctorVerification/DoctorVerificationPage';
import { AppointmentsPage } from '../pages/Appointments/AppointmentsPage';
import { ServicesPage } from '../pages/Services/ServicesPage';
import { SpecializationsPage } from '../pages/Specializations/SpecializationsPage';
import { ReviewsPage } from '../pages/Reviews/ReviewsPage';
import { ReportsPage } from '../pages/Reports/ReportsPage';
import { AnnouncementsPage } from '../pages/Announcements/AnnouncementsPage';
import { FAQsPage } from '../pages/FAQs/FAQsPage';
import { SettingsPage } from '../pages/Settings/SettingsPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { UnauthorizedPage } from '../pages/Unauthorized/UnauthorizedPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Authentication Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Healthcare Admin Workspace */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="doctor-verification" element={<DoctorVerificationPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="specializations" element={<SpecializationsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="faqs" element={<FAQsPage />} />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
