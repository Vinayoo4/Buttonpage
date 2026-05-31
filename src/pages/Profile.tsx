import React, { useEffect, useState } from 'react';
import { Award, Clock, BookOpen, Flame, Calendar } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { getProgress, getStreak, getCourses } from '../store';
import { ProgressRecord, Streak, Course } from '../types';

const Profile = () => {
  const { currentUser, darkMode } = useAppContext();
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [streak, setStreak] = useState<Streak | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [reflections, setReflections] = useState<{lessonTitle: string, content: string}[]>([]);

  useEffect(() => {
    if (currentUser) {
        const userProgress = getProgress(currentUser.id);
        setProgress(userProgress);
        setStreak(getStreak(currentUser.id));
        const allCourses = getCourses();
        setCourses(allCourses);

        // Gather reflections
        const userReflections: {lessonTitle: string, content: string}[] = [];
        allCourses.forEach(course => {
            course.lessons.forEach(lesson => {
                if (lesson.type === 'reflection') {
                    const saved = localStorage.getItem(`reflection_${lesson.id}_${currentUser.id}`);
                    if (saved) {
                        userReflections.push({
                            lessonTitle: lesson.title,
                            content: saved
                        });
                    }
                }
            });
        });
        setReflections(userReflections);
    }
  }, [currentUser]);

  if (!currentUser) return null;

  // Calculate stats
  const totalLessonsCompleted = progress.length;
  const enrolledCourseIds = new Set(progress.map(p => p.courseId));
  const totalCoursesEnrolled = enrolledCourseIds.size;

  const enrolledCourses = courses.filter(c => enrolledCourseIds.has(c.id));
  const completedCourses = enrolledCourses.filter(course => {
      const completed = progress.filter(p => p.courseId === course.id).length;
      return completed === course.lessons.length && course.lessons.length > 0;
  });
  const totalCoursesCompleted = completedCourses.length;

  // Calculate total minutes spent
  let totalMinutes = 0;
  progress.forEach(p => {
      const course = courses.find(c => c.id === p.courseId);
      if (course) {
          const lesson = course.lessons.find(l => l.id === p.lessonId);
          if (lesson) {
              totalMinutes += lesson.durationMinutes;
          }
      }
  });

  const memberSinceDate = new Date(currentUser.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Profile Header */}
      <div className={`p-8 rounded-2xl shadow-sm border flex flex-col md:flex-row items-center gap-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold uppercase shrink-0">
              {currentUser.name.charAt(0)}
          </div>
          <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
              <p className={`mb-2 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm opacity-80">
                  <Calendar size={16} /> Member since {memberSinceDate}
              </div>
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="text-indigo-500 mb-2"><BookOpen size={28} /></div>
              <div className="text-3xl font-bold mb-1">{totalLessonsCompleted}</div>
              <div className="text-sm opacity-70">Lessons Completed</div>
          </div>
          <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="text-green-500 mb-2"><Award size={28} /></div>
              <div className="text-3xl font-bold mb-1">{totalCoursesCompleted} <span className="text-lg text-gray-400 font-normal">/ {totalCoursesEnrolled}</span></div>
              <div className="text-sm opacity-70">Courses Finished</div>
          </div>
          <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="text-orange-500 mb-2"><Flame size={28} /></div>
              <div className="text-3xl font-bold mb-1">{streak?.longestStreak || 0}</div>
              <div className="text-sm opacity-70">Longest Streak</div>
          </div>
          <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="text-blue-500 mb-2"><Clock size={28} /></div>
              <div className="text-3xl font-bold mb-1">{totalMinutes}</div>
              <div className="text-sm opacity-70">Minutes Mindful</div>
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          {/* Completed Lessons Grouped */}
          <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircleIcon /> Completed Lessons
              </h2>
              {enrolledCourses.length === 0 ? (
                  <p className="opacity-70">No completed lessons yet.</p>
              ) : (
                  <div className="space-y-6">
                      {enrolledCourses.map(course => {
                          const completedInCourse = progress.filter(p => p.courseId === course.id);
                          if (completedInCourse.length === 0) return null;

                          return (
                              <div key={course.id}>
                                  <h3 className="font-semibold text-indigo-500 mb-3">{course.title}</h3>
                                  <ul className="space-y-2">
                                      {completedInCourse.map(p => {
                                          const lesson = course.lessons.find(l => l.id === p.lessonId);
                                          if (!lesson) return null;
                                          const date = new Date(p.completedAt).toLocaleDateString();
                                          return (
                                              <li key={p.lessonId} className={`flex justify-between items-center p-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                  <span>{lesson.title}</span>
                                                  <span className="opacity-60">{date}</span>
                                              </li>
                                          );
                                      })}
                                  </ul>
                              </div>
                          );
                      })}
                  </div>
              )}
          </div>

          {/* Saved Reflections */}
          <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <EditIcon /> Your Reflections
              </h2>
              {reflections.length === 0 ? (
                  <p className="opacity-70">You haven't saved any reflections yet.</p>
              ) : (
                  <div className="space-y-4">
                      {reflections.map((ref, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border-l-4 border-indigo-500 ${darkMode ? 'bg-gray-700/50' : 'bg-indigo-50/50'}`}>
                              <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">{ref.lessonTitle}</h3>
                              <p className="italic opacity-90 leading-relaxed whitespace-pre-wrap text-sm">"{ref.content}"</p>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

// Quick inline icons to avoid extra imports
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;

export default Profile;
