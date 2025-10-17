
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Users, Calendar, Settings, Eye, CheckCircle, MessageSquare, BookOpen, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseStore } from '../stores/courseStore';
import { toast } from "@/components/ui/use-toast";

const facultyCourses = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    semester: 'Spring 2025',
    students: 120,
    completion: 68,
    lastUpdated: '2 days ago',
    status: 'active',
  },
  {
    id: '2',
    code: 'CS205',
    name: 'Data Structures',
    semester: 'Spring 2025',
    students: 85,
    completion: 42,
    lastUpdated: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    code: 'CS301',
    name: 'Algorithms',
    semester: 'Spring 2025',
    students: 65,
    completion: 25,
    lastUpdated: 'Today',
    status: 'active',
  },
  {
    id: '4',
    code: 'CS401',
    name: 'Database Systems',
    semester: 'Fall 2024',
    students: 78,
    completion: 100,
    lastUpdated: '2 months ago',
    status: 'completed',
  },
  {
    id: '5',
    code: 'CS350',
    name: 'Web Development',
    semester: 'Fall 2024',
    students: 92,
    completion: 100,
    lastUpdated: '3 months ago',
    status: 'completed',
  },
  {
    id: '6',
    code: 'CS450',
    name: 'Machine Learning',
    semester: 'Summer 2025',
    students: 0,
    completion: 0,
    lastUpdated: 'Not started',
    status: 'upcoming',
  }
];

const courseStats = {
  active: facultyCourses.filter(course => course.status === 'active').length,
  total: facultyCourses.length,
  students: facultyCourses.reduce((acc, course) => acc + course.students, 0),
  avgCompletion: Math.round(facultyCourses.filter(course => course.status === 'active').reduce((acc, course) => acc + course.completion, 0) / facultyCourses.filter(course => course.status === 'active').length)
};

