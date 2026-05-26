import { AppData, Course, ProgressRecord, Streak } from './types';

const STORAGE_KEY = 'mindfulness_pwa_data';

const initialData: AppData = {
  users: [
    { id: 'admin-1', name: 'Admin User', role: 'admin' },
    { id: 'learner-1', name: 'Learner User', role: 'learner' },
  ],
  courses: [
    {
      id: 'course-1',
      title: 'Mindfulness Basics',
      description: 'A beginner course to get you started with mindfulness.',
      lessons: [
        {
          id: 'lesson-1',
          courseId: 'course-1',
          title: 'Introduction to Mindfulness',
          content: 'Mindfulness is the basic human ability to be fully present, aware of where we are and what we’re doing, and not overly reactive or overwhelmed by what’s going on around us.',
          durationMinutes: 5,
          order: 1,
        },
        {
          id: 'lesson-2',
          courseId: 'course-1',
          title: 'Breathing Exercises',
          content: 'Focus on your breath. Inhale deeply for 4 seconds, hold for 4 seconds, and exhale for 4 seconds. Repeat this for 5 minutes.',
          durationMinutes: 5,
          order: 2,
        },
        {
          id: 'lesson-3',
          courseId: 'course-1',
          title: 'Body Scan',
          content: 'Close your eyes and mentally scan your body from head to toe. Notice any tension and consciously release it.',
          durationMinutes: 10,
          order: 3,
        },
        {
          id: 'lesson-4',
          courseId: 'course-1',
          title: 'Mindful Walking',
          content: 'Take a short walk. Pay attention to the sensation of your feet touching the ground. Notice the sounds around you.',
          durationMinutes: 10,
          order: 4,
        },
        {
          id: 'lesson-5',
          courseId: 'course-1',
          title: 'Gratitude Practice',
          content: 'Think of three things you are grateful for today. They can be small things, like a good cup of coffee or a kind word from a friend.',
          durationMinutes: 5,
          order: 5,
        },
      ],
    },
  ],
  progress: [],
  streaks: [
    { userId: 'learner-1', currentStreak: 0, lastCompletedDate: null },
  ],
};

export const loadData = (): AppData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }

  // Seed data if not exists
  saveData(initialData);
  return initialData;
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getCourses = (): Course[] => loadData().courses;

export const saveCourse = (course: Course) => {
  const data = loadData();
  const index = data.courses.findIndex(c => c.id === course.id);
  if (index > -1) {
    data.courses[index] = course;
  } else {
    data.courses.push(course);
  }
  saveData(data);
};

export const getProgress = (userId: string): ProgressRecord[] => {
  return loadData().progress.filter(p => p.userId === userId);
};

export const markLessonComplete = (userId: string, courseId: string, lessonId: string) => {
  const data = loadData();

  // Check if already completed
  const alreadyCompleted = data.progress.some(
    p => p.userId === userId && p.lessonId === lessonId
  );

  if (!alreadyCompleted) {
    data.progress.push({
      userId,
      courseId,
      lessonId,
      completedAt: new Date().toISOString()
    });

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const streakIndex = data.streaks.findIndex(s => s.userId === userId);

    if (streakIndex > -1) {
      const streak = data.streaks[streakIndex];
      if (streak.lastCompletedDate !== today) {
        // Check if yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (streak.lastCompletedDate === yesterdayStr) {
          streak.currentStreak += 1;
        } else if (streak.lastCompletedDate !== today) {
          // Reset streak if gap > 1 day
          streak.currentStreak = 1;
        }
        streak.lastCompletedDate = today;
      }
    } else {
      data.streaks.push({
        userId,
        currentStreak: 1,
        lastCompletedDate: today
      });
    }

    saveData(data);
  }
};

export const getStreak = (userId: string): Streak => {
  const data = loadData();
  const streak = data.streaks.find(s => s.userId === userId);

  // Check if streak is broken (didn't complete yesterday or today)
  if (streak && streak.lastCompletedDate) {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (streak.lastCompletedDate !== today && streak.lastCompletedDate !== yesterdayStr) {
          return { userId, currentStreak: 0, lastCompletedDate: streak.lastCompletedDate };
      }
  }

  return streak || { userId, currentStreak: 0, lastCompletedDate: null };
};
