
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Clock, Calendar, FileText, Download, Bookmark, BookmarkCheck, Bell, PinOff, Pin } from 'lucide-react';
import { Circular } from '@/types';
import { format } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

// Mock data for circulars
const mockCirculars: Circular[] = [
  {
    id: '1',
    title: 'Final Examination Schedule - Spring 2025',
    content: 'The final examination schedule for Spring 2025 has been released. Please check the attached PDF for your exam dates and times. All students are required to be present 15 minutes before the scheduled exam time with their student ID cards. Any conflicts should be reported to the examination office immediately.',
    publishedAt: new Date('2025-04-10T10:00:00'),
    author: 'Examination Committee',
    department: 'Academic Affairs',
    attachments: ['final-exam-schedule-spring-2025.pdf']
  },
  {
    id: '2',
    title: 'Campus Maintenance: Network Downtime',
    content: 'Please be informed that there will be scheduled network maintenance on Saturday, April 20, 2025, from 10:00 PM to 2:00 AM. During this time, all network services including internet access, campus Wi-Fi, and learning management systems will be unavailable. We apologize for any inconvenience this may cause and thank you for your understanding.',
    publishedAt: new Date('2025-04-12T14:30:00'),
    author: 'IT Department',
    department: 'Infrastructure',
    attachments: []
  },
  {
    id: '3',
    title: 'Campus Bridge App: New Features Released',
    content: 'We are excited to announce the release of new features in the Campus Bridge application. The update includes an AI-powered IDE, improved attendance tracking, club event management, live study rooms, and an enhanced doubt discussion forum. Download the latest version to access these features. For any issues or feedback, please contact the IT support team.',
    publishedAt: new Date('2025-04-13T09:15:00'),
    author: 'Campus Technology Team',
    department: 'IT Department',
    attachments: ['campus-bridge-features.pdf', 'app-user-guide.pdf']
  },
  {
    id: '4',
    title: 'Annual Cultural Festival: Volunteers Needed',
    content: 'The Annual Cultural Festival "Harmony 2025" will be held from May 5-7, 2025. We are looking for student volunteers to help with event organization, logistics, and coordination. Interested students can register using the attached form. This is a great opportunity to gain event management experience and earn volunteer credits.',
    publishedAt: new Date('2025-04-14T11:45:00'),
    author: 'Cultural Committee',
    department: 'Student Affairs',
    attachments: ['volunteer-registration-form.docx']
  },
  {
    id: '5',
    title: 'Scholarship Applications Open for Fall 2025',
    content: 'Applications for merit-based and need-based scholarships for the Fall 2025 semester are now open. Eligible students can apply online through the student portal. The deadline for submission is May 15, 2025. Please ensure all required documents are uploaded before the deadline. For any queries, contact the Financial Aid Office.',
    publishedAt: new Date('2025-04-15T13:20:00'),
    author: 'Financial Aid Office',
    department: 'Student Services',
    attachments: ['scholarship-criteria.pdf', 'application-guidelines.pdf']
  }
];

