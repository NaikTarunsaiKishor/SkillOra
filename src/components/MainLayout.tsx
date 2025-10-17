
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Book, BookOpen, Compass, LucideIcon, Siren, User, Users, LayoutDashboard, 
  ChevronRight, Menu, X, Calculator, Award, Calendar, CheckCircle2, LogOut, 
  Settings, Bell, Code, Activity, BookMarked, FileText, MessageSquare, Video,
  Club, Briefcase, BookMinus, BookCopy, GraduationCap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistant from './AIAssistant';
import { toast } from "@/components/ui/use-toast";

type SidebarItem = {
  name: string;
  icon: LucideIcon;
  path: string;
  activePattern?: RegExp;
};

const studentMenuItems: SidebarItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', activePattern: /^\/dashboard$/ },
  { name: 'Academic Courses', icon: Book, path: '/academic', activePattern: /^\/academic/ },
  { name: 'Coding Tracks', icon: Compass, path: '/coding', activePattern: /^\/coding/ },
  { name: 'Assignments', icon: CheckCircle2, path: '/assignments', activePattern: /^\/assignments/ },
  { name: 'Assessments', icon: Calculator, path: '/assessments', activePattern: /^\/assessments/ },
  { name: 'Attendance', icon: BookMarked, path: '/attendance', activePattern: /^\/attendance/ },
  { name: 'AI IDE', icon: Code, path: '/ai-ide', activePattern: /^\/ai-ide/ },
  { name: 'Club Activities', icon: Club, path: '/clubs', activePattern: /^\/clubs/ },
  { name: 'Study Rooms', icon: Video, path: '/studyrooms', activePattern: /^\/studyrooms/ },
  { name: 'Doubt Discussion', icon: MessageSquare, path: '/discussions', activePattern: /^\/discussions/ },
  { name: 'Circulars & Notices', icon: FileText, path: '/circulars', activePattern: /^\/circulars/ },
  { name: 'Progress', icon: Award, path: '/progress', activePattern: /^\/progress/ },
  { name: 'Calendar', icon: Calendar, path: '/calendar', activePattern: /^\/calendar/ },
];

const facultyMenuItems: SidebarItem[] = [
  { name: 'Faculty Dashboard', icon: LayoutDashboard, path: '/faculty', activePattern: /^\/faculty$/ },
  { name: 'Manage Courses', icon: BookOpen, path: '/faculty/courses', activePattern: /^\/faculty\/courses/ },
  { name: 'Students', icon: Users, path: '/faculty/students', activePattern: /^\/faculty\/students/ },
  { name: 'Attendance', icon: BookMarked, path: '/faculty/attendance', activePattern: /^\/faculty\/attendance/ },
  { name: 'Create Content', icon: BookCopy, path: '/faculty/content', activePattern: /^\/faculty\/content/ },
  { name: 'Club Management', icon: Club, path: '/faculty/clubs', activePattern: /^\/faculty\/clubs/ },
  { name: 'Study Rooms', icon: Video, path: '/faculty/studyrooms', activePattern: /^\/faculty\/studyrooms/ },
  { name: 'Answer Queries', icon: MessageSquare, path: '/faculty/discussions', activePattern: /^\/faculty\/discussions/ },
  { name: 'Circulars & Notices', icon: FileText, path: '/faculty/circulars', activePattern: /^\/faculty\/circulars/ },
];

