
import React, { useState, useRef } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Link as LinkIcon, Upload, Plus, Calendar, Edit, Trash2, FileUp } from 'lucide-react';
import { useFacultyContent } from '../stores/facultyContentStore';
import { useToast } from "@/components/ui/use-toast";

const FacultyContent = () => {
  const { materials, addMaterial, updateMaterial, deleteMaterial, addPublishedMaterial } = useFacultyContent();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
      });
    }
  };

  // Handle material type selection
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  // Handle publish material
  const handlePublishMaterial = () => {
    if (!title.trim() || !course || !selectedType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newMaterial = {
      id: Date.now().toString(),
      title: title.trim(),
      type: selectedType,
      course,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'published',
      size: uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : '-',
      description: description.trim(),
      file: uploadedFile,
      fileUrl: uploadedFile ? URL.createObjectURL(uploadedFile) : undefined,
    };

    addMaterial(newMaterial);
    addPublishedMaterial(newMaterial);

    // Reset form
    setTitle('');
    setCourse('');
    setDescription('');
    setSelectedType('');
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast({
      title: "Material published successfully",
      description: "The material is now available to students.",
    });
  };

  // Handle save as draft
  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for the material.",
        variant: "destructive",
      });
      return;
    }

    const newMaterial = {
      id: Date.now().toString(),
      title: title.trim(),
      type: selectedType || 'document',
      course: course || 'General',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
      size: uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : '-',
      description: description.trim(),
      file: uploadedFile,
    };

    addMaterial(newMaterial);

    // Reset form
    setTitle('');
    setCourse('');
    setDescription('');
    setSelectedType('');
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast({
      title: "Draft saved",
      description: "Your material has been saved as a draft.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create Content</h1>
            <p className="text-muted-foreground">Manage and create learning materials for your courses.</p>
          </div>
          <Button className="bg-campus-600 hover:bg-campus-700">
            <Plus className="mr-2 h-4 w-4" /> New Material
          </Button>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList>
            <TabsTrigger value="create">Create Content</TabsTrigger>
            <TabsTrigger value="manage">Manage Materials</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Learning Material</CardTitle>
                <CardDescription>Create and upload content for your courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter material title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={course} onValueChange={setCourse}>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cs101">CS101 - Introduction to Programming</SelectItem>
                        <SelectItem value="cs205">CS205 - Data Structures</SelectItem>
                        <SelectItem value="cs301">CS301 - Algorithms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a description of this material"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Material Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <Button
                      variant={selectedType === 'document' ? 'default' : 'outline'}
                      className="h-auto py-4 justify-start"
                      onClick={() => handleTypeSelect('document')}
                    >
                      <div className="flex flex-col items-center w-full">
                        <FileText className="h-8 w-8 mb-2 text-blue-500" />
                        <span>Document</span>
                      </div>
                    </Button>
                    <Button
                      variant={selectedType === 'video' ? 'default' : 'outline'}
                      className="h-auto py-4 justify-start"
                      onClick={() => handleTypeSelect('video')}
                    >
                      <div className="flex flex-col items-center w-full">
                        <Video className="h-8 w-8 mb-2 text-red-500" />
                        <span>Video</span>
                      </div>
                    </Button>
                    <Button
                      variant={selectedType === 'link' ? 'default' : 'outline'}
                      className="h-auto py-4 justify-start"
                      onClick={() => handleTypeSelect('link')}
                    >
                      <div className="flex flex-col items-center w-full">
                        <LinkIcon className="h-8 w-8 mb-2 text-green-500" />
                        <span>External Link</span>
                      </div>
                    </Button>
                    <Button
                      variant={selectedType === 'quiz' ? 'default' : 'outline'}
                      className="h-auto py-4 justify-start"
                      onClick={() => handleTypeSelect('quiz')}
                    >
                      <div className="flex flex-col items-center w-full">
                        <Calendar className="h-8 w-8 mb-2 text-purple-500" />
                        <span>Quiz</span>
                      </div>
                    </Button>
                    <Button
                      variant={selectedType === 'assignment' ? 'default' : 'outline'}
                      className="h-auto py-4 justify-start"
                      onClick={() => handleTypeSelect('assignment')}
                    >
                      <div className="flex flex-col items-center w-full">
                        <FileUp className="h-8 w-8 mb-2 text-orange-500" />
                        <span>Assignment</span>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm font-medium">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOC, PPT, MP4, images up to 500MB
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.jpg,.jpeg,.png,.gif"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                    {uploadedFile && (
                      <p className="mt-2 text-sm text-green-600">
                        Selected: {uploadedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleSaveDraft}>Save as Draft</Button>
                <Button className="bg-campus-600 hover:bg-campus-700" onClick={handlePublishMaterial}>Publish Material</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Materials</CardTitle>
                <CardDescription>Manage your existing course materials</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.title}</TableCell>
                        <TableCell>
                          <Badge
                            className={`
                              ${material.type === 'document' ? 'bg-blue-500 hover:bg-blue-600' : 
                                material.type === 'video' ? 'bg-red-500 hover:bg-red-600' : 
                                material.type === 'quiz' ? 'bg-purple-500 hover:bg-purple-600' : 
                                material.type === 'link' ? 'bg-green-500 hover:bg-green-600' : 
                                'bg-orange-500 hover:bg-orange-600'}
                            `}
                          >
                            {material.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{material.course}</TableCell>
                        <TableCell>{material.createdAt}</TableCell>
                        <TableCell>
                          <Badge variant={material.status === 'published' ? 'default' : 'secondary'}>
                            {material.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{material.size}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
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
                  Showing {materials.length} materials
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Schedule</CardTitle>
                <CardDescription>Plan when materials will be available to students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Schedule Content Release</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Plan when your course materials will be released to students. Set specific dates or make content conditional based on progress.
                  </p>
                  <Button className="bg-campus-600 hover:bg-campus-700">
                    Create Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FacultyContent;
