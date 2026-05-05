import { Routes, Route } from "react-router-dom";

/* PUBLIC */
import LandingPage from "../pages/public/LandingPage";
import AboutPage from "../pages/public/AboutPage";
import NotebookPage from "../pages/public/NotebookPage";

/* AUTH */
import LoginPage from "../pages/auth/StudentLoginPage";
import AdminLogin from "../pages/auth/AdminLogin";

/* STUDENT */
import DashboardPage from "../pages/student/DashboardPage";
import CoursesPage from "../pages/student/CoursesPage";
import CourseDetail from "../pages/student/CourseDetail";
import MesCertifications from "../pages/student/MesCertifications";
import QCMPage from "../pages/student/QCMPage";
import TPPage from "../pages/student/TPPage";
import CodeLabPage from "../pages/student/CodeLabPage";
import ProfilePage from "../pages/student/ProfilePage";

/* ADMIN */
import AdminDashboard from "../pages/admin/AdminDashboard";

import PDFManager from "../pages/admin/pdf/PDFManager";
import AddPDF from "../pages/admin/pdf/AddPDF";

import CertificatManager from "../pages/admin/certification/CertificatManager";
import AddCertificat from "../pages/admin/certification/AddCertificat";

import QCMManager from "../pages/admin/qcm/QCMManager";
import AddQCM from "../pages/admin/qcm/AddQCM";

import TPManager from "../pages/admin/tp/TPManager";
import AddTP from "../pages/admin/tp/AddTP";

import UsersManager from "../pages/admin/users/UsersManager";

/* ROUTE GUARDS */
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🌍 PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/notebook" element={<NotebookPage />} />

      {/* 🔐 AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 🎓 STUDENT (Protected) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student/dashboard" element={<DashboardPage />} />
        <Route path="/student/courses" element={<CoursesPage />} />
        <Route path="/student/course/:id" element={<CourseDetail />} />
        <Route path="/student/certifications" element={<MesCertifications />} />
        <Route path="/student/qcm/:id" element={<QCMPage />} />
        <Route path="/student/tp/:id" element={<TPPage />} />
        <Route path="/student/codelab" element={<CodeLabPage />} />
        <Route path="/student/profile" element={<ProfilePage />} />
      </Route>

      {/* 🛠️ ADMIN (Protected + Role) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* PDF */}
        <Route path="/admin/pdf" element={<PDFManager />} />
        <Route path="/admin/pdf/add" element={<AddPDF />} />

        {/* Certifications */}
        <Route path="/admin/certifications" element={<CertificatManager />} />
        <Route path="/admin/certifications/add" element={<AddCertificat />} />

        {/* QCM */}
        <Route path="/admin/qcm" element={<QCMManager />} />
        <Route path="/admin/qcm/add" element={<AddQCM />} />

        {/* TP */}
        <Route path="/admin/tp" element={<TPManager />} />
        <Route path="/admin/tp/add" element={<AddTP />} />

        {/* Users */}
        <Route path="/admin/users" element={<UsersManager />} />
      </Route>

      {/* ❌ 404 fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />

    </Routes>
  );
}