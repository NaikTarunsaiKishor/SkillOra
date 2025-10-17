
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Mail, UserCog, Eye, ShieldAlert, FileText } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const students = [
  {
    id: '1',
    name: 'Sai Nair',
    email: 'sarah.j@example.edu',
    program: 'Computer Science',
    year: 'Junior',
    gpa: 3.8,
    courses: 5,
    status: 'active',
    avatar: 'data:image/jpeg;base64,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',
  },
  {
    id: '2',
    name: 'Jitesh Kumar',
    email: 'john.smith@example.edu',
    program: 'Computer Science',
    year: 'Senior',
    gpa: 3.5,
    courses: 4,
    status: 'active',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgstOCUFQdogJ17hmBycf3IEeR0Xbb0ubZIg&s',
  },
  {
    id: '3',
    name: 'Mukesh Chandra',
    email: 'michael.c@example.edu',
    program: 'Information Systems',
    year: 'Sophomore',
    gpa: 3.9,
    courses: 5,
    status: 'active',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8m3hzNZiiasSlxCnNr5X1nSX3Wm2xuSnAA&s',
  },
  {
    id: '4',
    name: 'Riya Patel',
    email: 'emily.r@example.edu',
    program: 'Data Science',
    year: 'Junior',
    gpa: 3.2,
    courses: 5,
    status: 'probation',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGCPx5PshVTSzM0kXfx6NesuMJoZcEmX66g&s',
  },
  {
    id: '5',
    name: 'Shaira sharma',
    email: 'david.w@example.edu',
    program: 'Computer Science',
    year: 'Freshman',
    gpa: 3.6,
    courses: 6,
    status: 'active',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmyKrr65T2OWElRsDZ2yLZ5_h-cBNghsmv1Q&s',
  },
  {
    id: '6',
    name: 'Lavanya Nair',
    email: 'lisa.w@example.edu',
    program: 'Software Engineering',
    year: 'Senior',
    gpa: 3.7,
    courses: 4,
    status: 'active',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_C_2sBnm2eeS93DpMwDxCfMxSQiBJwl2GOA&s',
  },
  {
    id: '7',
    name: 'Rohan Gupta',
    email: 'robert.g@example.edu',
    program: 'Computer Science',
    year: 'Sophomore',
    gpa: 2.8,
    courses: 5,
    status: 'probation',
    avatar: 'data:image/jpeg;base64,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',
  },
  {
    id: '8',
    name: 'Akansha Singh',
    email: 'jennifer.l@example.edu',
    program: 'Information Systems',
    year: 'Junior',
    gpa: 3.5,
    courses: 5,
    status: 'active',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMY_S5o_XumaP234-_A-6OC4U7hJ3zIPl9kQ&s',
  }
];

const formatGPA = (gpa: number) => gpa.toFixed(1);

const AdminStudents = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground">Oversee student enrollment, academic status, and progress.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Add Student</span>
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
              <p className="text-xs text-muted-foreground">currently enrolled</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatGPA(students.reduce((acc, curr) => acc + curr.gpa, 0) / students.length)}
              </div>
              <p className="text-xs text-muted-foreground">across all students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(students.map(s => s.program)).size}</div>
              <p className="text-xs text-muted-foreground">study areas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Academic Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.filter(s => s.status === 'probation').length}</div>
              <p className="text-xs text-muted-foreground">students on probation</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Student Directory</CardTitle>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${student.gpa < 3.0 ? 'text-red-600' : student.gpa >= 3.7 ? 'text-green-600' : ''}`}>
                          {formatGPA(student.gpa)}
                        </span>
                        <Progress 
                          value={(student.gpa / 4) * 100} 
                          className={`h-2 w-12 ${
                            student.gpa < 3.0 ? 'bg-red-100' : 
                            student.gpa >= 3.7 ? 'bg-green-100' : 
                            'bg-gray-100'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{student.courses}</TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${student.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                            'bg-red-500 hover:bg-red-600'}
                        `}
                      >
                        {student.status === 'active' ? 'Active' : 'Probation'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <UserCog className="h-4 w-4" />
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

export default AdminStudents;