const Circulars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [pinnedCirculars, setPinnedCirculars] = useState<string[]>(['1']);
  const [savedCirculars, setSavedCirculars] = useState<string[]>(['3']);
  const [selectedCircular, setSelectedCircular] = useState<Circular | null>(null);
  
  const allDepartments = Array.from(new Set(mockCirculars.map(c => c.department)));
  
  const filteredCirculars = mockCirculars.filter(circular => {
    const matchesSearch = circular.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          circular.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartments.length === 0 || 
                              selectedDepartments.includes(circular.department);
    
    return matchesSearch && matchesDepartment;
  });
  
  const handleDepartmentSelect = (department: string) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== department));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };
  
  const handlePinCircular = (id: string) => {
    if (pinnedCirculars.includes(id)) {
      setPinnedCirculars(pinnedCirculars.filter(cid => cid !== id));
      toast({
        title: "Circular unpinned",
        description: "The circular has been unpinned from your list.",
      });
    } else {
      setPinnedCirculars([...pinnedCirculars, id]);
      toast({
        title: "Circular pinned",
        description: "The circular has been pinned to your list for easy access.",
      });
    }
  };
  
  const handleSaveCircular = (id: string) => {
    if (savedCirculars.includes(id)) {
      setSavedCirculars(savedCirculars.filter(cid => cid !== id));
      toast({
        title: "Circular removed from saved",
        description: "The circular has been removed from your saved items.",
      });
    } else {
      setSavedCirculars([...savedCirculars, id]);
      toast({
        title: "Circular saved",
        description: "The circular has been saved to your list.",
      });
    }
  };
  
  const handleDownloadAttachment = (filename: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${filename}...`,
    });
  };
  
  const formatDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };
  
  const formatTime = (date: Date) => {
    return format(date, 'h:mm a');
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  if (selectedCircular) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedCircular(null)}>
              ← Back to Circulars
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleSaveCircular(selectedCircular.id)}
              >
                {savedCirculars.includes(selectedCircular.id) ? (
                  <BookmarkCheck size={18} className="text-campus-600" />
                ) : (
                  <Bookmark size={18} />
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handlePinCircular(selectedCircular.id)}
              >
                {pinnedCirculars.includes(selectedCircular.id) ? (
                  <Pin size={18} className="text-campus-600" />
                ) : (
                  <PinOff size={18} />
                )}
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl">{selectedCircular.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <span className="font-medium">{selectedCircular.department}</span> • Published on {formatDate(selectedCircular.publishedAt)} at {formatTime(selectedCircular.publishedAt)}
                  </CardDescription>
                </div>
                <Badge>{selectedCircular.author}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none mb-6">
                <p>{selectedCircular.content}</p>
              </div>
              
              {selectedCircular.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Attachments</h3>
                  <div className="space-y-2">
                    {selectedCircular.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-gray-500" />
                          <span>{attachment}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleDownloadAttachment(attachment)}
                        >
                          <Download size={14} />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Circulars & Notices</h1>
            <p className="text-muted-foreground">Stay updated with the latest announcements and circulars</p>
          </div>
          <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
            <Bell size={16} />
            Manage Notifications
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Circulars</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/4">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search circulars..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter size={16} />
                      Filters
                    </Button>
                  </div>
                </div>
                
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredCirculars.map((circular) => (
                    <motion.div key={circular.id} variants={itemVariants}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden" onClick={() => setSelectedCircular(circular)}>
                        {pinnedCirculars.includes(circular.id) && (
                          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 rotate-45 bg-campus-600 text-white text-xs py-1 px-6">
                            Pinned
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="pr-16">{circular.title}</CardTitle>
                              <CardDescription className="mt-1">
                                <span className="font-medium">{circular.department}</span> • {formatDate(circular.publishedAt)}
                              </CardDescription>
                            </div>
                            <Badge>{circular.author}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 line-clamp-2">{circular.content}</p>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex justify-between">
                          <div className="flex items-center gap-1">
                            {circular.attachments.length > 0 ? (
                              <>
                                <FileText size={16} className="text-muted-foreground" />
                                <span className="text-sm">{circular.attachments.length} attachment{circular.attachments.length !== 1 ? 's' : ''}</span>
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">No attachments</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveCircular(circular.id);
                              }}
                            >
                              {savedCirculars.includes(circular.id) ? (
                                <BookmarkCheck size={16} className="text-campus-600" />
                              ) : (
                                <Bookmark size={16} />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePinCircular(circular.id);
                              }}
                            >
                              {pinnedCirculars.includes(circular.id) ? (
                                <Pin size={16} className="text-campus-600" />
                              ) : (
                                <PinOff size={16} />
                              )}
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {filteredCirculars.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No circulars found</h3>
                      <p className="text-muted-foreground">Try changing your search query or filters</p>
                    </div>
                  )}
                </motion.div>
              </div>
              
              <div className="md:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Filter by Department</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {allDepartments.map(department => (
                        <div 
                          key={department}
                          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                            selectedDepartments.includes(department) ? 'bg-campus-50 text-campus-700' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleDepartmentSelect(department)}
                        >
                          <div className={`w-3 h-3 rounded-full ${
                            selectedDepartments.includes(department) ? 'bg-campus-500' : 'bg-gray-300'
                          }`}></div>
                          <span>{department}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCirculars.slice(0, 3).map((circular, index) => (
                        <div key={circular.id} className="text-sm">
                          <p className="font-medium hover:text-campus-600 cursor-pointer" onClick={() => setSelectedCircular(circular)}>
                            {circular.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(circular.publishedAt)}
                          </p>
                          {index < 2 && <Separator className="mt-3" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pinned">
            <div className="space-y-4">
              {pinnedCirculars.length > 0 ? (
                filteredCirculars
                  .filter(circular => pinnedCirculars.includes(circular.id))
                  .map((circular) => (
                    <Card key={circular.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCircular(circular)}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{circular.title}</CardTitle>
                            <CardDescription className="mt-1">
                              <span className="font-medium">{circular.department}</span> • {formatDate(circular.publishedAt)}
                            </CardDescription>
                          </div>
                          <Badge>{circular.author}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2">{circular.content}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <div className="flex items-center gap-1">
                          {circular.attachments.length > 0 ? (
                            <>
                              <FileText size={16} className="text-muted-foreground" />
                              <span className="text-sm">{circular.attachments.length} attachment{circular.attachments.length !== 1 ? 's' : ''}</span>
                            </>
                          ) : (
                            <span className="text-sm text-muted-foreground">No attachments</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePinCircular(circular.id);
                            }}
                          >
                            Unpin
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <Pin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No pinned circulars</h3>
                  <p className="text-muted-foreground">Pin important circulars for quick access</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="space-y-4">
              {savedCirculars.length > 0 ? (
                filteredCirculars
                  .filter(circular => savedCirculars.includes(circular.id))
                  .map((circular) => (
                    <Card key={circular.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCircular(circular)}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{circular.title}</CardTitle>
                            <CardDescription className="mt-1">
                              <span className="font-medium">{circular.department}</span> • {formatDate(circular.publishedAt)}
                            </CardDescription>
                          </div>
                          <Badge>{circular.author}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2">{circular.content}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <div className="flex items-center gap-1">
                          {circular.attachments.length > 0 ? (
                            <>
                              <FileText size={16} className="text-muted-foreground" />
                              <span className="text-sm">{circular.attachments.length} attachment{circular.attachments.length !== 1 ? 's' : ''}</span>
                            </>
                          ) : (
                            <span className="text-sm text-muted-foreground">No attachments</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveCircular(circular.id);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No saved circulars</h3>
                  <p className="text-muted-foreground">Save important circulars for future reference</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Circulars;
