import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit } from 'lucide-react';
import { Course } from '../types';
import { getCourses, saveCourse } from '../store';
import { useAppContext } from '../AppContext';

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { darkMode } = useAppContext();

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: 'New Course',
      description: 'Course description',
      lessons: []
    };
    saveCourse(newCourse);
    setCourses(getCourses());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleCreateCourse}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusCircle size={20} /> New Course
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div key={course.id} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.description}</p>
            <p className="mb-4 text-sm font-medium">{course.lessons.length} Lessons</p>
            <Link
              to={`/admin/course/${course.id}`}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
            >
              <Edit size={16} /> Edit Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
