import { create } from 'zustand';

interface Course {
  id: string;
  title: string;
  subject: string;
  description: string;
  instructor: string;
  image: string;
  category: string;
  duration: string;
  enrolledStudents: number;
  progress: number;
  isNew: boolean;
  createdAt: Date;
}

interface CourseStore {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'enrolledStudents' | 'progress' | 'isNew' | 'createdAt'>) => void;
  enrollInCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  getCourses: () => Course[];
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      subject: 'Computer Science',
      description: 'Learn the fundamentals of computer science, including algorithms, data structures, and basic programming concepts.',
      instructor: 'Dr. Jane Smith',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400',
      category: 'Computer Science',
      duration: '12 weeks',
      enrolledStudents: 128,
      progress: 65,
      isNew: false,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      subject: 'Web Development',
      description: 'Master the basics of web development including HTML, CSS, and JavaScript. Build responsive websites from scratch.',
      instructor: 'Prof. Mike Johnson',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400',
      category: 'Web Development',
      duration: '10 weeks',
      enrolledStudents: 215,
      progress: 32,
      isNew: true,
      createdAt: new Date('2024-03-15'),
    },
    {
      id: '4',
      title: 'Database Management Systems',
      subject: 'Database',
      description: 'Learn database design, implementation, and management using SQL and NoSQL systems.',
      instructor: 'Prof. Lisa Wang',
      image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=400',
      category: 'Database',
      duration: '8 weeks',
      enrolledStudents: 110,
      progress: 78,
      isNew: false,
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '5',
      title: 'Machine Learning Fundamentals',
      subject: 'AI & ML',
      description: 'Introduction to machine learning concepts, algorithms, and practical applications using Python.',
      instructor: 'Dr. Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400',
      category: 'AI & ML',
      duration: '16 weeks',
      enrolledStudents: 150,
      progress: 12,
      isNew: true,
      createdAt: new Date('2024-03-20'),
    },
    {
      id: '6',
      title: 'Operating Systems',
      subject: 'Computer Science',
      description: 'Understand operating system principles, process management, memory allocation, and file systems.',
      instructor: 'Dr. Michael Brown',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400',
      category: 'Computer Science',
      duration: '10 weeks',
      enrolledStudents: 75,
      progress: 85,
      isNew: false,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '7',
      title: 'Computer Networks',
      subject: 'Networking',
      description: 'Explore network protocols, architectures, security, and implementation of computer networks.',
      instructor: 'Prof. Alex Rodriguez',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400',
      category: 'Networking',
      duration: '12 weeks',
      enrolledStudents: 90,
      progress: 50,
      isNew: false,
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '8',
      title: 'Mobile App Development',
      subject: 'Mobile Dev',
      description: 'Learn to develop mobile applications for iOS and Android platforms using React Native.',
      instructor: 'Dr. Emily Chen',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400',
      category: 'Mobile Dev',
      duration: '10 weeks',
      enrolledStudents: 120,
      progress: 0,
      isNew: true,
      createdAt: new Date('2024-03-25'),
    },
    {
      id: '9',
      title: 'Cybersecurity Fundamentals',
      subject: 'Security',
      description: 'Introduction to cybersecurity concepts, threat models, security protocols, and ethical hacking.',
      instructor: 'Prof. David Wilson',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=400',
      category: 'Security',
      duration: '14 weeks',
      enrolledStudents: 85,
      progress: 0,
      isNew: false,
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '10',
      title: 'Cloud Computing',
      subject: 'Cloud',
      description: 'Explore cloud architectures, services, deployment models, and security considerations.',
      instructor: 'Dr. Maria Lopez',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=400',
      category: 'Cloud',
      duration: '8 weeks',
      enrolledStudents: 100,
      progress: 0,
      isNew: false,
      createdAt: new Date('2024-02-05'),
    },
  ],
  addCourse: (courseData) => set((state) => ({
    courses: [
      {
        ...courseData,
        id: Date.now().toString(),
        enrolledStudents: 0,
        progress: 0,
        isNew: true,
        createdAt: new Date(),
      },
      ...state.courses,
    ]
  })),
  enrollInCourse: (courseId) => set((state) => ({
    courses: state.courses.map(course =>
      course.id === courseId
        ? { ...course, enrolledStudents: course.enrolledStudents + 1, progress: 1 }
        : course
    )
  })),
  updateCourseProgress: (courseId, progress) => set((state) => ({
    courses: state.courses.map(course =>
      course.id === courseId ? { ...course, progress } : course
    )
  })),
  getCourses: () => get().courses,
}));
