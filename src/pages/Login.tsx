
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email format is invalid');
      isValid = false;
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Check if credentials match the demo accounts
    if (email === 'student@example.com' && password === 'password') {
      loginSuccess('student');
    } else if (email === 'faculty@example.com' && password === 'password') {
      loginSuccess('faculty');
    } else if (email === 'admin@example.com' && password === 'password') {
      loginSuccess('admin');
    } else {
      // Check if the user has signed up previously
      const signupData = localStorage.getItem('signupData');
      
      if (signupData) {
        try {
          const users = JSON.parse(signupData);
          const user = Array.isArray(users) ? 
            users.find(u => u.email === email && u.password === password) : 
            (users.email === email && users.password === password ? users : null);
          
          if (user) {
            // User found, determine account type
            const accountType = Array.isArray(users) ? user.accountType : users.accountType;
            loginSuccess(accountType || 'student');
          } else {
            loginFailed();
          }
        } catch (error) {
          console.error("Error parsing signup data:", error);
          loginFailed();
        }
      } else {
        loginFailed();
      }
    }
    
    setLoading(false);
  };
  
  const loginSuccess = (userType: string) => {
    toast({
      title: "Login successful",
      description: `Welcome back to Campus Bridge!`,
    });
    localStorage.setItem('userType', userType);
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect based on user type
    if (userType === 'student') {
      navigate('/dashboard');
    } else if (userType === 'faculty') {
      navigate('/faculty');
    } else if (userType === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };
  
  const loginFailed = () => {
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Please check your email and password.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campus-900 to-gray-900 p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ 
          backgroundImage: `url(${'/lovable-uploads/e3d42942-9158-456b-ada5-fb45c0b9da57.png'})`,
        }}
      />
      
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" size="sm" className="text-white" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none bg-black/30 backdrop-blur-md text-white shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-campus-800 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Login to SkillOra</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-500 ${emailError ? 'border-red-500' : ''}`}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-campus-400 hover:text-campus-300">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-500 ${passwordError ? 'border-red-500' : ''}`}
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                  </div>
                  <Button type="submit" className="bg-campus-600 hover:bg-campus-700" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Logging in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn size={16} />
                        Login
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-gray-400">
                <span>Demo accounts:</span>
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <div className="bg-white/10 rounded p-2">
                    <p className="font-medium">Student</p>
                    <p>student@example.com</p>
                    <p>password</p>
                  </div>
                  <div className="bg-white/10 rounded p-2">
                    <p className="font-medium">Faculty</p>
                    <p>faculty@example.com</p>
                    <p>password</p>
                  </div>
                  <div className="bg-white/10 rounded p-2">
                    <p className="font-medium">Admin</p>
                    <p>admin@example.com</p>
                    <p>password</p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-campus-400 hover:text-campus-300">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
