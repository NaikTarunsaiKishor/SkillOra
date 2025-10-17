
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, ThumbsUp, Send, Code, FileText, Search, Filter, Calendar, User, Clock, BookOpen } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: Date;
  tags: string[];
  likes: number;
  replies: Reply[];
  solved: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: Date;
  isAnswer: boolean;
  likes: number;
}

// Mock data for discussions
const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'How to implement a binary search tree in Java?',
    content: "I'm trying to implement a binary search tree in Java, but I'm having trouble with the delete operation. Can someone explain how to properly handle node deletion when the node has two children?",
    author: {
      name: 'Saniya Chaudhary',
      avatar: 'data:image/jpeg;base64,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',
      role: 'student'
    },
    createdAt: new Date('2025-04-10T14:30:00'),
    tags: ['Java', 'Data Structures', 'Binary Trees'],
    likes: 8,
    replies: [
      {
        id: '1-1',
        content: "When deleting a node with two children, you need to find the in-order successor (the smallest value in the right subtree) or the in-order predecessor (the largest value in the left subtree) to replace the node you're deleting. Here's some code that demonstrates this approach:\n```java\nprivate Node deleteNode(Node root, int key) {\n    if (root == null) return null;\n    \n    if (key < root.value) {\n        root.left = deleteNode(root.left, key);\n    } else if (key > root.value) {\n        root.right = deleteNode(root.right, key);\n    } else {\n        // Node with only one child or no child\n        if (root.left == null) return root.right;\n        if (root.right == null) return root.left;\n        \n        // Node with two children\n        // Get the inorder successor (smallest in the right subtree)\n        root.value = minValue(root.right);\n        \n        // Delete the inorder successor\n        root.right = deleteNode(root.right, root.value);\n    }\n    \n    return root;\n}\n\nprivate int minValue(Node root) {\n    int minValue = root.value;\n    while (root.left != null) {\n        minValue = root.left.value;\n        root = root.left;\n    }\n    return minValue;\n}\n```",
        author: {
          name: 'Dr. Rajesh manholtra',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdrnycAZTwDws7Yjd95LgA2m9Z3jXDEEAQLw&s',
          role: 'faculty'
        },
        createdAt: new Date('2025-04-10T15:45:00'),
        isAnswer: true,
        likes: 15
      },
      {
        id: '1-2',
        content: "Thank you Dr. Johnson! That was really helpful. I implemented your solution and it works perfectly.",
        author: {
          name: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150',
          role: 'student'
        },
        createdAt: new Date('2025-04-10T16:30:00'),
        isAnswer: false,
        likes: 2
      }
    ],
    solved: true
  },
  {
    id: '2',
    title: 'Understanding React Hooks: useEffect dependency array',
    content: "I'm new to React and I'm trying to understand the dependency array in useEffect. When should I include variables in the dependency array and what happens if I leave it empty? Also, what's the difference between not providing a dependency array at all versus providing an empty one?",
    author: {
      name: 'Aradya Singh',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPa05QDBDF7Zv7FL3_t0sNhxI9XlFv2gecgA&s',
      role: 'student'
    },
    createdAt: new Date('2025-04-12T09:15:00'),
    tags: ['React', 'JavaScript', 'Hooks'],
    likes: 12,
    replies: [
      {
        id: '2-1',
        content: "Great question! The dependency array in useEffect determines when the effect should run:\n\n1. No dependency array: The effect runs after every render\n2. Empty dependency array `[]`: The effect runs only after the initial render (similar to componentDidMount)\n3. With dependencies `[a, b]`: The effect runs after the initial render and whenever any of the dependencies (a or b) change.\n\nYou should include any variables from the component scope (like props, state, or values derived from them) that your effect uses. If you don't, you might experience bugs due to stale closures.\n\nHere's an example:\n```jsx\n// Runs after every render\nuseEffect(() => {\n  console.log('Component rendered');\n});\n\n// Runs only after the initial render\nuseEffect(() => {\n  console.log('Component mounted');\n}, []);\n\n// Runs after initial render and when count changes\nuseEffect(() => {\n  console.log('Count changed:', count);\n}, [count]);\n```",
        author: {
          name: 'Tom Wilson',
          avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150',
          role: 'student'
        },
        createdAt: new Date('2025-04-12T10:20:00'),
        isAnswer: true,
        likes: 18
      }
    ],
    solved: true
  },
  {
    id: '3',
    title: 'Optimizing SQL queries for large datasets',
    content: "I'm working with a database that has grown significantly over time, and I'm noticing that some of my queries are taking too long to execute. The main table has over 5 million records, and I need to join it with several other tables. Are there any general best practices for optimizing SQL queries for large datasets?",
    author: {
      name: 'Kishor Kumar',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_1yCjwhWk_U5HOjUJBtt-zhyFJMV1nkT5g&s',
      role: 'student'
    },
    createdAt: new Date('2025-04-11T13:45:00'),
    tags: ['SQL', 'Database', 'Performance'],
    likes: 10,
    replies: [],
    solved: false
  }
];

