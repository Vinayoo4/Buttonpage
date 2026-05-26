export type Role = 'learner' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string; // Markdown or simple text
  durationMinutes: number;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
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
  lastCompletedDate: string | null; // YYYY-MM-DD
}

export interface Settings {
  darkMode: boolean;
}

export interface AppData {
  users: User[];
  courses: Course[];
  progress: ProgressRecord[];
  streaks: Streak[];
}
