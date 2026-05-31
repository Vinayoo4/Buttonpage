import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadData, markLessonComplete, getStreak, clearAllData, getCourses } from '../store';

describe('Store functionality', () => {
    beforeEach(() => {
        // Clear local storage and store state before each test
        localStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Seed function creates 2 courses with correct lesson counts', () => {
        const data = loadData();
        expect(data.courses.length).toBe(2);

        const course1 = data.courses.find(c => c.id === 'course-1');
        const course2 = data.courses.find(c => c.id === 'course-2');

        expect(course1).toBeDefined();
        expect(course1?.lessons.length).toBe(7);

        expect(course2).toBeDefined();
        expect(course2?.lessons.length).toBe(5);
    });

    it('Seeded flag prevents duplicate seeding', () => {
        loadData(); // initial seed
        const flag = localStorage.getItem('mindfulness_pwa_seeded');
        expect(flag).toBe('true');

        // Let's modify the data to prove it doesn't get overwritten
        const data = JSON.parse(localStorage.getItem('mindfulness_pwa_data')!);
        data.courses.push({ id: 'test', title: 'test', lessons: [], category: 'test', difficulty: 'beginner', description: '', estimatedDuration: 0, published: true });
        localStorage.setItem('mindfulness_pwa_data', JSON.stringify(data));

        const loadedData = loadData();
        expect(loadedData.courses.length).toBe(3); // Prove it loaded our modified data, didn't reseed
    });

    it('enrollInCourse adds a progress record via completing a lesson', () => {
        loadData();
        markLessonComplete('demo', 'course-2', 'lesson-2-1');

        const stored = JSON.parse(localStorage.getItem('mindfulness_pwa_data')!);
        const progress = stored.progress.filter((p: any) => p.userId === 'demo' && p.lessonId === 'lesson-2-1');

        expect(progress.length).toBe(1);
    });

    it('completeLesson marks lesson done and updates streak', () => {
        loadData();
        const baseDate = new Date('2023-01-01T12:00:00Z');
        vi.setSystemTime(baseDate);

        // Complete a lesson on a new day
        markLessonComplete('demo', 'course-2', 'lesson-2-1');

        const streak = getStreak('demo');
        expect(streak.currentStreak).toBe(1);
    });

    it('Streak increments correctly on first completion of day', () => {
        loadData();

        // Day 1
        vi.setSystemTime(new Date('2023-01-01T12:00:00Z'));
        markLessonComplete('demo', 'course-2', 'lesson-2-1');
        let streak = getStreak('demo');
        expect(streak.currentStreak).toBe(1);

        // Day 2
        vi.setSystemTime(new Date('2023-01-02T12:00:00Z'));
        markLessonComplete('demo', 'course-2', 'lesson-2-2');
        streak = getStreak('demo');
        expect(streak.currentStreak).toBe(2);
    });

    it('Streak does not double-increment same day', () => {
        loadData();

        // Day 1
        vi.setSystemTime(new Date('2023-01-01T12:00:00Z'));
        markLessonComplete('demo', 'course-2', 'lesson-2-1');

        // Day 1 - second lesson
        markLessonComplete('demo', 'course-2', 'lesson-2-2');

        const streak = getStreak('demo');
        expect(streak.currentStreak).toBe(1); // Should still be 1
    });

    it('Streak resets if a day is missed', () => {
        loadData();

        // Day 1
        vi.setSystemTime(new Date('2023-01-01T12:00:00Z'));
        markLessonComplete('demo', 'course-2', 'lesson-2-1');

        // Skip Day 2, jump to Day 3
        vi.setSystemTime(new Date('2023-01-03T12:00:00Z'));

        // Merely checking the streak should return 0 visually due to gap
        let streak = getStreak('demo');
        expect(streak.currentStreak).toBe(0);

        // Completing a lesson starts streak at 1
        markLessonComplete('demo', 'course-2', 'lesson-2-2');
        streak = getStreak('demo');
        expect(streak.currentStreak).toBe(1);
    });
});
