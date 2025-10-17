
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileDown, Filter, Printer, Share2, Calendar, Clock, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const enrollmentData = [
  { name: 'Computer Science', students: 450 },
  { name: 'Information Systems', students: 320 },
  { name: 'Data Science', students: 280 },
  { name: 'Software Engineering', students: 250 },
  { name: 'Cybersecurity', students: 180 },
];

const performanceData = [
  { name: 'Computer Science', avg: 3.6 },
  { name: 'Information Systems', avg: 3.4 },
  { name: 'Data Science', avg: 3.8 },
  { name: 'Software Engineering', avg: 3.5 },
  { name: 'Cybersecurity', avg: 3.7 },
];

const progressData = [
  { month: 'Jan', completion: 65, attendance: 78 },
  { month: 'Feb', completion: 70, attendance: 82 },
  { month: 'Mar', completion: 75, attendance: 85 },
  { month: 'Apr', completion: 73, attendance: 81 },
  { month: 'May', completion: 78, attendance: 84 },
  { month: 'Jun', completion: 82, attendance: 88 },
  { month: 'Jul', completion: 79, attendance: 85 },
  { month: 'Aug', completion: 85, attendance: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminReports = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">View and generate reports on student performance and platform metrics.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <FileDown className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Report Period</CardTitle>
                <Button variant="ghost" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Select defaultValue="current">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester (Spring 2025)</SelectItem>
                  <SelectItem value="previous">Previous Semester (Fall 2024)</SelectItem>
                  <SelectItem value="year">Academic Year 2024-2025</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Last Updated</CardTitle>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">April 11, 2025</p>
                  <p className="text-xs text-muted-foreground">9:30 AM (Auto-refresh in 3 hours)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>PDF</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="performance">Academic Performance</TabsTrigger>
            <TabsTrigger value="completion">Completion Rates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Program Enrollment Distribution</CardTitle>
                  <CardDescription>Students enrolled by program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={enrollmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="students"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {enrollmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} students`, 'Enrollment']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Student Progress</CardTitle>
                  <CardDescription>Course completion and attendance rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={progressData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`]} />
                        <Legend />
                        <Line type="monotone" dataKey="completion" stroke="#8884d8" activeDot={{ r: 8 }} name="Completion Rate" />
                        <Line type="monotone" dataKey="attendance" stroke="#82ca9d" name="Attendance Rate" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Average GPA by Program</CardTitle>
                <CardDescription>Academic performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[3, 4]} />
                      <Tooltip formatter={(value) => [`GPA: ${value}`]} />
                      <Legend />
                      <Bar dataKey="avg" name="Average GPA" fill="#8884d8">
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enrollment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Analytics</CardTitle>
                <CardDescription>Detailed view of student enrollment data</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Select filters above to generate a detailed enrollment report.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance Metrics</CardTitle>
                <CardDescription>Student grades and assessment outcomes</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Select filters above to generate a detailed performance report.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Completion Analysis</CardTitle>
                <CardDescription>Course completion and dropout rates</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Select filters above to generate a detailed completion report.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminReports;