const FacultyCourses = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmissionsDialogOpen, setIsSubmissionsDialogOpen] = useState(false);
  const [isGradingDialogOpen, setIsGradingDialogOpen] = useState(false);
  const [isDiscussionDialogOpen, setIsDiscussionDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [gradeValue, setGradeValue] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [newCourse, setNewCourse] = useState({
    title: '',
    subject: '',
    description: '',
    instructor: '',
    image: null as File | null,
    category: '',
    duration: '',
  });

  const { addCourse } = useCourseStore();

  // Mock submissions data for demonstration
  const mockSubmissions = [
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      assignmentTitle: 'Binary Search Tree Implementation',
      submittedDate: '2025-04-10T14:30:00',
      status: 'pending',
      grade: null,
      fileName: 'bst_implementation.java',
      fileSize: '2.5 MB'
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentId: 'STU002',
      assignmentTitle: 'Web Application Frontend',
      submittedDate: '2025-04-09T16:45:00',
      status: 'graded',
      grade: 85,
      fileName: 'frontend_app.zip',
      fileSize: '15.2 MB'
    },
    {
      id: '3',
      studentName: 'Carol Davis',
      studentId: 'STU003',
      assignmentTitle: 'Database Design Project',
      submittedDate: '2025-04-11T10:20:00',
      status: 'pending',
      grade: null,
      fileName: 'database_schema.pdf',
      fileSize: '8.7 MB'
    }
  ];

  const handleViewSubmissions = (course: any) => {
    setSelectedCourse(course);
    setIsSubmissionsDialogOpen(true);
  };

  const handleGradeSubmission = (submissionId: string, grade: number) => {
    // In a real app, this would update the submission in the backend
    toast({
      title: "Grade Updated",
      description: `Submission graded with ${grade}%`,
    });
  };

  const handleOpenGradingDialog = (submission: any) => {
    setSelectedSubmission(submission);
    setGradeValue(submission.grade?.toString() || '');
    setFeedbackText('');
    setIsGradingDialogOpen(true);
  };

  const handleSubmitGrade = () => {
    if (!gradeValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a grade.",
        variant: "destructive",
      });
      return;
    }

    const grade = parseInt(gradeValue);
    if (isNaN(grade) || grade < 0 || grade > 100) {
      toast({
        title: "Error",
        description: "Grade must be a number between 0 and 100.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would update the submission in the backend
    toast({
      title: "Grade Submitted",
      description: `${selectedSubmission.studentName}'s submission graded with ${grade}%`,
    });

    setIsGradingDialogOpen(false);
    setSelectedSubmission(null);
    setGradeValue('');
    setFeedbackText('');
  };

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in title and content.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would create a discussion in the backend
    toast({
      title: "Discussion Created",
      description: "Course discussion has been posted successfully.",
    });

    setNewDiscussion({ title: '', content: '', tags: '' });
    setIsDiscussionDialogOpen(false);
  };

  // Mock discussion data
  const mockDiscussions = [
    {
      id: '1',
      title: 'Clarification on Assignment 3 Requirements',
      author: 'Dr. Sarah Johnson',
      createdAt: '2025-04-10T10:30:00',
      replies: 5,
      lastReply: '2025-04-11T14:20:00',
      tags: ['assignment', 'clarification']
    },
    {
      id: '2',
      title: 'Study Group for Midterm Exam',
      author: 'Prof. Michael Chen',
      createdAt: '2025-04-09T16:45:00',
      replies: 12,
      lastReply: '2025-04-11T09:15:00',
      tags: ['study-group', 'exam']
    }
  ];

  // Mock grades data
  const mockGrades = [
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      course: 'CS101',
      assignment: 'Binary Search Tree Implementation',
      grade: 85,
      maxGrade: 100,
      submittedDate: '2025-04-10T14:30:00',
      gradedDate: '2025-04-11T10:00:00',
      feedback: 'Excellent implementation with good understanding of BST operations.'
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentId: 'STU002',
      course: 'CS205',
      assignment: 'Web Application Frontend',
      grade: 92,
      maxGrade: 100,
      submittedDate: '2025-04-09T16:45:00',
      gradedDate: '2025-04-10T11:30:00',
      feedback: 'Outstanding work with excellent UI/UX design and clean code.'
    },
    {
      id: '3',
      studentName: 'Carol Davis',
      studentId: 'STU003',
      course: 'CS301',
      assignment: 'Database Design Project',
      grade: 78,
      maxGrade: 100,
      submittedDate: '2025-04-11T10:20:00',
      gradedDate: null,
      feedback: null
    }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCourse(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.subject || !newCourse.description || !newCourse.instructor || !newCourse.image || !newCourse.category || !newCourse.duration) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Convert image file to base64 for storage
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      addCourse({
        title: newCourse.title,
        subject: newCourse.subject,
        description: newCourse.description,
        instructor: newCourse.instructor,
        image: imageUrl,
        category: newCourse.category,
        duration: newCourse.duration,
      });

      toast({
        title: "Success",
        description: "Course created successfully!",
      });

      setNewCourse({
        title: '',
        subject: '',
        description: '',
        instructor: '',
        image: null,
        category: '',
        duration: '',
      });
      setIsDialogOpen(false);
    };
    reader.readAsDataURL(newCourse.image);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Courses</h1>
            <p className="text-muted-foreground">View and manage your teaching courses.</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isGradingDialogOpen} onOpenChange={setIsGradingDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" />
                  <span>Grading System</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Grading System</DialogTitle>
                  <DialogDescription>
                    View and manage student grades for all courses.
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="grades" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="grades">All Grades</TabsTrigger>
                    <TabsTrigger value="pending">Pending Grades</TabsTrigger>
                    <TabsTrigger value="statistics">Statistics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="grades" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-green-600">
                            {mockGrades.filter(g => g.gradedDate).length}
                          </div>
                          <p className="text-xs text-muted-foreground">Graded Submissions</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-yellow-600">
                            {mockGrades.filter(g => !g.gradedDate).length}
                          </div>
                          <p className="text-xs text-muted-foreground">Pending Grades</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(mockGrades.filter(g => g.gradedDate).reduce((acc, g) => acc + g.grade, 0) / mockGrades.filter(g => g.gradedDate).length)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Average Grade</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      {mockGrades.map((grade) => (
                        <Card key={grade.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{grade.studentName}</CardTitle>
                                <CardDescription>Student ID: {grade.studentId}</CardDescription>
                              </div>
                              <Badge
                                className={
                                  grade.gradedDate
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-yellow-500 hover:bg-yellow-600'
                                }
                              >
                                {grade.gradedDate ? 'Graded' : 'Pending'}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Course:</span> {grade.course}
                              </div>
                              <div>
                                <span className="font-medium">Assignment:</span> {grade.assignment}
                              </div>
                              <div>
                                <span className="font-medium">Submitted:</span> {new Date(grade.submittedDate).toLocaleString()}
                              </div>
                              {grade.gradedDate && (
                                <div>
                                  <span className="font-medium">Graded:</span> {new Date(grade.gradedDate).toLocaleString()}
                                </div>
                              )}
                            </div>

                            {grade.grade !== null && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Grade:</span>
                                <Badge className="bg-green-500 hover:bg-green-600">
                                  {grade.grade}/{grade.maxGrade} ({Math.round((grade.grade / grade.maxGrade) * 100)}%)
                                </Badge>
                              </div>
                            )}

                            {grade.feedback && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-md border text-sm">
                                <p className="font-medium">Feedback:</p>
                                <p className="text-muted-foreground">{grade.feedback}</p>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter>
                            {!grade.gradedDate && (
                              <Button
                                onClick={() => handleOpenGradingDialog(grade)}
                                className="bg-campus-600 hover:bg-campus-700"
                              >
                                <Star className="h-4 w-4 mr-2" />
                                Grade Submission
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4">
                    <div className="space-y-4">
                      {mockGrades.filter(g => !g.gradedDate).map((grade) => (
                        <Card key={grade.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{grade.studentName}</CardTitle>
                                <CardDescription>Student ID: {grade.studentId}</CardDescription>
                              </div>
                              <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Course:</span> {grade.course}
                              </div>
                              <div>
                                <span className="font-medium">Assignment:</span> {grade.assignment}
                              </div>
                              <div>
                                <span className="font-medium">Submitted:</span> {new Date(grade.submittedDate).toLocaleString()}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              onClick={() => handleOpenGradingDialog(grade)}
                              className="bg-campus-600 hover:bg-campus-700"
                            >
                              <Star className="h-4 w-4 mr-2" />
                              Grade Now
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="statistics" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-blue-600">{mockGrades.length}</div>
                          <p className="text-xs text-muted-foreground">Total Submissions</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-green-600">
                            {mockGrades.filter(g => g.gradedDate).length}
                          </div>
                          <p className="text-xs text-muted-foreground">Graded</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-yellow-600">
                            {mockGrades.filter(g => !g.gradedDate).length}
                          </div>
                          <p className="text-xs text-muted-foreground">Pending</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.round(mockGrades.filter(g => g.gradedDate).reduce((acc, g) => acc + g.grade, 0) / mockGrades.filter(g => g.gradedDate).length)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Class Average</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Grade Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>A (90-100%):</span>
                            <span>{mockGrades.filter(g => g.grade >= 90).length} students</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>B (80-89%):</span>
                            <span>{mockGrades.filter(g => g.grade >= 80 && g.grade < 90).length} students</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>C (70-79%):</span>
                            <span>{mockGrades.filter(g => g.grade >= 70 && g.grade < 80).length} students</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>D (60-69%):</span>
                            <span>{mockGrades.filter(g => g.grade >= 60 && g.grade < 70).length} students</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>F (Below 60%):</span>
                            <span>{mockGrades.filter(g => g.grade < 60).length} students</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsGradingDialogOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isDiscussionDialogOpen} onOpenChange={setIsDiscussionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Course Discussion</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Course Discussion Forum</DialogTitle>
                  <DialogDescription>
                    Share knowledge, ask questions, and engage with students and faculty.
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="discussions" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="discussions">All Discussions</TabsTrigger>
                    <TabsTrigger value="create">Create Discussion</TabsTrigger>
                  </TabsList>

                  <TabsContent value="discussions" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-blue-600">{mockDiscussions.length}</div>
                          <p className="text-xs text-muted-foreground">Active Discussions</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-green-600">
                            {mockDiscussions.reduce((acc, d) => acc + d.replies, 0)}
                          </div>
                          <p className="text-xs text-muted-foreground">Total Replies</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-purple-600">24</div>
                          <p className="text-xs text-muted-foreground">Active Participants</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      {mockDiscussions.map((discussion) => (
                        <Card key={discussion.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{discussion.title}</CardTitle>
                                <CardDescription>by {discussion.author}</CardDescription>
                              </div>
                              <div className="flex gap-2">
                                {discussion.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Created:</span> {new Date(discussion.createdAt).toLocaleString()}
                              </div>
                              <div>
                                <span className="font-medium">Last Reply:</span> {new Date(discussion.lastReply).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <span>{discussion.replies} replies</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              View Discussion
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="create" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create New Discussion</CardTitle>
                        <CardDescription>Start a new discussion topic for your course</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="discussion-title">Title</Label>
                          <Input
                            id="discussion-title"
                            placeholder="Enter discussion title"
                            value={newDiscussion.title}
                            onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="discussion-content">Content</Label>
                          <Textarea
                            id="discussion-content"
                            placeholder="Describe your question or topic in detail"
                            rows={6}
                            value={newDiscussion.content}
                            onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="discussion-tags">Tags (optional)</Label>
                          <Input
                            id="discussion-tags"
                            placeholder="e.g., assignment, exam, study-group (comma separated)"
                            value={newDiscussion.tags}
                            onChange={(e) => setNewDiscussion(prev => ({ ...prev, tags: e.target.value }))}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleCreateDiscussion} className="bg-campus-600 hover:bg-campus-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Post Discussion
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDiscussionDialogOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
                  <Plus className="h-4 w-4" />
                  <span>New Course</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new course that will be available to students.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                        className="col-span-3"
                        placeholder="Course Title"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject" className="text-right">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={newCourse.subject}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, subject: e.target.value }))}
                        className="col-span-3"
                        placeholder="Course Subject"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                        className="col-span-3"
                        placeholder="Course Description"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="instructor" className="text-right">
                        Instructor
                      </Label>
                      <Input
                        id="instructor"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, instructor: e.target.value }))}
                        className="col-span-3"
                        placeholder="Instructor Name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Input
                        id="category"
                        value={newCourse.category}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                        className="col-span-3"
                        placeholder="Course Category"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="duration" className="text-right">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                        className="col-span-3"
                        placeholder="e.g., 12 weeks"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Main Pic
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Course</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Link to={"./faculty/content"}>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                <span>Content</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.active}</div>
              <p className="text-xs text-muted-foreground">out of {courseStats.total} total courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.students}</div>
              <p className="text-xs text-muted-foreground">across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.avgCompletion}%</div>
              <p className="text-xs text-muted-foreground">for active courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">learning resources</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Course Management</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search courses..." 
                  className="pl-8" 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.code}</p>
                      </div>
                    </TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <div className="w-full max-w-24">
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span>{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${course.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                            course.status === 'completed' ? 'bg-blue-500 hover:bg-blue-600' : 
                            'bg-yellow-500 hover:bg-yellow-600'}
                        `}
                      >
                        {course.status === 'active' ? 'Active' : 
                          course.status === 'completed' ? 'Completed' : 
                          'Upcoming'}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={course.status === 'upcoming'}
                          title="View Submissions"
                          onClick={() => handleViewSubmissions(course)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" disabled={course.status === 'upcoming'}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" disabled={course.status === 'upcoming'}>
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" disabled={course.status === 'upcoming'}>
                          <Calendar className="h-4 w-4" />
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
              Showing {facultyCourses.length} of {facultyCourses.length} courses
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>

        {/* Submissions Dialog */}
        <Dialog open={isSubmissionsDialogOpen} onOpenChange={setIsSubmissionsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Course Submissions - {selectedCourse?.name}</DialogTitle>
              <DialogDescription>
                Review and grade student submissions for this course.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-blue-600">{mockSubmissions.length}</div>
                    <p className="text-xs text-muted-foreground">Total Submissions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-yellow-600">
                      {mockSubmissions.filter(s => s.status === 'pending').length}
                    </div>
                    <p className="text-xs text-muted-foreground">Pending Review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">
                      {mockSubmissions.filter(s => s.status === 'graded').length}
                    </div>
                    <p className="text-xs text-muted-foreground">Graded</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {mockSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{submission.studentName}</CardTitle>
                          <CardDescription>Student ID: {submission.studentId}</CardDescription>
                        </div>
                        <Badge
                          className={
                            submission.status === 'graded'
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'bg-yellow-500 hover:bg-yellow-600'
                          }
                        >
                          {submission.status === 'graded' ? 'Graded' : 'Pending'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Assignment:</span> {submission.assignmentTitle}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span> {new Date(submission.submittedDate).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">File:</span> {submission.fileName}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {submission.fileSize}
                        </div>
                      </div>

                      {submission.grade !== null && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Grade:</span>
                          <Badge className="bg-green-500 hover:bg-green-600">
                            {submission.grade}%
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Submission
                      </Button>
                      {submission.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleGradeSubmission(submission.id, 85)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Grade Submission
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubmissionsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default FacultyCourses;
