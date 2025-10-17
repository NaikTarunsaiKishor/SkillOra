
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, BookOpen, FileText, Users, List, Calendar, PlusCircle, Megaphone, Settings } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import "./FacultyContent";
const FacultyDashboard = () => {
  // Sample data for courses
  const courses = [
    {
      id: '1',
      code: 'CS101',
      name: 'Introduction to Programming',
      students: 120,
      completion: 68,
      lastUpdated: '2 days ago',
    },
    {
      id: '2',
      code: 'CS205',
      name: 'Data Structures',
      students: 85,
      completion: 42,
      lastUpdated: '1 day ago',
    },
    {
      id: '3',
      code: 'CS301',
      name: 'Algorithms',
      students: 65,
      completion: 25,
      lastUpdated: 'Today',
    },
  ];

  // Sample data for recent submissions
  const recentSubmissions = [
    {
      id: '1',
      student: 'Rahul Gupta',
      assignment: 'Algorithm Analysis',
      submittedAt: '2 hours ago',
      status: 'Pending Review',
    },
    {
      id: '2',
      student: 'Sarah Parker',
      assignment: 'Linked List Implementation',
      submittedAt: '5 hours ago',
      status: 'Graded',
    },
    {
      id: '3',
      student: 'Anita Desai',
      assignment: 'Heap Sort Algorithm',
      submittedAt: '1 day ago',
      status: 'Needs Revision',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Faculty Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Professor. Here's your teaching overview.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={"/faculty/content"}>
              <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
                <PlusCircle className="h-4 w-4" />New Content
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2-100 rounded-full">
                    <BookOpen className="h-5 w-5 text-campus-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                    <h4 className="text-2xl font-bold">3</h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg--100 rounded-full">
                    <Users className="h-5 w-5 text--600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <h4 className="text-2xl font-bold">270</h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg--100 rounded-full">
                    <FileText className="h-5 w-5 text--600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                    <h4 className="text-2xl font-bold">12</h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg--100 rounded-full">
                    <BarChart className="h-5 w-5 text--600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Performance</p>
                    <h4 className="text-2xl font-bold">78%</h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course content section */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Overview of your active courses and student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead className="text-right">Students</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{course.name}</p>
                            <p className="text-xs text-muted-foreground">{course.code}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{course.students}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={course.completion} className="h-2" />
                            <span className="text-xs">{course.completion}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{course.lastUpdated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm">View All Courses</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar section */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-campus-100 text-campus-700 rounded-md flex items-center justify-center font-medium">
                        12
                      </div>
                      <span className="text-xs mt-1">Sep</span>
                    </div>
                    <div>
                      <p className="font-medium">CS101 Lecture</p>
                      <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
                      <p className="text-xs text-muted-foreground">Room 302B</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-campus-100 text-campus-700 rounded-md flex items-center justify-center font-medium">
                        12
                      </div>
                      <span className="text-xs mt-1">Sep</span>
                    </div>
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                      <p className="text-xs text-muted-foreground">Office 210</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-campus-100 text--700 rounded-md flex items-center justify-center font-medium">
                        13
                      </div>
                      <span className="text-xs mt-1">Sep</span>
                    </div>
                    <div>
                      <p className="font-medium">CS205 Lab</p>
                      <p className="text-xs text-muted-foreground">1:00 PM - 3:00 PM</p>
                      <p className="text-xs text-muted-foreground">Lab 105</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>View Full Schedule</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-start gap-2 pb-2 border-b last:border-0 last:pb-0">
                      <div
                        className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${submission.status === 'Pending Review' ? 'bg-yellow-500' :
                            submission.status === 'Graded' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{submission.student}</p>
                        <p className="text-xs">{submission.assignment}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">{submission.submittedAt}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${submission.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                              submission.status === 'Graded' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {submission.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <List className="h-4 w-4" />
                    <span>View All Submissions</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FacultyDashboard;
