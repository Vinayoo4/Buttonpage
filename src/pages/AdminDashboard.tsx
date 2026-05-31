import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Users, BookOpen, CheckCircle, BarChart2 } from 'lucide-react';
import { Course, ProgressRecord } from '../types';
import { getCourses, saveCourse, deleteCourse, loadData } from '../store';
import { useAppContext } from '../AppContext';

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressData, setProgressData] = useState<ProgressRecord[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const { darkMode } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
      setCourses(getCourses());
      const allData = loadData();
      setProgressData(allData.progress);
      setUsersCount(allData.users.filter(u => u.role === 'learner').length);
  };

  const handleCreateCourse = () => {
    navigate('/admin/course/new');
  };

  const handleDelete = (id: string, title: string) => {
      if (window.confirm(`Are you sure you want to delete "${title}"? This will remove all its lessons.`)) {
          deleteCourse(id);
          refreshData();
      }
  };

  const togglePublish = (course: Course) => {
      saveCourse({ ...course, published: !course.published });
      refreshData();
  };

  // Stats calculation
  const totalCourses = courses.length;
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const totalCompletions = progressData.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleCreateCourse}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <PlusCircle size={20} /> Add New Course
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><BookOpen size={24} /></div>
             <div><div className="text-sm opacity-70">Total Courses</div><div className="text-2xl font-bold">{totalCourses}</div></div>
          </div>
          <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
             <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><BarChart2 size={24} /></div>
             <div><div className="text-sm opacity-70">Total Lessons</div><div className="text-2xl font-bold">{totalLessons}</div></div>
          </div>
          <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
             <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Users size={24} /></div>
             <div><div className="text-sm opacity-70">Learners</div><div className="text-2xl font-bold">{usersCount}</div></div>
          </div>
          <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
             <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><CheckCircle size={24} /></div>
             <div><div className="text-sm opacity-70">Completions</div><div className="text-2xl font-bold">{totalCompletions}</div></div>
          </div>
      </div>

      {/* Course List Table */}
      <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className={`border-b text-sm uppercase tracking-wider ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                          <th className="p-4 font-semibold">Course Title</th>
                          <th className="p-4 font-semibold">Lessons</th>
                          <th className="p-4 font-semibold">Enrollments</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {courses.map(course => {
                          const enrollments = new Set(progressData.filter(p => p.courseId === course.id).map(p => p.userId)).size;
                          return (
                              <tr key={course.id} className={`border-b last:border-0 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                  <td className="p-4 font-medium">{course.title}</td>
                                  <td className="p-4">{course.lessons.length}</td>
                                  <td className="p-4">{enrollments}</td>
                                  <td className="p-4">
                                      <button
                                          onClick={() => togglePublish(course)}
                                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${course.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'}`}
                                      >
                                          {course.published ? 'Published' : 'Draft'}
                                      </button>
                                  </td>
                                  <td className="p-4 flex justify-end gap-3">
                                      <Link
                                        to={`/admin/course/${course.id}`}
                                        className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded transition-colors"
                                        title="Edit Course"
                                      >
                                        <Edit size={18} />
                                      </Link>
                                      <button
                                          onClick={() => handleDelete(course.id, course.title)}
                                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded transition-colors"
                                          title="Delete Course"
                                      >
                                          <Trash2 size={18} />
                                      </button>
                                  </td>
                              </tr>
                          );
                      })}
                      {courses.length === 0 && (
                          <tr>
                              <td colSpan={5} className="p-8 text-center opacity-70">No courses found. Add one to get started.</td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
