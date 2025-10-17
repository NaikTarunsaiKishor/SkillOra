
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
  program?: string;
  department?: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  link?: string;
}

// Circular types
export interface Circular {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
  author: string;
  department: string;
  attachments?: string[];
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  publishedAt: Date;
  thumbnail?: string;
  tags: string[];
}

// Ebook types
export interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  fileUrl: string;
  publishedAt: Date;
  category: string;
  pages: number;
}

// Certificate types
export interface Certificate {
  id: string;
  userId: string;
  title: string;
  issuedBy: string;
  issuedAt: Date;
  expiresAt?: Date;
  templateUrl: string;
  verificationCode: string;
}

// Result types
export interface Result {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  grade: string;
  score: number;
  maxScore: number;
  semester: string;
  academicYear: string;
  publishedAt: Date;
}

// Club types
export interface Club {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  category: string;
  members: number;
  foundedAt: Date;
  faculty: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface ClubEvent {
  id: string;
  clubId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  imageUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  maxParticipants?: number;
  registeredParticipants?: number;
}

// Study Room types
export interface StudyRoom {
  id: string;
  name: string;
  description: string;
  subject: string;
  host: User;
  participants: User[];
  maxParticipants: number;
  startTime: Date;
  endTime?: Date;
  status: 'scheduled' | 'live' | 'ended';
  roomUrl: string;
}

// Quiz types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  createdBy: string;
  createdAt: Date;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

// Coding Assessment types
export interface CodingAssessment {
  id: string;
  title: string;
  description: string;
  problems: CodingProblem[];
  timeLimit: number; // in minutes
  createdBy: string;
  createdAt: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string[];
}

export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  examples: CodingExample[];
  constraints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
}

export interface CodingExample {
  input: string;
  output: string;
  explanation?: string;
}

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  salary?: string;
  postedAt: Date;
  deadline: Date;
  skills: string[];
  applicationUrl?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  resumeUrl?: string;
  portfolioUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
}

export interface Experience {
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  imageUrl?: string;
}
