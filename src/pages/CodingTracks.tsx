
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const codingTracks = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    language: 'Python',
    difficulty: 'Medium' as const,
    rating: 4.8,
    progress: 45,
    problemCount: 120,
    completedCount: 54,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400',
    description: 'Master the essential data structures and algorithms using Python, with interactive challenges and real-world applications.',
  },
  {
    id: '2',
    title: 'Web Development with React',
    language: 'JavaScript',
    difficulty: 'Easy' as const,
    rating: 4.6,
    progress: 25,
    problemCount: 85,
    completedCount: 21,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400',
    description: 'Learn modern web development using React.js, building interactive UIs, managing state, and integrating with APIs.',
  },
  {
    id: '3',
    title: 'Advanced Algorithms',
    language: 'Java',
    difficulty: 'Hard' as const,
    rating: 4.9,
    progress: 10,
    problemCount: 75,
    completedCount: 8,
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=400',
    description: 'Tackle advanced algorithmic problems and optimization techniques using Java, preparing for competitive programming contests.',
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    language: 'Python',
    difficulty: 'Medium' as const,
    rating: 4.7,
    progress: 0,
    problemCount: 60,
    completedCount: 0,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400',
    description: 'Introduction to machine learning algorithms and techniques, from data preprocessing to model deployment using Python.',
  },
  {
    id: '5',
    title: 'Backend Development with Node.js',
    language: 'JavaScript',
    difficulty: 'Medium' as const,
    rating: 4.5,
    progress: 0,
    problemCount: 65,
    completedCount: 0,
    image: 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?auto=format&fit=crop&w=400',
    description: 'Build scalable server-side applications using Node.js, Express, and MongoDB, with a focus on RESTful API design.',
  },
  {
    id: '6',
    title: 'Competitive Programming',
    language: 'C++',
    difficulty: 'Expert' as const,
    rating: 4.9,
    progress: 5,
    problemCount: 150,
    completedCount: 8,
    image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=400',
    description: 'Prepare for competitive programming contests with advanced problem-solving techniques, optimizations, and time-efficient algorithms.',
  },
  {
    id: '7',
    title: 'Mobile App Development',
    language: 'Dart',
    difficulty: 'Medium' as const,
    rating: 4.6,
    progress: 0,
    problemCount: 70,
    completedCount: 0,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400',
    description: 'Learn cross-platform mobile app development using Flutter and Dart, creating beautiful UIs and integrating device features.',
  },
  {
    id: '8',
    title: 'Database Design and SQL',
    language: 'SQL',
    difficulty: 'Easy' as const,
    rating: 4.4,
    progress: 0,
    problemCount: 50,
    completedCount: 0,
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=400',
    description: 'Master database concepts, SQL queries, optimization techniques, and database design principles with practical exercises.',
  },
  {
    id: '9',
    title: 'Cloud Development with AWS',
    language: 'Multiple',
    difficulty: 'Hard' as const,
    rating: 4.8,
    progress: 0,
    problemCount: 60,
    completedCount: 0,
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=400',
    description: 'Deploy and scale applications on AWS, learning about serverless architecture, containerization, and cloud-native development.',
  },
  {
    id: '10',
    title: 'System Design Interview Prep',
    language: 'Multiple',
    difficulty: 'Hard' as const,
    rating: 4.9,
    progress: 0,
    problemCount: 40,
    completedCount: 0,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400',
    description: 'Prepare for system design interviews with scalable architecture patterns, distributed systems concepts, and design case studies.',
  }
];

