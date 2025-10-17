
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Timer, AlertCircle, CheckCircle } from 'lucide-react';

const assessments = [
  {
    id: '1',
    title: 'Midterm Examination',
    course: 'Data Structures & Algorithms',
    date: '2025-04-20T10:00:00',
    duration: '120 minutes',
    status: 'upcoming',
    description: 'Comprehensive examination covering arrays, linked lists, stacks, queues, trees, and basic algorithm analysis.',
    totalPoints: 100
  },
  {
    id: '2',
    title: 'JavaScript Quiz',
    course: 'Web Development',
    date: '2025-04-15T14:00:00',
    duration: '45 minutes',
    status: 'urgent',
    description: 'Quiz on JavaScript fundamentals, ES6 features, asynchronous programming, and DOM manipulation.',
    totalPoints: 50
  },
  {
    id: '3',
    title: 'Database Concepts Test',
    course: 'Database Systems',
    date: '2025-04-25T13:30:00',
    duration: '90 minutes',
    status: 'upcoming',
    description: 'Test covering relational database concepts, SQL queries, normalization, and transaction management.',
    totalPoints: 75
  },
  {
    id: '4',
    title: 'Operating Systems Quiz',
    course: 'Operating Systems',
    date: '2025-04-05T15:00:00',
    duration: '60 minutes',
    status: 'completed',
    completedDate: '2025-04-05T16:00:00',
    grade: 88,
    description: 'Quiz on process management, memory allocation strategies, scheduling algorithms, and file systems.',
    totalPoints: 50,
    feedback: 'Good understanding of core concepts. Review virtual memory and paging mechanisms.'
  },
  {
    id: '5',
    title: 'Network Security Assessment',
    course: 'Computer Networks',
    date: '2025-04-01T11:00:00',
    duration: '75 minutes',
    status: 'completed',
    completedDate: '2025-04-01T12:15:00',
    grade: 92,
    description: 'Assessment on network security protocols, encryption techniques, firewalls, and intrusion detection systems.',
    totalPoints: 60,
    feedback: 'Excellent comprehension of security concepts and practical applications.'
  },
  {
    id: '6',
    title: 'Machine Learning Concepts',
    course: 'Introduction to Machine Learning',
    date: '2025-04-10T09:00:00',
    duration: '90 minutes',
    status: 'completed',
    completedDate: '2025-04-10T10:30:00',
    grade: 78,
    description: 'Test on supervised and unsupervised learning, model evaluation metrics, and basic algorithms.',
    totalPoints: 80,
    feedback: 'Good grasp of basic concepts. Need improvement in understanding model evaluation metrics and cross-validation techniques.'
  }
];

// Calculate remaining time
const getRemainingTime = (date: string) => {
  const now = new Date();
  const assessmentDate = new Date(date);
  const diffMs = assessmentDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays > 7) {
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} away`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} away`;
  } else {
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs > 0) {
      return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} away`;
    } else {
      return 'Very soon';
    }
  }
};

const Assessments = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
            <p className="text-muted-foreground">View and prepare for your upcoming exams, quizzes, and tests.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessments.filter(a => a.status === 'upcoming').length}</div>
              <p className="text-xs text-muted-foreground">Scheduled assessments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessments.filter(a => a.status === 'urgent').length}</div>
              <p className="text-xs text-muted-foreground">Within 5 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessments.filter(a => a.status === 'completed').length}</div>
              <p className="text-xs text-muted-foreground">Taken assessments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  assessments
                    .filter(a => a.status === 'completed' && a.grade !== undefined)
                    .reduce((acc, curr) => acc + (curr.grade || 0), 0) / 
                  assessments.filter(a => a.status === 'completed' && a.grade !== undefined).length
                )}%
              </div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {assessments.map(assessment => (
              <Card key={assessment.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assessment.title}</CardTitle>
                      <CardDescription>{assessment.course}</CardDescription>
                    </div>
                    {assessment.status === 'urgent' && (
                      <Badge className="bg-red-500 hover:bg-red-600">Soon</Badge>
                    )}
                    {assessment.status === 'upcoming' && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
                    )}
                    {assessment.status === 'completed' && (
                      <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Date: {new Date(assessment.date).toLocaleDateString()} at {new Date(assessment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {assessment.duration}</span>
                    </div>
                    {(assessment.status === 'upcoming' || assessment.status === 'urgent') && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{getRemainingTime(assessment.date)}</span>
                      </div>
                    )}
                    {assessment.grade !== undefined && (
                      <div className="flex items-center gap-1 ml-auto">
                        <span className="font-medium">Grade: {assessment.grade}%</span>
                      </div>
                    )}
                  </div>
                  
                  {assessment.grade !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{assessment.grade}%</span>
                      </div>
                      <Progress value={assessment.grade} className="h-2" />
                    </div>
                  )}
                  
                  {assessment.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md border text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Instructor Feedback:</p>
                          <p className="text-muted-foreground">{assessment.feedback}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      assessment.status === 'completed' ? 'bg-green-600 hover:bg-green-700' : 
                      assessment.status === 'urgent' ? 'bg-red-600 hover:bg-red-700' : 
                      'bg-campus-600 hover:bg-campus-700'
                    }`}
                    disabled={assessment.status !== 'completed' && new Date(assessment.date) > new Date()}
                  >
                    {assessment.status === 'completed' ? 'View Results' : 
                     new Date(assessment.date) <= new Date() ? 'Start Assessment' : 
                     'View Details'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            {assessments.filter(a => ['upcoming', 'urgent'].includes(a.status)).map(assessment => (
              <Card key={assessment.id} className="overflow-hidden">
                {/* Same card content as above for upcoming assessments */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assessment.title}</CardTitle>
                      <CardDescription>{assessment.course}</CardDescription>
                    </div>
                    {assessment.status === 'urgent' && (
                      <Badge className="bg-red-500 hover:bg-red-600">Soon</Badge>
                    )}
                    {assessment.status === 'upcoming' && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Date: {new Date(assessment.date).toLocaleDateString()} at {new Date(assessment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {assessment.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{getRemainingTime(assessment.date)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      assessment.status === 'urgent' ? 'bg-red-600 hover:bg-red-700' : 
                      'bg-campus-600 hover:bg-campus-700'
                    }`}
                    disabled={new Date(assessment.date) > new Date()}
                  >
                    {new Date(assessment.date) <= new Date() ? 'Start Assessment' : 'View Details'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {assessments.filter(a => a.status === 'completed').map(assessment => (
              <Card key={assessment.id} className="overflow-hidden">
                {/* Same card content as above for completed assessments */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assessment.title}</CardTitle>
                      <CardDescription>{assessment.course}</CardDescription>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Date: {new Date(assessment.date).toLocaleDateString()} at {new Date(assessment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {assessment.duration}</span>
                    </div>
                    {assessment.completedDate && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Completed: {new Date(assessment.completedDate).toLocaleString()}</span>
                      </div>
                    )}
                    {assessment.grade !== undefined && (
                      <div className="flex items-center gap-1 ml-auto">
                        <span className="font-medium">Grade: {assessment.grade}%</span>
                      </div>
                    )}
                  </div>
                  
                  {assessment.grade !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{assessment.grade}%</span>
                      </div>
                      <Progress value={assessment.grade} className="h-2" />
                    </div>
                  )}
                  
                  {assessment.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md border text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Instructor Feedback:</p>
                          <p className="text-muted-foreground">{assessment.feedback}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Results
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

export default Assessments;