const DoubtDiscussion = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newReply, setNewReply] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [activeTab, setActiveTab] = useState('browse');
  
  const allTags = Array.from(new Set(mockDiscussions.flatMap(d => d.tags)));
  
  const filteredDiscussions = mockDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => discussion.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !selectedDiscussion) return;
    
    toast({
      title: "Reply posted",
      description: "Your response has been posted successfully.",
    });
    
    // In a real app, we would update the state or call an API
    setNewReply('');
  };
  
  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
    toast({
      title: "Question posted",
      description: "Your question has been posted successfully.",
    });
    
    // In a real app, we would update the state or call an API
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return date.toLocaleDateString();
    }
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
  
  if (selectedDiscussion) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedDiscussion(null)}>
              ← Back to Discussions
            </Button>
            <Badge variant={selectedDiscussion.solved ? "default" : "outline"} className={selectedDiscussion.solved ? "bg-green-500" : ""}>
              {selectedDiscussion.solved ? "Solved" : "Unsolved"}
            </Badge>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl">{selectedDiscussion.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src={selectedDiscussion.author.avatar} 
                        alt={selectedDiscussion.author.name} 
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium">{selectedDiscussion.author.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(selectedDiscussion.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDiscussion.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>{selectedDiscussion.content}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp size={16} />
                  {selectedDiscussion.likes}
                </Button>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageSquare size={14} />
                  {selectedDiscussion.replies.length} replies
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Responses</h3>
            
            {selectedDiscussion.replies.length > 0 ? (
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {selectedDiscussion.replies.map((reply) => (
                  <motion.div key={reply.id} variants={itemVariants}>
                    <Card className={reply.isAnswer ? "border-green-500" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={reply.author.avatar} 
                              alt={reply.author.name} 
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <span className="text-sm font-medium">{reply.author.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                          </div>
                          {reply.isAnswer && (
                            <Badge className="bg-green-500">Verified Answer</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none">
                          {reply.content.split('\n').map((paragraph, index) => {
                            if (paragraph.includes('```')) {
                              const parts = paragraph.split('```');
                              return (
                                <React.Fragment key={index}>
                                  {parts[0] && <p>{parts[0]}</p>}
                                  {parts[1] && (
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto my-2 font-mono text-sm">
                                      {parts[1]}
                                    </div>
                                  )}
                                  {parts[2] && <p>{parts[2]}</p>}
                                </React.Fragment>
                              );
                            }
                            return <p key={index}>{paragraph}</p>;
                          })}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <ThumbsUp size={16} />
                            {reply.likes}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No responses yet</h3>
                <p className="text-muted-foreground">Be the first to respond to this question!</p>
              </div>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Your Response</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReplySubmit}>
                  <Textarea 
                    placeholder="Write your answer here..." 
                    className="min-h-[150px]"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <div className="flex justify-end mt-4">
                    <Button 
                      type="submit" 
                      className="bg-campus-600 hover:bg-campus-700 gap-2"
                      disabled={!newReply.trim()}
                    >
                      <Send size={16} />
                      Post Response
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Doubt Discussion</h1>
            <p className="text-muted-foreground">Ask questions and get answers from faculty and peers</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2" onClick={() => setActiveTab('ask')}>
              <MessageSquare size={16} />
              Ask a Question
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => window.open('https://ats-score-resume-checker-hxxb5cxwepp4mwb4qmsrrl.streamlit.app/', '_blank')}>
              Job Description Check
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Questions</TabsTrigger>
            <TabsTrigger value="ask">Ask a Question</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/4">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search questions..."
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
                  {filteredDiscussions.map((discussion) => (
                    <motion.div key={discussion.id} variants={itemVariants}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedDiscussion(discussion)}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{discussion.title}</CardTitle>
                            <Badge variant={discussion.solved ? "default" : "outline"} className={discussion.solved ? "bg-green-500" : ""}>
                              {discussion.solved ? "Solved" : "Unsolved"}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <img 
                                src={discussion.author.avatar} 
                                alt={discussion.author.name} 
                                className="w-5 h-5 rounded-full"
                              />
                              <span>{discussion.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{formatDate(discussion.createdAt)}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 line-clamp-2">{discussion.content}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {discussion.tags.map(tag => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <ThumbsUp size={16} className="text-muted-foreground" />
                              <span className="text-sm">{discussion.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare size={16} className="text-muted-foreground" />
                              <span className="text-sm">{discussion.replies.length}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View Discussion
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {filteredDiscussions.length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No discussions found</h3>
                      <p className="text-muted-foreground">Try changing your search query or filters</p>
                    </div>
                  )}
                </motion.div>
              </div>
              
              <div className="md:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Filter by Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleTagSelect(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• Be specific about your problem</p>
                    <p>• Include relevant code snippets</p>
                    <p>• Check if your question has been asked before</p>
                    <p>• Use appropriate tags</p>
                    <p>• Be respectful and helpful when responding</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ask">
            <Card>
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
                <CardDescription>
                  Be specific and include all relevant details to get the best answers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewPostSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                    <Input 
                      id="title" 
                      placeholder="e.g., How to implement binary search in Python?" 
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1">Description</label>
                    <Textarea 
                      id="content" 
                      placeholder="Describe your problem in detail..." 
                      className="min-h-[200px]"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
                    <Input 
                      id="tags" 
                      placeholder="e.g., Python, Algorithms (comma separated)" 
                      value={newPostTags}
                      onChange={(e) => setNewPostTags(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-campus-600 hover:bg-campus-700"
                      disabled={!newPostTitle.trim() || !newPostContent.trim()}
                    >
                      Post Question
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DoubtDiscussion;