const CodingTracks = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Coding Tracks</h1>
            <p className="text-muted-foreground">Improve your coding skills with structured learning paths and challenges.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search tracks..." 
              className="pl-8" 
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Tracks</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="languages">By Language</TabsTrigger>
            <TabsTrigger value="difficulty">By Difficulty</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codingTracks.map((track) => (
                <Card key={track.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${track.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{track.title}</CardTitle>
                        <CardDescription>{track.language}</CardDescription>
                      </div>
                      <Badge className={`
                        ${track.difficulty === 'Easy' ? 'bg-green-500 hover:bg-green-600' : 
                          track.difficulty === 'Medium' ? 'bg-orange-500 hover:bg-orange-600' : 
                          track.difficulty === 'Hard' ? 'bg-red-500 hover:bg-red-600' : 
                          'bg-purple-500 hover:bg-purple-600'}
                      `}>
                        {track.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{track.problemCount} Problems</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < Math.floor(track.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                        <span className="ml-1 text-sm">{track.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    {track.progress > 0 && (
                      <>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-campus-600 h-2.5 rounded-full" 
                            style={{ width: `${track.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs">
                          <span>{track.completedCount}/{track.problemCount} completed</span>
                          <span className="text-green-600 font-medium">{track.progress}%</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-campus-600 hover:bg-campus-700" asChild>
                      <Link to={`/coding/problem/${track.id}`}>
                        {track.progress > 0 ? 'Continue Track' : 'Start Track'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codingTracks.filter(track => track.progress > 0).map((track) => (
                <Card key={track.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${track.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{track.title}</CardTitle>
                        <CardDescription>{track.language}</CardDescription>
                      </div>
                      <Badge className={`
                        ${track.difficulty === 'Easy' ? 'bg-green-500 hover:bg-green-600' : 
                          track.difficulty === 'Medium' ? 'bg-orange-500 hover:bg-orange-600' : 
                          track.difficulty === 'Hard' ? 'bg-red-500 hover:bg-red-600' : 
                          'bg-purple-500 hover:bg-purple-600'}
                      `}>
                        {track.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-2">{track.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                      <div 
                        className="bg-campus-600 h-2.5 rounded-full" 
                        style={{ width: `${track.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>{track.completedCount}/{track.problemCount} completed</span>
                      <span className="text-green-600 font-medium">{track.progress}%</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-campus-600 hover:bg-campus-700" asChild>
                      <Link to={`/coding/problem/${track.id}`}>
                        Continue Track
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="languages">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {['Python', 'JavaScript', 'Java', 'C++', 'Dart', 'SQL', 'Multiple'].map((language) => (
                <Button 
                  key={language} 
                  variant="outline" 
                  className="h-auto py-3 justify-start"
                >
                  <div className="flex flex-col items-center">
                    <span>{language}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {codingTracks.filter(track => track.language === language).length} tracks
                    </span>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codingTracks.map((track) => (
                <Card key={track.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${track.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{track.title}</CardTitle>
                        <CardDescription>{track.language}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-campus-600 hover:bg-campus-700" asChild>
                      <Link to={`/coding/problem/${track.id}`}>
                        {track.progress > 0 ? 'Continue Track' : 'Start Track'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="difficulty">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {['Easy', 'Medium', 'Hard', 'Expert'].map((difficulty) => (
                <Button 
                  key={difficulty} 
                  variant="outline" 
                  className={`h-auto py-3 justify-start
                    ${difficulty === 'Easy' ? 'border-green-500 hover:bg-green-50' : 
                      difficulty === 'Medium' ? 'border-orange-500 hover:bg-orange-50' : 
                      difficulty === 'Hard' ? 'border-red-500 hover:bg-red-50' : 
                      'border-purple-500 hover:bg-purple-50'}
                  `}
                >
                  <div className="flex flex-col items-center">
                    <span>{difficulty}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {codingTracks.filter(track => track.difficulty === difficulty).length} tracks
                    </span>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codingTracks.map((track) => (
                <Card key={track.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${track.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{track.title}</CardTitle>
                        <CardDescription>{track.language}</CardDescription>
                      </div>
                      <Badge className={`
                        ${track.difficulty === 'Easy' ? 'bg-green-500 hover:bg-green-600' : 
                          track.difficulty === 'Medium' ? 'bg-orange-500 hover:bg-orange-600' : 
                          track.difficulty === 'Hard' ? 'bg-red-500 hover:bg-red-600' : 
                          'bg-purple-500 hover:bg-purple-600'}
                      `}>
                        {track.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-campus-600 hover:bg-campus-700" asChild>
                      <Link to={`/coding/problem/${track.id}`}>
                        {track.progress > 0 ? 'Continue Track' : 'Start Track'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CodingTracks;
