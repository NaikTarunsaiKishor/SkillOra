
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Code, 
  GraduationCap, 
  Users, 
  BrainCircuit, 
  BarChart4, 
  ChevronRight,
  ArrowRight,
  LogIn,
  UserPlus
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const features = [
  {
    title: "Academic LMS",
    description: "Access courses, assignments, and educational resources all in one place.",
    icon: <BookOpen className="h-10 w-10 text-campus-600" />,
    path: "/academic",
    bgImage: "data:image/jpeg;base64,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"
  },
  {
    title: "Coding Platform",
    description: "Practice coding with an integrated editor and compiler supporting multiple languages.",
    icon: <Code className="h-10 w-10 text-campus-600" />,
    path: "/coding",
    bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Q4dZwFKNJkXqIotgYEfk6ZDHFfF1E_is-w&s"
  },
  {
    title: "AI Assistant",
    description: "Get real-time coding hints, suggestions, and personalized learning recommendations.",
    icon: <BrainCircuit className="h-10 w-10 text-campus-600" />,
    path: "/dashboard",
    bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJut4MtrXA_z1X8DRs2QBcMPF2zIPw8BBHXw&s"
  },
  {
    title: "Group Coding Rooms",
    description: "Collaborate in real-time with peers on coding projects and assignments.",
    icon: <Users className="h-10 w-10 text-campus-600" />,
    path: "/dashboard",
    bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkOAuH1lPygdV6Qo4chbmQpPoXGN_kBVzdaQ&s"
  },
  {
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics and skill heatmaps.",
    icon: <BarChart4 className="h-10 w-10 text-campus-600" />,
    path: "/progress",
    bgImage: "https://images.contentstack.io/v3/assets/blt28ff6c4a2cf43126/blte907ee5ca7d54908/64baeee1dc906c780f4b6298/Performance_Analysis_Dashboard_4_Features_Array_Item_-_features_item_image.png?auto=webp&disable=upscale&width=3840&quality=75"
  },
  {
    title: "Faculty Portal",
    description: "For educators to manage courses, assignments, and student progress.",
    icon: <GraduationCap className="h-10 w-10 text-campus-600" />,
    path: "/faculty",
    bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCOwCi52N2kDn5ywDs4VqEN26jiNUBhTlBA&s"
  }
];

