
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus, BookOpen, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('student');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Full name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms of service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Create new user data
    const userData = {
      fullName,
      email,
      password,
      accountType,
      createdAt: new Date().toISOString()
    };
    
    // Get existing users or initialize empty array
    let existingData = [];
    try {
      const storedData = localStorage.getItem('signupData');
      existingData = storedData ? JSON.parse(storedData) : [];
      
      // Ensure existingData is an array
      if (!Array.isArray(existingData)) {
        existingData = [existingData];
      }
      
      // Check if email already exists
      const emailExists = existingData.some((user: any) => user.email === email);
      if (emailExists) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: "Email already exists. Please use a different email.",
        });
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      existingData = [];
    }
    
    // Add new user
    existingData.push(userData);
    
    // Save to localStorage
    localStorage.setItem('signupData', JSON.stringify(existingData));
    
    // Success notification
    setTimeout(() => {
      toast({
        title: "Account created successfully!",
        description: "Welcome to Campus Bridge! You can now login.",
      });
      navigate('/login');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campus-800 to-gray-900 p-4">
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
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription className="text-gray-400">
                Join Campus Bridge to elevate your educational journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-500 ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-500 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-500 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accountType" className="text-white">Account Type</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-start space-x-2 mt-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className={errors.terms ? 'border-red-500' : ''}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms" className={`text-sm text-gray-300 ${errors.terms ? 'text-red-500' : ''}`}>
                        I agree to the{" "}
                        <Link to="/terms" className="text-campus-400 hover:text-campus-300">
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-campus-400 hover:text-campus-300">
                          privacy policy
                        </Link>
                      </Label>
                      {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
                    </div>
                  </div>
                  <Button type="submit" className="bg-campus-600 hover:bg-campus-700 mt-2" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <UserPlus size={16} />
                        Sign Up
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-center w-full text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-campus-400 hover:text-campus-300">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
