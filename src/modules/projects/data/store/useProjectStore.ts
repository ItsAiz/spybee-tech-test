import { create } from 'zustand';
import { Project } from '@modules/projects/data/models/Projects.interface';

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  getProjectById: (id: string) => Project | undefined;
  clearProjects: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  setProjects: (projects) => set({ projects, isLoading: false }),
  getProjectById: (id) => {
    return get().projects.find((p) => p._id === id);
  },
  clearProjects: () => set({ projects: [] }),
}));
