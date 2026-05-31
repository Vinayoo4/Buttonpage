import { AppData, Course, ProgressRecord, Streak } from './types';

const STORAGE_KEY = 'mindfulness_pwa_data';
const SEED_FLAG_KEY = 'mindfulness_pwa_seeded';

const initialData: AppData = {
  users: [
    { id: 'admin', name: 'Admin', email: 'admin@mindcourse.com', role: 'admin', createdAt: new Date().toISOString() },
    { id: 'demo', name: 'Demo Learner', email: 'learner@mindcourse.com', role: 'learner', createdAt: new Date().toISOString() },
  ],
  courses: [
    {
      id: 'course-1',
      title: 'Morning Mindfulness Starter',
      description: 'A 7-day course to start your morning right.',
      category: 'focus',
      difficulty: 'beginner',
      estimatedDuration: 45,
      published: true,
      lessons: [
        {
          id: 'lesson-1', courseId: 'course-1', title: 'Setting Intentions', type: 'reading',
          content: 'Begin your day by setting a clear intention. Ask yourself, what matters most today? Focus your energy on that single thing instead of getting overwhelmed by an endless to-do list.\n\nTake a few moments to visualize your day unfolding positively. Notice how this shift in perspective affects your mood.',
          durationMinutes: 5, order: 1, tips: ['Find a quiet spot.', 'Keep a journal handy.']
        },
        {
          id: 'lesson-2', courseId: 'course-1', title: 'Morning Breath', type: 'breathing',
          content: 'Use this simple breathing exercise to center yourself. Inhale deeply through your nose, letting your belly expand. Exhale slowly through your mouth. \n\nBy focusing entirely on your breath, you signal your nervous system that it is safe to relax.',
          durationMinutes: 5, order: 2, tips: ['Keep your spine straight.', 'Breathe naturally.']
        },
        {
          id: 'lesson-3', courseId: 'course-1', title: 'Gratitude Reflection', type: 'reflection',
          content: 'Take a moment to reflect on three things you are grateful for today. These do not have to be monumental achievements. Simple things like a warm cup of coffee, a supportive friend, or a sunny morning are perfect.\n\nWrite them down and notice the feeling of appreciation in your body.',
          durationMinutes: 5, order: 3, tips: ['Be specific in your gratitude.', 'Feel the emotion.']
        },
        {
          id: 'lesson-4', courseId: 'course-1', title: 'Mindful Coffee/Tea', type: 'reading',
          content: 'Turn your morning beverage routine into a mindful practice. Notice the sound of the brewing, the warmth of the mug in your hands, the aroma, and finally, the taste.\n\nDrink slowly and be fully present with each sip instead of rushing to the next task.',
          durationMinutes: 10, order: 4, tips: ['Put your phone away.', 'Savor the flavor.']
        },
        {
          id: 'lesson-5', courseId: 'course-1', title: 'Body Scan Wake-up', type: 'reading',
          content: 'Before getting out of bed, take a minute to scan your body from toes to head. Notice any tension or stiffness. Breathe into those areas and consciously relax them.\n\nThis simple practice helps you connect with your physical self before the mental chatter begins.',
          durationMinutes: 5, order: 5, tips: ['Don\'t judge the sensations.', 'Just observe.']
        },
        {
          id: 'lesson-6', courseId: 'course-1', title: 'Focus Breath', type: 'breathing',
          content: 'Use this breathing technique to sharpen your focus for the day. Inhale for a count of 4, hold for 2, exhale for 4. \n\nIf your mind wanders to the tasks ahead, gently bring your attention back to the counting.',
          durationMinutes: 10, order: 6, tips: ['Count silently.', 'Stay relaxed.']
        },
        {
          id: 'lesson-7', courseId: 'course-1', title: 'Looking Ahead', type: 'reflection',
          content: 'Reflect on how this past week of morning mindfulness has affected your days. Are you feeling more centered? Less reactive? \n\nConsider how you can continue to integrate these small moments of presence into your ongoing routine.',
          durationMinutes: 5, order: 7, tips: ['Review your previous notes.', 'Be honest with yourself.']
        }
      ]
    },
    {
      id: 'course-2',
      title: 'Sleep Better Tonight',
      description: 'Wind down and prepare for a restful sleep.',
      category: 'sleep',
      difficulty: 'beginner',
      estimatedDuration: 40,
      published: true,
      lessons: [
         {
          id: 'lesson-2-1', courseId: 'course-2', title: 'Digital Detox', type: 'reading',
          content: 'The blue light from screens suppresses melatonin production. Commit to turning off all screens at least 30 minutes before bed.\n\nUse this time to read a book, listen to soft music, or simply sit quietly and let your mind unwind from the day’s activities.',
          durationMinutes: 5, order: 1, tips: ['Read a physical book.', 'Dim the lights.']
        },
        {
          id: 'lesson-2-2', courseId: 'course-2', title: 'Evening Body Scan', type: 'reading',
          content: 'Lie down comfortably. Bring your attention to your toes. Notice any sensations, then consciously relax them. Slowly move up your body—legs, hips, torso, arms, neck, and face—relaxing each part as you go.\n\nThis signals to your body that the day is over and it is time to rest.',
          durationMinutes: 15, order: 2, tips: ['Breathe softly.', 'Let go of tension.']
        },
        {
          id: 'lesson-2-3', courseId: 'course-2', title: 'Letting Go of the Day', type: 'reflection',
          content: 'Often, we lie awake thinking about what happened today or what needs to happen tomorrow. Write down any lingering thoughts, worries, or to-dos.\n\nBy transferring them to paper, you are giving your mind permission to let them go until tomorrow.',
          durationMinutes: 10, order: 3, tips: ['Keep a notepad by your bed.', 'Write freely.']
        },
        {
          id: 'lesson-2-4', courseId: 'course-2', title: '4-7-8 Breathing', type: 'breathing',
          content: 'This breathing technique is a natural tranquilizer for the nervous system. Inhale quietly through your nose for 4 seconds, hold your breath for 7 seconds, and exhale completely through your mouth for 8 seconds.\n\nRepeat this cycle four times to help induce sleep.',
          durationMinutes: 5, order: 4, tips: ['Place the tip of your tongue against the ridge behind your upper teeth.', 'Exhale with a whoosh sound.']
        },
        {
          id: 'lesson-2-5', courseId: 'course-2', title: 'Sleep Environment', type: 'reading',
          content: 'Your bedroom should be a sanctuary for sleep. Ensure it is cool, dark, and quiet. Consider using blackout curtains or an eye mask.\n\nMinimize clutter and distractions. The physical space you sleep in profoundly affects the quality of your rest.',
          durationMinutes: 5, order: 5, tips: ['Keep the room cool.', 'Use comfortable bedding.']
        }
      ]
    }
  ],
  progress: [
    { userId: 'demo', courseId: 'course-1', lessonId: 'lesson-1', completedAt: new Date(Date.now() - 86400000 * 2).toISOString() }, // 2 days ago
    { userId: 'demo', courseId: 'course-1', lessonId: 'lesson-2', completedAt: new Date(Date.now() - 86400000).toISOString() } // 1 day ago
  ],
  streaks: [
    { userId: 'demo', currentStreak: 2, longestStreak: 2, lastActivityDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], updatedAt: new Date().toISOString() },
  ],
};