const testimonials = [
  {
    name: "Sarah Jain",
    role: "Computer Science Student",
    content: "Campus Bridge has transformed my learning experience. The integrated coding platform helped me practice concepts right after learning them in lectures.",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmWYF5Guqjf78S9G4g-Fbe7gurIMpwRyItQ&s"
  },
  {
    name: "Prof. Tarun Naik",
    role: "Faculty Member",
    content: "The faculty portal makes it incredibly easy to track student progress and provide personalized guidance. I've seen a 30% improvement in student engagement.",
    avatar: "data:image/jpeg;base64,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"
  },
  {
    name: "Giri Naik",
    role: "Tech Industry Recruiter",
    content: "Students from universities using Campus Bridge consistently demonstrate stronger practical coding skills during interviews.",
    avatar: "data:image/jpeg;base64,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"
  }
];

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Add Navbar */}
      <Navbar />
      
      {/* Hero Section with Video Background and Updated Background Color */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fallback background image with new gradient background color until video loads */}
        {!isVideoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url("https://media.istockphoto.com/id/1333231964/video/university-student-friends-working-on-laptop-and-books-sitting-on-the-steps-in-the-campus.avif?s=640x640&k=20&c=zL022zfJWQ_4b6j_rG7igoUQPBXeI7hBpuMkDvM2p38=")`,
              filter: 'brightness(0.68)'
            }}
          />
        )}
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'brightness(0.4)' }}
          onLoadedData={handleVideoLoad}
        >
          <source src="https://cdn.gpteng.co/cache/c75f5a4a-58c0-4f40-8267-d6d6be10dda3/video.mp4" type="video/mp4" />
        </video>
        
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              SkillOra
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Your integrated platform for academic success and coding excellence
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-campus-600 hover:bg-campus-700 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/dashboard">Student Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/faculty">Faculty Portal</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/admin">Admin Portal</Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="ghost" className="text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300" onClick={handleLoginClick}>
                <span className="flex items-center gap-2">
                  <LogIn size={18} /> Login
                </span>
              </Button>
              <Button variant="ghost" className="text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300" onClick={handleSignupClick}>
                <span className="flex items-center gap-2">
                  <UserPlus size={18} /> Sign Up
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with 3D Carousel */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">All-in-One Education Platform</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              SkillOra integrates academic learning with practical coding skills to create a comprehensive educational experience.
            </p>
          </motion.div>

          <div className="mb-16">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <Card className="overflow-hidden h-full border-none shadow-2xl bg-black/40 backdrop-blur-sm text-white hover:shadow-[0_0_30px_rgba(123,97,255,0.3)] transition-all duration-500">
                        <div 
                          className="h-40 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${feature.bgImage})` }}
                        />
                        <CardHeader>
                          <div className="rounded-full w-16 h-16 flex items-center justify-center bg-campus-900/50 backdrop-blur-sm mb-4 border border-campus-600/50">
                            {feature.icon}
                          </div>
                          <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base text-gray-300">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="gap-1 text-campus-400 hover:text-campus-300 hover:bg-campus-900/50" asChild>
                            <Link to={feature.path}>
                              Learn more <ChevronRight size={16} />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-4">
                <CarouselPrevious className="relative static bg-campus-700 hover:bg-campus-600 text-white border-none" />
                <CarouselNext className="relative static bg-campus-700 hover:bg-campus-600 text-white border-none" />
              </div>
            </Carousel>
          </div>

          {/* Feature Showcase */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-black/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div 
                className="h-80 lg:h-auto bg-cover bg-center transition-all duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${features[activeFeature].bgImage})` }}
              />
              <div className="p-8 lg:p-12 flex items-center">
                <div>
                  <div className="inline-block p-3 bg-campus-900/70 rounded-xl mb-6">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{features[activeFeature].title}</h3>
                  <p className="text-lg text-gray-300 mb-6">{features[activeFeature].description}</p>
                  <p className="mb-8 text-gray-400">
                    Experience our comprehensive {features[activeFeature].title.toLowerCase()} module designed to enhance your educational journey.
                  </p>
                  <Button className="bg-campus-600 hover:bg-campus-700 transition-all duration-300" asChild>
                    <Link to={features[activeFeature].path} className="flex items-center gap-2">
                      Explore {features[activeFeature].title} <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center py-6 bg-black/50">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
                    activeFeature === index ? 'bg-campus-500 scale-125' : 'bg-gray-600'
                  }`}
                  onClick={() => setActiveFeature(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-campus-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of students and educators already transforming the educational experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-xl bg-black/30 backdrop-blur-sm text-white">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                    <p className="mb-6 text-gray-300">{testimonial.content}</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-campus-800 to-campus-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Learning Experience?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students and faculty already using SkillOra to transform their educational journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-campus-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/signup" className="flex items-center gap-2">
                  Get Started Now <ArrowRight size={18} />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/dashboard">
                  Explore Platform
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SkillOra</h3>
              <p className="text-gray-400">
                Integrated Academic LMS + Coding Skill Development Platform
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/academic" className="text-gray-400 hover:text-white transition-colors">Academic Courses</Link></li>
                <li><Link to="/coding" className="text-gray-400 hover:text-white transition-colors">Coding Tracks</Link></li>
                <li><Link to="/assignments" className="text-gray-400 hover:text-white transition-colors">Assignments</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-gray-400">
                <p>Email: support@Skillora.edu</p>
                <p>Phone: 8105012473 </p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 SkillOra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
