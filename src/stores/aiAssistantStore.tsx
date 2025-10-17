// src/stores/aiAssistantStore.ts
import { create } from 'zustand';

interface AIAssistantStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useAIAssistantStore = create<AIAssistantStore>((set) => ({
  isOpen: false, // Default to not open
  setIsOpen: (open) => set({ isOpen: open }), // Function to toggle visibility
}));
