import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  category: string;
  component?: React.FC;
  comingSoon?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  activeTool: Tool | null;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  important?: boolean;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface HabitTrack {
  id: string;
  name: string;
  dates: Record<string, boolean>;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
  mood?: string;
}