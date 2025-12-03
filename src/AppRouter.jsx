import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { parsePageFromUrl } from './utils'

// Import Layout
import Layout from './Layout'

// Import all page components
import Dashboard from './Pages/Dashboard/Dashboard'
import IdeaMachine from './Pages/IdeaMachine/IdeaMachine'
import MyProjects from './Pages/MyProjects/MyProjects'
import BookMentor from './Pages/BookMentor/BookMentor'
import PartsStore from './Pages/PartsStore/PartsStore'
import Attendance from './Pages/Attendance/Attendance'
import Recycling from './Pages/Recycling/Recycling'
import LoyaltyPoints from './Pages/LoyaltyPoints/LoyaltyPoints'
import CampusReports from './Pages/CampusReports/CampusReports'
import Profile from './Pages/Profile/Profile'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminApprovals from './Pages/AdminApprovals/AdminApprovals'
import AdminReports from './Pages/AdminReports/AdminReports'
import AdminProjects from './Pages/AdminProjects/AdminProjects'
import AdminAttendance from './Pages/AdminAttendance/AdminAttendance'
import Mentors from './Pages/Mentors/Mentors'
import AdminUsageReports from './Pages/AdminUsageReports/AdminUsageReports'
import AlumniDashboard from './Pages/AlumniDashboard/AlumniDashboard'
import KioskLogin from './Pages/KioskLogin/KioskLogin'

// Route mapping
const pageComponents = {
  Dashboard,
  IdeaMachine,
  MyProjects,
  BookMentor,
  PartsStore,
  Attendance,
  Recycling,
  LoyaltyPoints,
  CampusReports,
  Profile,
  AdminDashboard,
  AdminApprovals,
  AdminReports,
  AdminProjects,
  AdminAttendance,
  Mentors,
  AdminUsageReports,
  AlumniDashboard,
  KioskLogin
}

// Main router wrapper
function RouterContent() {
  const location = useLocation()
  const currentPageName = parsePageFromUrl(location.pathname)

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/idea-machine" element={<IdeaMachine />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/book-mentor" element={<BookMentor />} />
        <Route path="/parts-store" element={<PartsStore />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/recycling" element={<Recycling />} />
        <Route path="/loyalty-points" element={<LoyaltyPoints />} />
        <Route path="/campus-reports" element={<CampusReports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-approvals" element={<AdminApprovals />} />
        <Route path="/admin-reports" element={<AdminReports />} />
        <Route path="/admin-projects" element={<AdminProjects />} />
        <Route path="/admin-attendance" element={<AdminAttendance />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/admin-usage-reports" element={<AdminUsageReports />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/kiosk-login" element={<KioskLogin />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <Router>
      <RouterContent />
    </Router>
  )
}
