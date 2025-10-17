
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, CircleCheck, Clock, FileWarning } from 'lucide-react';
import AttendanceChart from '../components/AttendanceChart';
import AttendanceCalendar from '../components/AttendanceCalendar';

// Mock data - in a real app this would come from Supabase
const attendanceData = [
  { 
    subject: 'Data Structures', 
    present: 12, 
    absent: 2, 
    total: 14
  },
  { 
    subject: 'Algorithms', 
    present: 14, 
    absent: 1, 
    total: 15
  },
  { 
    subject: 'Web Development', 
    present: 10, 
    absent: 0, 
    total: 10
  },
  { 
    subject: 'Database Systems', 
    present: 11, 
    absent: 3, 
    total: 14
  },
  { 
    subject: 'Mobile App Dev', 
    present: 9, 
    absent: 4, 
    total: 13
  },
];

const attendanceRecords = [
  { 
    date: new Date(2025, 3, 1), 
    status: 'present' as const, 
    subject: 'Data Structures' 
  },
  { 
    date: new Date(2025, 3, 2), 
    status: 'present' as const, 
    subject: 'Algorithms' 
  },
  { 
    date: new Date(2025, 3, 3), 
    status: 'absent' as const, 
    subject: 'Web Development' 
  },
  { 
    date: new Date(2025, 3, 5), 
    status: 'present' as const, 
    subject: 'Database Systems' 
  },
  { 
    date: new Date(2025, 3, 7), 
    status: 'late' as const, 
    subject: 'Mobile App Dev' 
  },
  { 
    date: new Date(2025, 3, 9), 
    status: 'present' as const, 
    subject: 'Data Structures' 
  },
  { 
    date: new Date(2025, 3, 11), 
    status: 'present' as const, 
    subject: 'Algorithms' 
  },
];

const StudentAttendance = () => {
  // Calculate overall attendance percentage
  const totalClasses = attendanceData.reduce((sum, item) => sum + item.total, 0);
  const totalPresent = attendanceData.reduce((sum, item) => sum + item.present, 0);
  const overallPercentage = Math.round((totalPresent / totalClasses) * 100);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Overview</h1>
          <p className="text-muted-foreground">Track your class attendance and see detailed analytics.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Attendance
              </CardTitle>
              <CircleCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallPercentage}%</div>
              <Progress
                value={overallPercentage}
                className="h-2 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {totalPresent} of {totalClasses} classes attended
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Classes This Week
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground mt-1">
                2 already attended, 2 remaining
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Absences
              </CardTitle>
              <FileWarning className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceData.reduce((sum, item) => sum + item.absent, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all subjects
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Late Arrivals
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Marked as present but late
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex h-auto">
            <TabsTrigger value="chart">Attendance Chart</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>
                  Detailed breakdown of your attendance per subject
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceChart data={attendanceData} />
              </CardContent>
              <CardFooter className="border-t pt-5">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Minimum 75% attendance is required to appear in final exams.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <AttendanceCalendar records={attendanceRecords} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default StudentAttendance;
