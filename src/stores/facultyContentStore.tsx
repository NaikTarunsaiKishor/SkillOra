import { create } from 'zustand';

interface Material {
  id: string;
  title: string;
  type: string;
  course: string;
  createdAt: string;
  status: string;
  size: string;
  description?: string;
  file?: File;
  fileUrl?: string;
}

interface FacultyContentStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  materials: Material[];
  addMaterial: (material: Material) => void;
  updateMaterial: (id: string, material: Partial<Material>) => void;
  deleteMaterial: (id: string) => void;
  publishedMaterials: Material[];
  addPublishedMaterial: (material: Material) => void;
}

export const useFacultyContent = create<FacultyContentStore>((set, get) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  materials: [
    {
      id: '1',
      title: 'Introduction to Data Structures',
      type: 'document',
      course: 'CS205',
      createdAt: '2025-04-01',
      status: 'published',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Algorithms Lecture 3',
      type: 'video',
      course: 'CS301',
      createdAt: '2025-04-02',
      status: 'published',
      size: '156 MB'
    },
    {
      id: '3',
      title: 'Programming Basics Quiz',
      type: 'quiz',
      course: 'CS101',
      createdAt: '2025-04-05',
      status: 'draft',
      size: '250 KB'
    },
    {
      id: '4',
      title: 'Web Development Resources',
      type: 'link',
      course: 'CS101',
      createdAt: '2025-04-06',
      status: 'published',
      size: '-'
    },
    {
      id: '5',
      title: 'Database Design Assignment',
      type: 'assignment',
      course: 'CS205',
      createdAt: '2025-04-08',
      status: 'published',
      size: '1.8 MB'
    }
  ],
  publishedMaterials: [],
  addMaterial: (material) => set((state) => ({
    materials: [...state.materials, material]
  })),
  updateMaterial: (id, updatedMaterial) => set((state) => ({
    materials: state.materials.map(material =>
      material.id === id ? { ...material, ...updatedMaterial } : material
    )
  })),
  deleteMaterial: (id) => set((state) => ({
    materials: state.materials.filter(material => material.id !== id)
  })),
  addPublishedMaterial: (material) => set((state) => ({
    publishedMaterials: [...state.publishedMaterials, material]
  }))
}));
