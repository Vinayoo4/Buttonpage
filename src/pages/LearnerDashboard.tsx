import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, BookOpen, CheckCircle } from 'lucide-react';
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}!</h1>

        {streak && (
          <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
            <Flame size={24} className={streak.currentStreak > 0 ? "text-orange-500 fill-current" : ""} />
            <span>{streak.currentStreak} Day Streak</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          <Link to="/courses" className="text-blue-500 hover:text-blue-600 font-medium">Browse Catalog</Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className={`p-8 text-center rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <BookOpen size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className="text-xl font-medium mb-2">You haven't started any courses yet</h3>
            <p className="mb-4">Explore our catalog to find a mindfulness practice that fits your needs.</p>
            <Link to="/courses" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {enrolledCourses.map(course => {
              const completedLessons = progress.filter(p => p.courseId === course.id).length;
              const totalLessons = course.lessons.length;
              const percentComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

              // Find next uncompleted lesson
              const nextLesson = course.lessons.find(
                l => !progress.some(p => p.lessonId === l.id)
              );

              return (
                <div key={course.id} className={`p-6 rounded-lg shadow-md flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className={`mb-4 flex-grow ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{completedLessons} / {totalLessons} Lessons</span>
                    </div>
                    <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all"
                        style={{ width: `${percentComplete}%` }}
                      ></div>
                    </div>
                  </div>

                  {nextLesson ? (
                    <Link
                      to={`/lesson/${course.id}/${nextLesson.id}`}
                      className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Continue: {nextLesson.title}
                    </Link>
                  ) : (
                    <div className="text-center text-green-500 font-medium flex items-center justify-center gap-2 px-4 py-2 bg-green-50 rounded">
                      <CheckCircle size={20} /> Course Completed
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerDashboard;
