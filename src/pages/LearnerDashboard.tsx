import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, BookOpen, CheckCircle, Activity, Award } from 'lucide-react';
import { Course, ProgressRecord, Streak } from '../types';
import { getCourses, getProgress, getStreak } from '../store';
import { useAppContext } from '../AppContext';

const LearnerDashboard = () => {
  const { currentUser, darkMode } = useAppContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    if (currentUser) {
      setCourses(getCourses());
      setProgress(getProgress(currentUser.id));
      setStreak(getStreak(currentUser.id));
    }
  }, [currentUser]);

  if (!currentUser) return null;

  // Find enrolled courses (courses with at least one progress record)
  const enrolledCourseIds = new Set(progress.map(p => p.courseId));
  const enrolledCourses = courses.filter(c => enrolledCourseIds.has(c.id));

  const completedCourses = enrolledCourses.filter(course => {
      const completedLessons = progress.filter(p => p.courseId === course.id).length;
      return completedLessons === course.lessons.length && course.lessons.length > 0;
  });

  const activeCourses = enrolledCourses.filter(course => {
      const completedLessons = progress.filter(p => p.courseId === course.id).length;
      return completedLessons < course.lessons.length;
  });

  // Weekly activity grid computation
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
  });

  const activeDays = new Set(progress.map(p => p.completedAt.split('T')[0]));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}!</h1>

        {streak && (
          <div className={`flex items-center gap-4 p-4 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full flex items-center justify-center">
              <Flame size={28} className={streak.currentStreak > 0 ? "fill-current" : ""} />
            </div>
            <div>
              <div className="text-2xl font-bold">{streak.currentStreak} Day{streak.currentStreak !== 1 ? 's' : ''}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Best streak: {streak.longestStreak} days
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Activity Grid */}
      <div className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-indigo-500" />
            <h2 className="text-xl font-semibold">Weekly Activity</h2>
        </div>
        <div className="flex justify-between md:justify-start md:gap-4">
            {last7Days.map(dateStr => {
                const date = new Date(dateStr);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const isActive = activeDays.has(dateStr);

                return (
                    <div key={dateStr} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-indigo-500 text-white' : (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`}>
                            {isActive && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                        </div>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{dayName}</span>
                    </div>
                );
            })}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          <Link to="/courses" className="text-indigo-500 hover:text-indigo-600 font-medium">Browse Catalog</Link>
        </div>

        {activeCourses.length === 0 ? (
          <div className={`p-8 text-center rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <BookOpen size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className="text-xl font-medium mb-2">You haven't started any active courses</h3>
            <p className="mb-4">Explore our catalog to find a mindfulness practice that fits your needs.</p>
            <Link to="/courses" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {activeCourses.map(course => {
              const completedLessons = progress.filter(p => p.courseId === course.id).length;
              const totalLessons = course.lessons.length;
              const percentComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

              // Find next uncompleted lesson
              const nextLesson = course.lessons.find(
                l => !progress.some(p => p.lessonId === l.id)
              );

              return (
                <div key={course.id} className={`p-6 rounded-xl shadow-sm border flex flex-col ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium uppercase tracking-wider">{course.category}</span>
                  </div>
                  <p className={`mb-4 flex-grow ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.description}</p>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{completedLessons} / {totalLessons} Lessons ({percentComplete}%)</span>
                    </div>
                    <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: `${percentComplete}%` }}
                      ></div>
                    </div>
                  </div>

                  {nextLesson && (
                    <Link
                      to={`/lesson/${course.id}/${nextLesson.id}`}
                      className="block text-center bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                    >
                      Continue: {nextLesson.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Courses Section */}
      {completedCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Completed Courses</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {completedCourses.map(course => (
                    <div key={course.id} className={`p-6 rounded-xl shadow-sm border flex flex-col items-center text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                            <Award size={32} />
                        </div>
                        <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            You have completed all {course.lessons.length} lessons in this course.
                        </p>
                    </div>
                ))}
            </div>
          </div>
      )}
    </div>
  );
};

export default LearnerDashboard;
