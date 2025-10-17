
import React from 'react';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Award, Book, BookOpen, Brain, Code, LineChart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// Define skill data
const skillData = [
  {
    name: 'JavaScript',
    value: 85,
    problemsSolved: 42,
    color: '#f0db4f',
  },
  {
    name: 'Python',
    value: 70,
    problemsSolved: 36,
    color: '#306998',
  },
  {
    name: 'Java',
    value: 65,
    problemsSolved: 28,
    color: '#5382a1',
  },
  {
    name: 'React',
    value: 80,
    problemsSolved: 22,
    color: '#61DBFB',
  },
  {
    name: 'SQL',
    value: 60,
    problemsSolved: 18,
    color: '#f29111',
  },
];

// Weekly activity data
const weeklyData = [
  { name: 'Mon', problems: 4, hours: 2 },
  { name: 'Tue', problems: 7, hours: 3 },
  { name: 'Wed', problems: 5, hours: 2.5 },
  { name: 'Thu', problems: 9, hours: 4 },
  { name: 'Fri', problems: 6, hours: 3 },
  { name: 'Sat', problems: 12, hours: 5 },
  { name: 'Sun', problems: 8, hours: 3.5 },
];

// Radar chart data
const radarData = [
  {
    subject: 'Algorithms',
    score: 80,
    fullMark: 100,
  },
  {
    subject: 'Data Structures',
    score: 75,
    fullMark: 100,
  },
  {
    subject: 'Problem Solving',
    score: 85,
    fullMark: 100,
  },
  {
    subject: 'OOP',
    score: 65,
    fullMark: 100,
  },
  {
    subject: 'System Design',
    score: 60,
    fullMark: 100,
  },
  {
    subject: 'Front-end',
    score: 80,
    fullMark: 100,
  },
];

const Progress = () => {
  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Your Learning Progress</h1>
            <p className="text-gray-500 mt-1">
              Track your skill development and learning journey
            </p>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-campus-50 text-campus-800 px-4 py-2 rounded-full flex items-center gap-2 mt-4 md:mt-0"
          >
            <Trophy size={18} className="text-yellow-500" />
            <span className="font-medium">
              Current Streak: <span className="text-campus-600 font-bold">14 days</span>
            </span>
          </motion.div>
        </div>

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Award size={18} /> Skills
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <LineChart size={18} /> Activity
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen size={18} /> Courses
            </TabsTrigger>
          </TabsList>
          
          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code size={20} /> Programming Skills
                  </CardTitle>
                  <CardDescription>
                    Your current proficiency levels across different languages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">
                          {skill.value}% • {skill.problemsSolved} problems solved
                        </span>
                      </div>
                      <ProgressBar value={skill.value} className="h-2" style={{ '--progress-background': skill.color } as React.CSSProperties} />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain size={20} /> Skill Radar
                  </CardTitle>
                  <CardDescription>
                    Your proficiency across different domains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Student"
                          dataKey="score"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={20} /> Achievement Progress
                </CardTitle>
                <CardDescription>
                  Track your progress towards completing achievement badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center space-y-3">
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Code size={28} />
                    </div>
                    <h3 className="font-medium">Code Master</h3>
                    <ProgressBar value={75} className="h-2" style={{ '--progress-background': '#3b82f6' } as React.CSSProperties} />
                    <p className="text-sm text-gray-500">75% Complete</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center space-y-3">
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <Award size={28} />
                    </div>
                    <h3 className="font-medium">Problem Solver</h3>
                    <ProgressBar value={48} className="h-2" style={{ '--progress-background': '#22c55e' } as React.CSSProperties} />
                    <p className="text-sm text-gray-500">48% Complete</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center space-y-3">
                    <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen size={28} />
                    </div>
                    <h3 className="font-medium">Course Collector</h3>
                    <ProgressBar value={92} className="h-2" style={{ '--progress-background': '#a855f7' } as React.CSSProperties} />
                    <p className="text-sm text-gray-500">92% Complete</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center space-y-3">
                    <div className="h-16 w-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                      <Brain size={28} />
                    </div>
                    <h3 className="font-medium">Algorithm Ace</h3>
                    <ProgressBar value={35} className="h-2" style={{ '--progress-background': '#d97706' } as React.CSSProperties} />
                    <p className="text-sm text-gray-500">35% Complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart size={20} /> Weekly Activity
                </CardTitle>
                <CardDescription>
                  Your coding activity over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={weeklyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="problems" name="Problems Solved" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="hours" name="Hours Spent" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code size={18} /> Total Problems
                  </CardTitle>
                  <CardDescription>
                    Problems solved across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold mb-2">145</div>
                  <div className="text-green-600 text-sm">
                    +24 from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen size={18} /> Course Progress
                  </CardTitle>
                  <CardDescription>
                    Average completion rate
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold mb-2">68%</div>
                  <div className="text-green-600 text-sm">
                    +12% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy size={18} /> Achievement
                  </CardTitle>
                  <CardDescription>
                    Total badges earned
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold mb-2">12</div>
                  <div className="text-green-600 text-sm">
                    +3 from last month
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book size={20} /> Course Completion
                </CardTitle>
                <CardDescription>
                  Your progress across enrolled courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Advanced JavaScript</span>
                      <span className="text-sm text-gray-500">85% Complete</span>
                    </div>
                    <ProgressBar value={85} className="h-2" style={{ '--progress-background': '#f0db4f' } as React.CSSProperties} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Python for Data Science</span>
                      <span className="text-sm text-gray-500">65% Complete</span>
                    </div>
                    <ProgressBar value={65} className="h-2" style={{ '--progress-background': '#306998' } as React.CSSProperties} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Algorithms and Data Structures</span>
                      <span className="text-sm text-gray-500">72% Complete</span>
                    </div>
                    <ProgressBar value={72} className="h-2" style={{ '--progress-background': '#a855f7' } as React.CSSProperties} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Web Development with React</span>
                      <span className="text-sm text-gray-500">95% Complete</span>
                    </div>
                    <ProgressBar value={95} className="h-2" style={{ '--progress-background': '#61DBFB' } as React.CSSProperties} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Database Design with SQL</span>
                      <span className="text-sm text-gray-500">40% Complete</span>
                    </div>
                    <ProgressBar value={40} className="h-2" style={{ '--progress-background': '#f29111' } as React.CSSProperties} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={20} /> Learning Trends
                </CardTitle>
                <CardDescription>
                  Your course completion trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      width={500}
                      height={300}
                      data={[
                        { month: 'Jan', completion: 25 },
                        { month: 'Feb', completion: 35 },
                        { month: 'Mar', completion: 45 },
                        { month: 'Apr', completion: 60 },
                        { month: 'May', completion: 68 },
                        { month: 'Jun', completion: 70 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="completion"
                        name="Course Completion %"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Progress;
