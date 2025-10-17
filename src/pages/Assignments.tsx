
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Clock, AlertCircle, Download } from 'lucide-react';
import { useFacultyContent } from '../stores/facultyContentStore';

const assignments = [
  {
    id: '1',
    title: 'Binary Search Tree Implementation',
    course: 'Data Structures & Algorithms',
    dueDate: '2025-04-15T23:59:59',
    status: 'upcoming',
    description: 'Implement a binary search tree with insertion, deletion, and search operations. Include proper balancing techniques.',
    points: 50
  },
  {
    id: '2',
    title: 'Web Application Frontend',
    course: 'Web Development',
    dueDate: '2025-04-12T23:59:59',
    status: 'urgent',
    description: 'Create a responsive web application frontend using React and Tailwind CSS following the provided design mockups.',
    points: 60
  },
  {
    id: '3',
    title: 'Database Design Project',
    course: 'Database Systems',
    dueDate: '2025-04-20T23:59:59',
    status: 'upcoming',
    description: 'Design a normalized database schema for a healthcare management system, including entity-relationship diagrams.',
    points: 75
  },
  {
    id: '4',
    title: 'REST API Implementation',
    course: 'Web Development',
    dueDate: '2025-04-25T23:59:59',
    status: 'upcoming',
    description: 'Develop a RESTful API using Node.js and Express with proper authentication and route protection.',
    points: 80
  },
  {
    id: '5',
    title: 'Linear Regression Analysis',
    course: 'Machine Learning',
    dueDate: '2025-04-18T23:59:59',
    status: 'submitted',
    submittedDate: '2025-04-10T14:35:22',
    grade: null,
    description: 'Implement linear regression from scratch and analyze its performance on the provided dataset.',
    points: 40
  },
  {
    id: '6',
    title: 'Operating System Scheduler',
    course: 'Operating Systems',
    dueDate: '2025-04-05T23:59:59',
    status: 'graded',
    submittedDate: '2025-04-04T16:22:45',
    grade: 92,
    description: 'Implement and compare different CPU scheduling algorithms including FCFS, SJF, and Round Robin.',
    points: 70,
    feedback: 'Excellent implementation with thorough analysis of the trade-offs between different scheduling algorithms. Consider adding visualization of the process execution timeline in future work.'
  },
  {
    id: '7',
    title: 'Network Protocol Analysis',
    course: 'Computer Networks',
    dueDate: '2025-04-01T23:59:59',
    status: 'graded',
    submittedDate: '2025-04-01T22:55:10',
    grade: 85,
    description: 'Analyze network protocols using Wireshark and document the findings in a comprehensive report.',
    points: 60,
    feedback: 'Good analysis of TCP/IP protocols. The report would benefit from more detailed explanations of the packet structure and sequence diagrams.'
  }
];

// Calculate remaining time
const getRemainingTime = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  } else if (diffHrs > 0) {
    return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} left`;
  } else {
    return 'Due soon';
  }
};

const Assignments = () => {
  const { publishedMaterials } = useFacultyContent();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">Manage your course assignments and submissions.</p>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="materials">Study Materials</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="space-y-4">
            {publishedMaterials.map(material => (
              <Card key={material.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{material.title}</CardTitle>
                      <CardDescription>{material.course}</CardDescription>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  {material.description && (
                    <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{material.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Published: {material.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {material.fileUrl ? (
                    <Button className="w-full bg-campus-600 hover:bg-campus-700" asChild>
                      <a href={material.fileUrl} download={material.file?.name || material.title}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Material
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full bg-campus-600 hover:bg-campus-700" disabled>
                      <FileText className="h-4 w-4 mr-2" />
                      View Material
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
            {publishedMaterials.length === 0 && (
              <div className="text-center py-10">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Study Materials Available</h3>
                <p className="text-muted-foreground">Materials published by faculty will appear here.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {assignments.map(assignment => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.course}</CardDescription>
                    </div>
                    {assignment.status === 'urgent' && (
                      <Badge className="bg-red-500 hover:bg-red-600">Due Soon</Badge>
                    )}
                    {assignment.status === 'upcoming' && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
                    )}
                    {assignment.status === 'submitted' && (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">Submitted</Badge>
                    )}
                    {assignment.status === 'graded' && (
                      <Badge className="bg-green-500 hover:bg-green-600">Graded</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.points} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    {['upcoming', 'urgent'].includes(assignment.status) && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{getRemainingTime(assignment.dueDate)}</span>
                      </div>
                    )}
                    {assignment.grade !== undefined && assignment.grade !== null && (
                      <div className="flex items-center gap-1 ml-auto">
                        <span className="font-medium">Grade: {assignment.grade}%</span>
                      </div>
                    )}
                  </div>
                  
                  {assignment.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md border text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Instructor Feedback:</p>
                          <p className="text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      assignment.status === 'graded' ? 'bg-green-600 hover:bg-green-700' : 
                      assignment.status === 'submitted' ? 'bg-yellow-600 hover:bg-yellow-700' : 
                      'bg-campus-600 hover:bg-campus-700'
                    }`}
                  >
                    {assignment.status === 'graded' ? 'View Feedback' : 
                     assignment.status === 'submitted' ? 'View Submission' : 
                     'Begin Assignment'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            {assignments.filter(a => ['upcoming', 'urgent'].includes(a.status)).map(assignment => (
              <Card key={assignment.id} className="overflow-hidden">
                {/* Same content as above */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.course}</CardDescription>
                    </div>
                    {assignment.status === 'urgent' && (
                      <Badge className="bg-red-500 hover:bg-red-600">Due Soon</Badge>
                    )}
                    {assignment.status === 'upcoming' && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.points} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{getRemainingTime(assignment.dueDate)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-campus-600 hover:bg-campus-700">
                    Begin Assignment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="submitted" className="space-y-4">
            {assignments.filter(a => a.status === 'submitted').map(assignment => (
              <Card key={assignment.id} className="overflow-hidden">
                {/* Same content as above */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.course}</CardDescription>
                    </div>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Submitted</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.points} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    {assignment.submittedDate && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Submitted: {new Date(assignment.submittedDate).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    View Submission
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="graded" className="space-y-4">
            {assignments.filter(a => a.status === 'graded').map(assignment => (
              <Card key={assignment.id} className="overflow-hidden">
                {/* Same content as above */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.course}</CardDescription>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Graded</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.points} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    {assignment.submittedDate && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Submitted: {new Date(assignment.submittedDate).toLocaleString()}</span>
                      </div>
                    )}
                    {assignment.grade !== undefined && assignment.grade !== null && (
                      <div className="flex items-center gap-1 ml-auto">
                        <span className="font-medium">Grade: {assignment.grade}%</span>
                      </div>
                    )}
                  </div>
                  
                  {assignment.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md border text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Instructor Feedback:</p>
                          <p className="text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Feedback
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Assignments;
