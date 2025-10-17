
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, UserX, Calendar, Filter, Download } from 'lucide-react';
import AttendanceChart from '../components/AttendanceChart';

// Mock data
const courses = [
  { id: "CS101", name: "Introduction to Computer Science" },
  { id: "CS201", name: "Data Structures and Algorithms" },
  { id: "CS301", name: "Database Systems" },
  { id: "CS401", name: "Web Development" }
];

const students = [
  { id: "1", name: "Sarah Shah", email: "sarah@example.edu", avatar: "data:image/jpeg;base64,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" },
  { id: "2", name: "Aditya Sharma", email: "john@example.edu", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MGHSrmaYy5I9XSKlqEhjYPEz5aM0C621DQ&s" },
  { id: "3", name: "Karan Mehta", email: "michael@example.edu", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mcKDF23ZHKZW1A2-nBALGjd-9pf_N9S8yQ&s" },
  { id: "4", name: "Sakshi Joshi", email: "emily@example.edu", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNrXKu9H_O3k91HLA5XmxW30K1ERCbaq3z0A&s" },
  { id: "5", name: "Rohit Gupta", email: "david@example.edu", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJrCdd4TohoZDEUgHaai6AFkvpEcoMpP-Ww&s" },
];

const attendanceData = [
  { subject: "CS101", present: 25, absent: 5, total: 30 },
  { subject: "CS201", present: 22, absent: 8, total: 30 },
  { subject: "CS301", present: 28, absent: 2, total: 30 },
  { subject: "CS401", present: 20, absent: 10, total: 30 }
];

const FacultyAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("CS101");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    "1": "present",
    "2": "present",
    "3": "absent",
    "4": "late",
    "5": "present"
  });

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const presentCount = Object.values(attendance).filter(status => status === 'present').length;
  const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
  const lateCount = Object.values(attendance).filter(status => status === 'late').length;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Attendance Management</h1>
            <p className="text-muted-foreground">Record and analyze student attendance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="record" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex h-auto">
            <TabsTrigger value="record">Record Attendance</TabsTrigger>
            <TabsTrigger value="history">Attendance History</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <Card>
              <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>Record student attendance for today's class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Select Course</label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.id}: {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Select Date</label>
                    <Input 
                      type="date" 
                      value={selectedDate} 
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search students..." 
                      className="pl-8" 
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-1">
                      <UserCheck className="h-4 w-4" />
                      <span>Mark All Present</span>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <img 
                                  src={student.avatar} 
                                  alt={student.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`
                                ${attendance[student.id] === 'present' ? 'bg-green-500 hover:bg-green-600' : 
                                  attendance[student.id] === 'absent' ? 'bg-red-500 hover:bg-red-600' :
                                  'bg-yellow-500 hover:bg-yellow-600'}
                              `}
                            >
                              {attendance[student.id] === 'present' ? 'Present' : 
                               attendance[student.id] === 'absent' ? 'Absent' : 'Late'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                size="sm" 
                                variant={attendance[student.id] === 'present' ? 'default' : 'outline'} 
                                className={attendance[student.id] === 'present' ? 'bg-green-500 hover:bg-green-600' : ''}
                                onClick={() => handleAttendanceChange(student.id, 'present')}
                              >
                                Present
                              </Button>
                              <Button 
                                size="sm" 
                                variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                                className={attendance[student.id] === 'absent' ? 'bg-red-500 hover:bg-red-600' : ''}
                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                              >
                                Absent
                              </Button>
                              <Button 
                                size="sm" 
                                variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                                className={attendance[student.id] === 'late' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                                onClick={() => handleAttendanceChange(student.id, 'late')}
                              >
                                Late
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Present:</span>
                      <span className="ml-1 font-medium text-green-600">{presentCount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Absent:</span>
                      <span className="ml-1 font-medium text-red-600">{absentCount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Late:</span>
                      <span className="ml-1 font-medium text-yellow-600">{lateCount}</span>
                    </div>
                  </div>
                  
                  <Button className="bg-campus-600 hover:bg-campus-700">Save Attendance</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>
                  Review past attendance records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="w-full sm:w-48">
                    <Select defaultValue="CS101">
                      <SelectTrigger>
                        <SelectValue placeholder="Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="date" className="pl-8" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Late</TableHead>
                        <TableHead>Attendance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...Array(5)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        const presentCount = 20 + Math.floor(Math.random() * 10);
                        const absentCount = 30 - presentCount;
                        const lateCount = Math.floor(Math.random() * 5);
                        
                        return (
                          <TableRow key={i}>
                            <TableCell>
                              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </TableCell>
                            <TableCell>CS101</TableCell>
                            <TableCell>{presentCount}</TableCell>
                            <TableCell>{absentCount}</TableCell>
                            <TableCell>{lateCount}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {Math.round((presentCount / 30) * 100)}%
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Statistics</CardTitle>
                <CardDescription>
                  Analytics and trends of student attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <AttendanceChart data={attendanceData} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          (attendanceData.reduce((acc, curr) => acc + curr.present, 0) / 
                          attendanceData.reduce((acc, curr) => acc + curr.total, 0)) * 100
                        )}%
                      </div>
                      <p className="text-xs text-muted-foreground">Average across all courses</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Perfect Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Students with 100% attendance</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">At Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-500">4</div>
                      <p className="text-xs text-muted-foreground">Students below 75% attendance</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FacultyAttendance;
