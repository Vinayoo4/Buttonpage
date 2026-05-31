import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Clock, BookOpen, Star, Filter } from 'lucide-react';
import { Course, ProgressRecord } from '../types';
import { getCourses, getProgress, markLessonComplete } from '../store';
import { useAppContext } from '../AppContext';

const CourseCatalog = () => {
  const { currentUser, darkMode } = useAppContext();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Only show published courses in catalog
    const allCourses = getCourses().filter(c => c.published);
    setCourses(allCourses);
    if (currentUser) {
      setProgress(getProgress(currentUser.id));
    }
  }, [currentUser]);

  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.category === filter);

  // Determine most popular course (mocked by simply picking the first one with the most lessons, or a specific ID for demo)
  const popularCourseId = courses.length > 0 ? courses[0].id : null;

  const handleEnroll = (course: Course) => {
      if (!currentUser) return;
      const firstLesson = course.lessons[0];
      if (firstLesson) {
          // Navigating naturally acts as enrollment if we save progress on first view,
          // but we can optionally just navigate there. The prompt says "triggers enrollment and redirects".
          navigate(`/lesson/${course.id}/${firstLesson.id}`);
      }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Course Catalog</h1>

          <div className="flex items-center gap-2">
             <Filter size={18} className="opacity-50" />
             <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border appearance-none focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
             >
                 {categories.map(cat => (
                     <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                 ))}
             </select>
          </div>
      </div>

      {filteredCourses.length === 0 ? (
          <div className={`p-12 text-center rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <p>No courses found for this category.</p>
          </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map(course => {
            const isEnrolled = progress.some(p => p.courseId === course.id);
            const isPopular = course.id === popularCourseId;

            return (
              <div key={course.id} className={`relative p-6 rounded-2xl shadow-sm border flex flex-col transition-transform hover:-translate-y-1 duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>

                {/* Badges */}
                <div className="absolute -top-3 -right-3 flex flex-col gap-2 items-end">
                    {isEnrolled && (
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            Enrolled ✓
                        </span>
                    )}
                    {isPopular && !isEnrolled && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <Star size={12} className="fill-current" /> Popular
                        </span>
                    )}
                </div>

                <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium uppercase tracking-wider ${darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
                        {course.category}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium capitalize ${
                        course.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                        course.difficulty === 'intermediate' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                        {course.difficulty}
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-2 leading-tight">{course.title}</h3>
                <p className={`text-sm mb-6 flex-grow line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm font-medium opacity-80">
                    <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-indigo-500" /> {course.lessons.length} Lessons
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-indigo-500" /> {course.estimatedDuration} min
                    </div>
                </div>

                <div className="mt-auto">
                  {isEnrolled ? (
                    <Link
                      to="/"
                      className={`block w-full text-center py-3 rounded-xl font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course)}
                      disabled={course.lessons.length === 0}
                      className="flex w-full items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {course.lessons.length > 0 ? (
                          <><Play size={18} className="fill-current" /> Enroll Now</>
                      ) : (
                          "Coming Soon"
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
