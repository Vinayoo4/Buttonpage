import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Course, ProgressRecord } from '../types';
import { getCourses, getProgress } from '../store';
import { useAppContext } from '../AppContext';

const CourseCatalog = () => {
  const { currentUser, darkMode } = useAppContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);

  useEffect(() => {
    setCourses(getCourses());
    if (currentUser) {
      setProgress(getProgress(currentUser.id));
    }
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Course Catalog</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {courses.map(course => {
          const isEnrolled = progress.some(p => p.courseId === course.id);
          const firstLesson = course.lessons.length > 0 ? course.lessons[0] : null;

          return (
            <div key={course.id} className={`p-6 rounded-lg shadow-md flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className={`mb-4 flex-grow ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">{course.lessons.length} Lessons</span>

                {firstLesson && !isEnrolled ? (
                  <Link
                    to={`/lesson/${course.id}/${firstLesson.id}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    <Play size={16} /> Start Course
                  </Link>
                ) : isEnrolled ? (
                  <Link
                    to="/"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    View in Dashboard
                  </Link>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCatalog;