export const loadData = (): AppData => {
  const isSeeded = localStorage.getItem(SEED_FLAG_KEY);
  const data = localStorage.getItem(STORAGE_KEY);

  if (data && isSeeded) {
    return JSON.parse(data);
  }

  // Seed data if not exists or not seeded fully
  saveData(initialData);
  localStorage.setItem(SEED_FLAG_KEY, 'true');
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

export const deleteCourse = (courseId: string) => {
  const data = loadData();
  data.courses = data.courses.filter(c => c.id !== courseId);
  saveData(data);
}

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
      const lastDate = streak.lastActivityDate;

      if (lastDate !== today) {
        // Compare dates properly
        const todayDate = new Date(today);
        const yesterdayDate = new Date(today);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          // Increment streak
          streak.currentStreak += 1;
        } else {
          // Reset streak if missed more than 1 day
          streak.currentStreak = 1;
        }
        streak.lastActivityDate = today;
        streak.updatedAt = new Date().toISOString();
        if (streak.currentStreak > streak.longestStreak) {
            streak.longestStreak = streak.currentStreak;
        }
      }
    } else {
      data.streaks.push({
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: today,
        updatedAt: new Date().toISOString()
      });
    }

    saveData(data);
  }
};

export const getStreak = (userId: string): Streak => {
  const data = loadData();
  const streak = data.streaks.find(s => s.userId === userId);

  // Check if streak is broken (didn't complete yesterday or today)
  if (streak && streak.lastActivityDate) {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (streak.lastActivityDate !== today && streak.lastActivityDate !== yesterdayStr) {
          streak.currentStreak = 0; // it visually resets, we shouldn't save this reset immediately unless an action happens, but returning it is fine.
          return { ...streak, currentStreak: 0 };
      }
  }

  return streak || { userId, currentStreak: 0, longestStreak: 0, lastActivityDate: null, updatedAt: new Date().toISOString() };
};

export const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SEED_FLAG_KEY);
    loadData();
}
