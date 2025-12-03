import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Lightbulb,
  Users,
  Recycle,
  AlertTriangle,
  FolderKanban,
  Menu,
  X,
  LogOut,
  Leaf,
  Coins,
  UserCheck,
  Shield,
  GraduationCap,
  BarChart3,
  ShoppingCart,
  Store,
  Building,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DemoLogin from "@/components/auth/DemoLogin";
import { Toaster } from "@/components/ui/sonner";

const studentNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "Dashboard", section: "main" },
  { name: "Idea Machine", icon: Lightbulb, page: "IdeaMachine", section: "projects" },
  { name: "My Projects", icon: FolderKanban, page: "MyProjects", section: "projects" },
  { name: "Book Mentor", icon: Users, page: "BookMentor", section: "projects" },
  { name: "Parts Store", icon: ShoppingCart, page: "PartsStore", section: "store" },
  { name: "Attendance", icon: UserCheck, page: "Attendance", section: "campus" },
  { name: "Recycling", icon: Recycle, page: "Recycling", section: "campus" },
  { name: "Loyalty Points", icon: Coins, page: "LoyaltyPoints", section: "rewards" },
  { name: "Campus Reports", icon: AlertTriangle, page: "CampusReports", section: "campus" },
  { name: "Profile", icon: Users, page: "Profile", section: "account" },
];

const adminNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "AdminDashboard", section: "overview" },
  { name: "Approvals", icon: Shield, page: "AdminApprovals", section: "manage" },
  { name: "Reports", icon: AlertTriangle, page: "AdminReports", section: "manage" },
  { name: "Projects", icon: FolderKanban, page: "AdminProjects", section: "manage" },
  { name: "Attendance", icon: UserCheck, page: "AdminAttendance", section: "manage" },
  { name: "Mentors", icon: Users, page: "Mentors", section: "users" },
  { name: "Idea Database", icon: Lightbulb, page: "IdeaMachine", section: "content" },
  { name: "Usage Reports", icon: BarChart3, page: "AdminUsageReports", section: "analytics" },
  { name: "Profile", icon: Users, page: "Profile", section: "account" },
];

const alumniNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "AlumniDashboard", section: "main" },
  { name: "Profile", icon: Users, page: "Profile", section: "account" },
];

const companyNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "AlumniDashboard", section: "main" },
  { name: "Profile", icon: Users, page: "Profile", section: "account" },
];

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("ivender_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Get current page title for breadcrumb
  const getCurrentPageTitle = () => {
    const navItems = isAdmin ? adminNavItems : isAlumni ? alumniNavItems : isCompany ? companyNavItems : studentNavItems;
    const current = navItems.find(item => item.page === currentPageName);
    return current?.name || currentPageName;
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("ivender_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("ivender_user");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <DemoLogin onLogin={handleLogin} />;
  }

  const isAdmin = user.user_type === "admin";
  const isAlumni = user.user_type === "alumni";
  const isCompany = user.user_type === "company";
  const isStudent = user.user_type === "student";

  const navItems = isAdmin ? adminNavItems : 
                   isAlumni ? alumniNavItems : 
                   isCompany ? companyNavItems : 
                   studentNavItems;

  const pageTitle = getCurrentPageTitle();

  const themeColors = {
    admin: { primary: "from-purple-500 to-indigo-500", secondary: "purple" },
    alumni: { primary: "from-blue-500 to-cyan-500", secondary: "blue" },
    company: { primary: "from-amber-500 to-orange-500", secondary: "amber" },
    student: { primary: "from-emerald-500 to-teal-500", secondary: "emerald" }
  };

  const theme = themeColors[user.user_type] || themeColors.student;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40">
      <style>{`
        :root {
          --accent-primary: ${isAdmin ? "#8b5cf6" : isAlumni ? "#0ea5e9" : isCompany ? "#f59e0b" : "#10b981"};
        }
      `}</style>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 hidden lg:block z-40">
        <div className="p-5">
          <Link to={createPageUrl(navItems[0].page)} className="flex items-center gap-3 group">
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${theme.primary} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900">I-Vender</h1>
              <p className="text-xs text-slate-500">Innovation Platform</p>
            </div>
          </Link>
          <Badge className={`mt-3 w-full justify-center bg-${theme.secondary}-100 text-${theme.secondary}-700 py-1.5`}>
            {isAdmin && <><Shield className="h-3 w-3 mr-1" /> Administrator</>}
            {isAlumni && <><GraduationCap className="h-3 w-3 mr-1" /> Alumni Mentor</>}
            {isCompany && <><Building className="h-3 w-3 mr-1" /> Store Partner</>}
            {isStudent && <><GraduationCap className="h-3 w-3 mr-1" /> Student</>}
          </Badge>
        </div>

        <nav className="px-3 mt-4 space-y-1">
          {navItems.map((item, idx) => {
            const prevItem = navItems[idx - 1];
            const showDivider = prevItem && prevItem.section !== item.section;
            return (
              <React.Fragment key={item.page + item.name}>
                {showDivider && <div className="my-2 border-t border-slate-200/50" />}
                <Link
                  to={createPageUrl(item.page)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                    currentPageName === item.page
                      ? `bg-gradient-to-r ${theme.primary} text-white shadow-md`
                      : "text-slate-600 hover:bg-slate-100/80"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50 bg-white/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100 transition-colors">
            <Avatar className="h-10 w-10 ring-2 ring-white">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className={`bg-${theme.secondary}-100 text-${theme.secondary}-700`}>
                {user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                {isStudent && (
                  <><Coins className="h-3 w-3 text-emerald-600" /><span className="text-emerald-600 font-medium">{user.total_points || 0} pts</span></>
                )}
                {isAlumni && (
                  <span className="text-blue-600 font-medium">₹{(user.mentorship_earnings || 0).toLocaleString("en-IN")}</span>
                )}
                {isAdmin && <span className="text-purple-600 font-medium">Admin</span>}
                {isCompany && <span className="text-amber-600 font-medium">{user.company_name}</span>}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout} 
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <Link to={createPageUrl(navItems[0].page)} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${theme.primary} flex items-center justify-center`}>
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">I-Vendor</span>
            <Badge className={`bg-${theme.secondary}-100 text-${theme.secondary}-700 text-xs`}>
              {user.user_type}
            </Badge>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="p-3">
                {navItems.map((item) => (
                  <Link
                    key={item.page + item.name}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all",
                      currentPageName === item.page
                        ? `bg-gradient-to-r ${theme.primary} text-white`
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback className={`bg-${theme.secondary}-100 text-${theme.secondary}-700`}>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">
                      {isStudent ? `${user.total_points || 0} points` : user.user_type}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {/* Desktop Top Bar */}
        <div className="hidden lg:flex items-center justify-between h-16 px-8 border-b border-slate-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm">
            <Link to={createPageUrl(navItems[0].page)} className="text-slate-400 hover:text-slate-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className="text-slate-900 font-medium">{pageTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback className={`bg-${theme.secondary}-100 text-${theme.secondary}-700 text-sm`}>
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.user_type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Toast notifications */}
      <Toaster position="top-right" />
      </div>
      );
      }