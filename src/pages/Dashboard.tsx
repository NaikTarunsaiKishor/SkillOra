
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from '../components/MainLayout';
import DashboardStats from '../components/DashboardStats';
import UpcomingEvents from '../components/UpcomingEvents';
import CourseCard from '../components/CourseCard';
import CodingTrackCard from '../components/CodingTrackCard';
import { ArrowRight, BookOpen, Code, Crown, Calendar, BrainCircuit } from 'lucide-react';
import { useAIAssistantStore } from '../stores/aiAssistantStore';

const Dashboard = () => {
  const { setIsOpen } = useAIAssistantStore();
  const recentCourses = [
    {
      id: '1',
      title: 'Introduction to Data Structures',
      category: 'Computer Science',
      instructor: 'Dr. Riya sane',
      progress: 65,
      duration: '12 weeks',
      enrolledStudents: 128,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400',
      color: 'purple' as const,
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      category: 'Web Development',
      instructor: 'Prof. Amitabh Kumar',
      progress: 32,
      duration: '10 weeks',
      enrolledStudents: 215,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400',
      color: 'blue' as const,
      isNew: true,
    },
  ];

  const popularTracks = [
    {
      id: '1',
      title: 'Data Structures & Algorithms',
      language: 'Python',
      difficulty: 'Medium' as const,
      rating: 4.8,
      progress: 45,
      problemCount: 120,
      completedCount: 54,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400',
    },
    {
      id: '2',
      title: 'Web Development with React',
      language: 'JavaScript',
      difficulty: 'Easy' as const,
      rating: 4.6,
      progress: 25,
      problemCount: 85,
      completedCount: 21,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Knowledge Seeker! Here's your academic overview.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link to="/calendar">
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </Link>
            </Button>
            <Button className="gap-2 bg-campus-600 hover:bg-campus-700"
              onClick={() => setIsOpen(true)}>
              <BrainCircuit className="h-4 w-4" />
              <span>AI Assistant</span>
            </Button>
          </div>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Tabs defaultValue="academic" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="academic" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Academic Courses
                  </TabsTrigger>
                  <TabsTrigger value="coding" className="gap-2">
                    <Code className="h-4 w-4" />
                    Coding Tracks
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="academic" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recent Courses</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/academic" className="flex items-center gap-1">
                      View all courses <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      {...course}
                      onClick={() => console.log(`Navigate to course ${course.id}`)}
                    />
                  ))}
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Course Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                        <div>
                          <p className="font-medium">Data Structures</p>
                          <p className="text-xs text-muted-foreground">Room 302B</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">10:00 AM - 11:30 AM</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                        <div>
                          <p className="font-medium">Database Systems</p>
                          <p className="text-xs text-muted-foreground">Room 201A</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">1:00 PM - 2:30 PM</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                        <div>
                          <p className="font-medium">Programming Lab</p>
                          <p className="text-xs text-muted-foreground">Lab 105</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">3:00 PM - 5:00 PM</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="coding" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Popular Tracks</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/coding" className="flex items-center gap-1">
                      View all tracks <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularTracks.map((track) => (
                    <CodingTrackCard
                      key={track.id}
                      {...track}
                      onClick={() => console.log(`Navigate to track ${track.id}`)}
                    />
                  ))}
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 rounded bg-muted/50">
                        <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                          <Crown className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">7-Day Coding Streak</p>
                          <p className="text-xs text-muted-foreground">Completed problems 7 days in a row</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-auto">Today</p>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded bg-muted/50">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                          <Code className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Python Proficient</p>
                          <p className="text-xs text-muted-foreground">Completed 50 Python problems</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-auto">2 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <UpcomingEvents />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Academic</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden mb-4">
                  <div className="h-full bg-blue-600 rounded" style={{ width: '85%' }} />
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Coding Skills</span>
                  <span className="text-sm text-muted-foreground">62%</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden mb-4">
                  <div className="h-full bg-campus-600 rounded" style={{ width: '62%' }} />
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Projects</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden mb-4">
                  <div className="h-full bg-green-600 rounded" style={{ width: '45%' }} />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Goal</p>
                      <p className="text-sm text-muted-foreground">10 hours of coding practice</p>
                    </div>
                    <p className="font-medium">70%</p>
                  </div>
                  <div className="h-2 bg-muted rounded overflow-hidden mt-2">
                    <div className="h-full bg-amber-500 rounded" style={{ width: '70%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