const adminMenuItems: SidebarItem[] = [
  { name: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin', activePattern: /^\/admin$/ },
  { name: 'Faculty Management', icon: User, path: '/admin/faculty', activePattern: /^\/admin\/faculty/ },
  { name: 'Student Management', icon: Users, path: '/admin/students', activePattern: /^\/admin\/students/ },
  { name: 'Club Management', icon: Club, path: '/admin/clubs', activePattern: /^\/admin\/clubs/ },
  { name: 'Circulars & Notices', icon: FileText, path: '/admin/circulars', activePattern: /^\/admin\/circulars/ },
  { name: 'Reports', icon: Siren, path: '/admin/reports', activePattern: /^\/admin\/reports/ },
];

const menuGroups = [
  { id: 'student', name: 'Student Portal', items: studentMenuItems },
  { id: 'faculty', name: 'Faculty Portal', items: facultyMenuItems },
  { id: 'admin', name: 'Admin Portal', items: adminMenuItems },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeGroup, setActiveGroup] = useState('student');
  const [notifications, setNotifications] = useState(3);
  const [userName, setUserName] = useState('Tarun Naik');
  const [userProgram, setUserProgram] = useState('Computer Science');
  const [userAvatar, setUserAvatar] = useState('data:image/jpeg;base64,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');

  const mockNotifications = [
    { id: 1, title: 'Final Examination Schedule', message: 'The final examination schedule for Spring 2025 has been released.', time: '2 hours ago' },
    { id: 2, title: 'Campus Maintenance', message: 'Network downtime scheduled for Saturday.', time: '1 day ago' },
    { id: 3, title: 'New Features Released', message: 'Campus Bridge app updated with new features.', time: '3 days ago' },
  ];

  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // Auto-detect which portal we're in based on the URL
  useEffect(() => {
    if (location.pathname.startsWith('/faculty')) {
      setActiveGroup('faculty');
    } else if (location.pathname.startsWith('/admin')) {
      setActiveGroup('admin');
    } else {
      setActiveGroup('student');
    }
    
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserName(userData.name || 'Tarun Naik');
        setUserProgram(userData.program || 'Computer Science');
        // We could set avatar here too if it's stored
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
      }
    }
  }, [location.pathname]);

  const handleGroupChange = (groupId: string) => {
    setActiveGroup(groupId);
    
    // Navigate to the appropriate dashboard
    if (groupId === 'student') {
      navigate('/dashboard');
    } else if (groupId === 'faculty') {
      navigate('/faculty');
    } else if (groupId === 'admin') {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  const handleOpenNotifications = () => {
    setShowNotificationsDropdown(!showNotificationsDropdown);
  };

  const handleOpenSettings = () => {
    toast({
      title: "Coming soon",
      description: "The settings page is under development",
    });
  };

  const currentMenuItems = menuGroups.find(group => group.id === activeGroup)?.items || [];

  const isActive = (item: SidebarItem) => {
    return item.activePattern 
      ? item.activePattern.test(location.pathname) 
      : location.pathname === item.path;
  };

  const handleMainButtonClick = () => {
    if (activeGroup === 'student') {
      navigate('/academic');
    } else if (activeGroup === 'faculty') {
      navigate('/faculty/courses');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar backdrop */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 lg:hidden" 
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -265 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 border-r bg-sidebar-background transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="flex items-center gap-2">
             
                <img src="/logo.png.png" alt="SkillOra Logo" className="h-14 w-14" />
              
              <span className="font-semibold text-lg">SkillOra</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* Portal selector */}
          <div className="px-4 py-3 border-b">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {menuGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => handleGroupChange(group.id)}
                  className={cn(
                    "flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors",
                    activeGroup === group.id 
                      ? "bg-white shadow text-campus-800" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {currentMenuItems.map((item) => (
                <motion.li 
                  key={item.path}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive(item)
                        ? "bg-campus-50 text-campus-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                    {isActive(item) && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userProgram}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                onClick={handleLogout}
              >
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top navigation */}
        <header className="h-16 border-b flex items-center justify-between px-4 bg-white">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          
          <div className="flex items-center gap-4 ml-auto">
            <Button 
              variant="outline" 
              size="icon" 
              className="text-gray-600"
              onClick={handleOpenSettings}
            >
              <Settings size={20} />
            </Button>
            <DropdownMenu open={showNotificationsDropdown} onOpenChange={setShowNotificationsDropdown}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative text-gray-600"
                >
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                      {notifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mockNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{notification.message}</div>
                    <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/circulars')} className="text-center">
                  View All Notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              size="sm" 
              className="bg-campus-600 hover:bg-campus-700"
              onClick={handleMainButtonClick}
            >
              {activeGroup === 'student' ? 'My Courses' :
               activeGroup === 'faculty' ? 'My Classes' :
               'Overview'}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
};

export default MainLayout;
