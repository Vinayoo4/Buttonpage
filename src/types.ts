export type Role = 'learner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export type LessonType = 'reading' | 'breathing' | 'reflection';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: LessonType;
  content: string; // Markdown or simple text
  durationMinutes: number;
  order: number;
  tips?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  published: boolean;
  lessons: Lesson[];
}

export interface ProgressRecord {
  userId: string;
  courseId: string;
  lessonId: string;
  completedAt: string; // ISO date string
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null; // YYYY-MM-DD
  updatedAt: string;
}

export interface Settings {
  darkMode: boolean;
  dailyReminderTime?: string;
  preferredDuration?: number;
}

export interface AppData {
  users: User[];
  courses: Course[];
  progress: ProgressRecord[];
  streaks: Streak[];
}
