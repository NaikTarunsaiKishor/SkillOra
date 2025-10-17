
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, Mail, FilePlus, UserCog, TrendingUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const students = [
  {
    id: '1',
    name: 'Sarah shah',
    email: 'sarah.j@example.edu',
    courses: ['CS101', 'CS205'],
    grade: '92%',
    attendance: '95%',
    status: 'active',
    avatar: 'data:image/jpeg;base64,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',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Aditya Sharma',
    email: 'john.smith@example.edu',
    courses: ['CS101', 'CS301'],
    grade: '87%',
    attendance: '82%',
    status: 'active',
    avatar: 'data:image/jpeg;base64,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',
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Karan Mehta',
    email: 'michael.c@example.edu',
    courses: ['CS205'],
    grade: '95%',
    attendance: '98%',
    status: 'active',
    avatar: 'data:image/jpeg;base64,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',
    lastActive: '3 hours ago'
  },
  {
    id: '4',
    name: 'Saili Patel',
    email: 'emily.r@example.edu',
    courses: ['CS101', 'CS301'],
    grade: '78%',
    attendance: '75%',
    status: 'at-risk',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNrXKu9H_O3k91HLA5XmxW30K1ERCbaq3z0A&s',
    lastActive: '5 days ago'
  },
  {
    id: '5',
    name: 'Dharmesh Wagle',
    email: 'david.w@example.edu',
    courses: ['CS301'],
    grade: '83%',
    attendance: '89%',
    status: 'active',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuc3qA3zbt6mhhMQFUmPFvPSU-vSnkyIqEXQ&s',
    lastActive: '1 day ago'
  },
  {
    id: '6',
    name: 'Sakshi Joshi',
    email: 'lisa.w@example.edu',
    courses: ['CS101', 'CS205'],
    grade: '91%',
    attendance: '93%',
    status: 'active',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HqFjMzVFxCvVyypdRKnd7_wxVoRMCyv7aA&s',
    lastActive: '4 hours ago'
  },
  {
    id: '7',
    name: 'Rohit Gupta',
    email: 'robert.g@example.edu',
    courses: ['CS101'],
    grade: '65%',
    attendance: '70%',
    status: 'at-risk',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_fsNtxOqZjEf0wYIyIYZhOPz9hAesGVvH9g&s',
    lastActive: '1 week ago'
  },
  {
    id: '8',
    name: 'Janvi wagh',
    email: 'jennifer.l@example.edu',
    courses: ['CS205', 'CS301'],
    grade: '88%',
    attendance: '91%',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150',
    lastActive: '2 days ago'
  }
];

const FacultyStudents = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground">View and manage students across your courses.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              <span>Email All</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <FilePlus className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  students.reduce((acc, student) => acc + parseInt(student.grade), 0) / 
                  students.length
                )}%
              </div>
              <p className="text-xs text-muted-foreground">class performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  students.reduce((acc, student) => acc + parseInt(student.attendance), 0) / 
                  students.length
                )}%
              </div>
              <p className="text-xs text-muted-foreground">class participation</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.filter(student => student.status === 'at-risk').length}</div>
              <p className="text-xs text-muted-foreground">need attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Students</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search students..." 
                  className="pl-8" 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.courses.map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-24">
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span>{student.grade}</span>
                        </div>
                        <Progress 
                          value={parseInt(student.grade)} 
                          className={`h-2 ${
                            parseInt(student.grade) < 70 ? 'bg-red-100' : 
                            parseInt(student.grade) < 80 ? 'bg-yellow-100' : 
                            'bg-green-100'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-24">
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span>{student.attendance}</span>
                        </div>
                        <Progress 
                          value={parseInt(student.attendance)} 
                          className={`h-2 ${
                            parseInt(student.attendance) < 75 ? 'bg-red-100' : 
                            parseInt(student.attendance) < 85 ? 'bg-yellow-100' : 
                            'bg-green-100'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${student.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                            'bg-red-500 hover:bg-red-600'}
                        `}
                      >
                        {student.status === 'active' ? 'Active' : 'At Risk'}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <TrendingUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {students.length} students
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FacultyStudents;
