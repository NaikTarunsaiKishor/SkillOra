
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useCourseStore } from '../stores/courseStore';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

const courses = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    category: 'Computer Science',
    instructor: 'Dr. Jane Smith',
    progress: 65,
    duration: '12 weeks',
    enrolledStudents: 128,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400',
    color: 'purple' as const,
    description: 'Learn the fundamentals of computer science, including algorithms, data structures, and basic programming concepts.',
  },
  {
    id: '2',
    title: 'Web Development Fundamentals',
    category: 'Web Development',
    instructor: 'Prof. Mike Johnson',
    progress: 32,
    duration: '10 weeks',
    enrolledStudents: 215,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400',
    color: 'blue' as const,
    isNew: true,
    description: 'Master the basics of web development including HTML, CSS, and JavaScript. Build responsive websites from scratch.',
  },
  {
    id: '4',
    title: 'Database Management Systems',
    category: 'Database',
    instructor: 'Prof. Lisa Wang',
    progress: 78,
    duration: '8 weeks',
    enrolledStudents: 110,
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=400',
    color: 'orange' as const,
    description: 'Learn database design, implementation, and management using SQL and NoSQL systems.',
  },
  {
    id: '5',
    title: 'Machine Learning Fundamentals',
    category: 'AI & ML',
    instructor: 'Dr. Sarah Johnson',
    progress: 12,
    duration: '16 weeks',
    enrolledStudents: 150,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400',
    color: 'purple' as const,
    isNew: true,
    description: 'Introduction to machine learning concepts, algorithms, and practical applications using Python.',
  },
  {
    id: '6',
    title: 'Operating Systems',
    category: 'Computer Science',
    instructor: 'Dr. Michael Brown',
    progress: 85,
    duration: '10 weeks',
    enrolledStudents: 75,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400',
    color: 'blue' as const,
    description: 'Understand operating system principles, process management, memory allocation, and file systems.',
  },
  {
    id: '7',
    title: 'Computer Networks',
    category: 'Networking',
    instructor: 'Prof. Alex Rodriguez',
    progress: 50,
    duration: '12 weeks',
    enrolledStudents: 90,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400',
    color: 'green' as const,
    description: 'Explore network protocols, architectures, security, and implementation of computer networks.',
  },
  {
    id: '8',
    title: 'Mobile App Development',
    category: 'Mobile Dev',
    instructor: 'Dr. Emily Chen',
    progress: 0,
    duration: '10 weeks',
    enrolledStudents: 120,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400',
    color: 'orange' as const,
    isNew: true,
    description: 'Learn to develop mobile applications for iOS and Android platforms using React Native.',
  },
  {
    id: '9',
    title: 'Cybersecurity Fundamentals',
    category: 'Security',
    instructor: 'Prof. David Wilson',
    progress: 0,
    duration: '14 weeks',
    enrolledStudents: 85,
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=400',
    color: 'purple' as const,
    description: 'Introduction to cybersecurity concepts, threat models, security protocols, and ethical hacking.',
  },
  {
    id: '10',
    title: 'Cloud Computing',
    category: 'Cloud',
    instructor: 'Dr. Maria Lopez',
    progress: 0,
    duration: '8 weeks',
    enrolledStudents: 100,
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=400',
    color: 'blue' as const,
    description: 'Explore cloud architectures, services, deployment models, and security considerations.',
  },
];

const AcademicCourses = () => {
  const { courses, enrollInCourse } = useCourseStore();
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course);
    setEnrollDialogOpen(true);
  };

  const confirmEnrollment = () => {
    if (selectedCourse) {
      enrollInCourse(selectedCourse.id);
      toast({
        title: "Enrolled Successfully!",
        description: `You have been enrolled in ${selectedCourse.title}. Your course has started!`,
      });
      setEnrollDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Academic Courses</h1>
            <p className="text-muted-foreground">Browse and enroll in a wide range of academic courses.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search courses..." 
              className="pl-8" 
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category}</CardDescription>
                      </div>
                      {course.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Instructor: {course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{course.enrolledStudents} students</span>
                      {course.progress > 0 ? (
                        <span className="text-green-600 font-medium">{course.progress}% completed</span>
                      ) : (
                        <span className="text-blue-600 font-medium">Not enrolled</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      onClick={() => course.progress > 0 ? null : handleEnrollClick(course)}
                    >
                      {course.progress > 0 ? 'Continue Course' : 'Enroll Now'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="enrolled">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => course.progress > 0).map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    <div className="flex justify-between text-sm mb-3">
                      <span>Instructor: {course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-campus-600 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-sm text-green-600 font-medium">{course.progress}% completed</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      onClick={() => course.progress > 0 ? null : handleEnrollClick(course)}
                    >
                      Continue Course
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="text-center py-12">
              <p className="text-muted-foreground">You have not completed any courses yet.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => course.isNew).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category}</CardDescription>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Instructor: {course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      onClick={() => handleEnrollClick(course)}
                    >
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Enrollment</DialogTitle>
              <DialogDescription>
                Are you sure you want to enroll in "{selectedCourse?.title}"? Once enrolled, your course will start immediately.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEnrollDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmEnrollment}>
                Enroll & Start Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default AcademicCourses;
