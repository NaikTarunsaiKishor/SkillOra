
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Mail, UserCog, Eye, Calendar, ShieldAlert } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const faculty = [
  {
    id: '1',
    name: 'Dr. Karthik Sharma',
    email: 'jane.smith@faculty.edu',
    department: 'Computer Science',
    courses: 3,
    students: 270,
    status: 'active',
    joinDate: '2021-09-01',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgstOCUFQdogJ17hmBycf3IEeR0Xbb0ubZIg&s'
  },
  {
    id: '2',
    name: 'Prof. Srisha Menon',
    email: 'michael.j@faculty.edu',
    department: 'Computer Science',
    courses: 2,
    students: 180,
    status: 'active',
    joinDate: '2022-01-15',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnSbnGVB5QG8wKE5MCwmxygMKp0D98AGXHVw&s'
  },
  {
    id: '3',
    name: 'Dr. Sarah Chopra',
    email: 'sarah.c@faculty.edu',
    department: 'Information Systems',
    courses: 2,
    students: 150,
    status: 'on leave',
    joinDate: '2020-08-10',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7yh293WhdBrmoFe2zLPl2kVBLUagVVtizA&s'
  },
  {
    id: '4',
    name: 'Prof. Rohan Wadhwa',
    email: 'robert.w@faculty.edu',
    department: 'Computer Science',
    courses: 2,
    students: 195,
    status: 'active',
    joinDate: '2019-05-20',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQga4elsMyLDzpvlQEoxIBvoE4IEeqac9Jopg&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7yh293WhdBrmoFe2zLPl2kVBLUagVVtizA&s'
  },
  {
    id: '5',
    name: 'Dr. Maya Iyer',
    email: 'emily.r@faculty.edu',
    department: 'Data Science',
    courses: 1,
    students: 85,
    status: 'active',
    joinDate: '2023-01-10',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYPHWdlRXMUheZjUjDwrd9lGoBimVP1ykZJQ&s'
  },
  {
    id: '6',
    name: 'Prof. David Kumar',
    email: 'david.k@faculty.edu',
    department: 'Software Engineering',
    courses: 3,
    students: 245,
    status: 'active',
    joinDate: '2022-06-15',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRdoghUHZ9lqtgFNHnYkmcph56dC2vam-8A&s'
  }
];

const AdminFaculty = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Faculty Management</h1>
            <p className="text-muted-foreground">Manage faculty members and their course assignments.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              <span>Email All</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Add Faculty</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faculty.length}</div>
              <p className="text-xs text-muted-foreground">across all departments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faculty.filter(f => f.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">currently teaching</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Courses Taught</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faculty.reduce((acc, curr) => acc + curr.courses, 0)}</div>
              <p className="text-xs text-muted-foreground">this semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(faculty.map(f => f.department)).size}</div>
              <p className="text-xs text-muted-foreground">represented</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Faculty Directory</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search faculty..." 
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
                  <TableHead>Department</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculty.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.courses}</TableCell>
                    <TableCell>{member.students}</TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${member.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                            'bg-yellow-500 hover:bg-yellow-600'}
                        `}
                      >
                        {member.status === 'active' ? 'Active' : 'On Leave'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Calendar className="h-4 w-4" />
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
              Showing {faculty.length} faculty members
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

export default AdminFaculty;
