import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { BarChart, Bell, Calendar, Code as CodeIcon, FileText, GraduationCap, PieChart, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts
const facultyData = [
  { name: 'Computer Science', count: 18 },
  { name: 'Data Science', count: 12 },
  { name: 'Software Eng.', count: 15 },
  { name: 'AI/ML', count: 8 },
  { name: 'Cybersecurity', count: 6 },
];

const studentEnrollmentData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 150 },
  { month: 'Mar', students: 200 },
  { month: 'Apr', students: 180 },
  { month: 'May', students: 250 },
  { month: 'Jun', students: 280 },
];

const courseCompletionData = [
  { name: 'Computer Science', value: 78 },
  { name: 'Data Science', value: 65 },
  { name: 'AI/ML', value: 82 },
  { name: 'Cybersecurity', value: 70 },
  { name: 'Web Development', value: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Faculty data
const facultyList = [
  {
    id: 1,
    name: 'Dr. Anitha Das',
    department: 'Computer Science',
    students: 124,
    courses: 4,
    rating: 4.8,
    avatar: 'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    name: 'Prof. Manohar Singh',
    department: 'Data Science',
    students: 95,
    courses: 3,
    rating: 4.5,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgstOCUFQdogJ17hmBycf3IEeR0Xbb0ubZIg&s',
  },
  {
    id: 3,
    name: 'Dr. Ramachandran Iyer',
    department: 'AI/ML',
    students: 78,
    courses: 3,
    rating: 4.7,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_wFQ_aTpsWNsC4j2ektCOoZPRzDE3UymFw&s',
  },
  {
    id: 4,
    name: 'Prof. Kavya Nair',
    department: 'Cybersecurity',
    students: 65,
    courses: 2,
    rating: 4.6,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ98zjBCJSPRKco4l2T6AWwUj-3HH4yn3jI6A&s',
  },
];

// Recent activity data
const recentActivity = [
  {
    id: 1,
    action: 'New Faculty Added',
    details: 'Dr. Ramachandra was added to the Software Engineering department',
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 'Course Updated',
    details: 'Advanced Machine Learning curriculum was updated with new modules',
    time: '5 hours ago',
  },
  {
    id: 3,
    action: 'Report Generated',
    details: 'Monthly performance analytics report was generated',
    time: '1 day ago',
  },
  {
    id: 4,
    action: 'Student Batch Approved',
    details: '45 new students were approved for the Fall 2024 semester',
    time: '2 days ago',
  },
];

const AdminDashboard = () => {
  const [period, setPeriod] = useState('6m');

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Comprehensive overview of platform performance and metrics
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1">
              <FileText size={16} /> Export Report
            </Button>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
                    <h3 className="text-3xl font-bold">3,426</h3>
                    <p className="text-sm text--600 mt-1 flex items-center">
                      <span className="text--600 mr-1">↑</span> 12% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg--100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text--600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Faculty</p>
                    <h3 className="text-3xl font-bold">158</h3>
                    <p className="text-sm text--600 mt-1 flex items-center">
                      <span className="text--600 mr-1">↑</span> 5% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg--100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text--600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Active Courses</p>
                    <h3 className="text-3xl font-bold">86</h3>
                    <p className="text-sm -600 mt-1 flex items-center">
                      <span className="text--600 mr-1">↑</span> 8% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg--100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text--600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Coding Submissions</p>
                    <h3 className="text-3xl font-bold">15,240</h3>
                    <p className="text-sm text--600 mt-1 flex items-center">
                      <span className="text--600 mr-1">↑</span> 18% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg--100 rounded-full flex items-center justify-center">
                    <CodeIcon className="h-6 w-6 text--600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty by Department */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Faculty by Department</CardTitle>
              <CardDescription>Distribution across academic departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={facultyData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Student Enrollment Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Student Enrollment Trend</CardTitle>
              <CardDescription>Monthly student enrollment data for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={studentEnrollmentData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Faculty List and Course Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Top Faculty Members</CardTitle>
              <CardDescription>Faculty ranked by student ratings and course participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facultyList.map((faculty) => (
                  <div
                    key={faculty.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={faculty.avatar} alt={faculty.name} />
                        <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{faculty.name}</p>
                        <p className="text-sm text-gray-500">{faculty.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{faculty.students}</p>
                        <p className="text-gray-500">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{faculty.courses}</p>
                        <p className="text-gray-500">Courses</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{faculty.rating}</p>
                        <p className="text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Faculty</Button>
            </CardFooter>
          </Card>

          {/* Course Completion */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Course Completion Rates</CardTitle>
              <CardDescription>Average student completion by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={courseCompletionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {courseCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Upcoming Events */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          {/* Recent Activity */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>Latest events and administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>

          {/* Upcoming Events */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar size={20} />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium">Faculty Training Workshop</p>
                  <p className="text-sm text-gray-600">Introduction to AI-assisted teaching tools</p>
                  <p className="text-xs text-gray-500 mt-1">Tomorrow, 9:00 AM - 12:00 PM</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium">Semester Planning Meeting</p>
                  <p className="text-sm text-gray-600">Discussion of Fall 2024 curriculum changes</p>
                  <p className="text-xs text-gray-500 mt-1">June 15, 2:00 PM - 4:00 PM</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                  <p className="font-medium">System Maintenance</p>
                  <p className="text-sm text-gray-600">Platform will be offline for updates</p>
                  <p className="text-xs text-gray-500 mt-1">June 18, 10:00 PM - 2:00 AM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Bell size={16} /> Set Reminders
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
