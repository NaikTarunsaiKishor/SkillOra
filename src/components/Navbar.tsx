
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X, BookOpen, UserPlus, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check if user is logged in on component mount
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserType = localStorage.getItem('userType');
    setIsLoggedIn(loggedInStatus);
    setUserType(storedUserType);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of SkillOra.",
    });
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (userType === 'student') {
      navigate('/dashboard');
    } else if (userType === 'faculty') {
      navigate('/faculty');
    } else if (userType === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md py-2 shadow-md' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png.png" alt="SkillOra Logo" className="h-14 w-15" />
          <span className="font-bold text-xl text-white">SkillOra</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/academic" className="text-white/80 hover:text-white transition-colors">
            Academic
          </Link>
          <Link to="/coding" className="text-white/80 hover:text-white transition-colors">
            Coding
          </Link>
          <Link to="#" className="text-white/80 hover:text-white transition-colors">
            About
          </Link>
          <Link to="#" className="text-white/80 hover:text-white transition-colors">
            Contact
          </Link>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" className="text-white bg-white/10 hover:bg-white/20" onClick={handleDashboardClick}>
                  Dashboard
                </Button>
                <Button className="bg-campus-600 hover:bg-campus-700" onClick={handleLogoutClick}>
                  <span className="flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-white bg-white/10 hover:bg-white/20" onClick={handleLoginClick}>
                  <span className="flex items-center gap-2">
                    <LogIn size={16} /> Login
                  </span>
                </Button>
                <Button className="bg-campus-600 hover:bg-campus-700" onClick={handleSignupClick}>
                  <span className="flex items-center gap-2">
                    <UserPlus size={16} /> Sign Up
                  </span>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md py-4 px-4"
        >
          <nav className="flex flex-col gap-4">
            <Link 
              to="/academic" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Academic
            </Link>
            <Link 
              to="/coding" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Coding
            </Link>
            <Link 
              to="#" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="#" 
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-3 mt-2">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" className="text-white bg-white/10 hover:bg-white/20 w-full" onClick={() => {
                    setMobileMenuOpen(false);
                    handleDashboardClick();
                  }}>
                    Dashboard
                  </Button>
                  <Button className="bg-campus-600 hover:bg-campus-700 w-full" onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogoutClick();
                  }}>
                    <span className="flex items-center justify-center gap-2">
                      <LogOut size={16} /> Logout
                    </span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="text-white bg-white/10 hover:bg-white/20 w-full" onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}>
                    <span className="flex items-center justify-center gap-2">
                      <LogIn size={16} /> Login
                    </span>
                  </Button>
                  <Button className="bg-campus-600 hover:bg-campus-700 w-full" onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}>
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus size={16} /> Sign Up
                    </span>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
