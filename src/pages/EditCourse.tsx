import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { Course, Lesson } from '../types';
import { getCourses, saveCourse } from '../store';
import { useAppContext } from '../AppContext';

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkMode } = useAppContext();

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const courses = getCourses();
    const found = courses.find(c => c.id === id);
    if (found) {
      setCourse(found);
    } else {
      navigate('/admin');
    }
  }, [id, navigate]);

  const handleSave = () => {
    if (course) {
      saveCourse(course);
      navigate('/admin');
    }
  };

  const handleAddLesson = () => {
    if (course) {
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        courseId: course.id,
        title: 'New Lesson',
        content: '',
        durationMinutes: 5,
        order: course.lessons.length + 1
      };
      setCourse({
        ...course,
        lessons: [...course.lessons, newLesson]
      });
    }
  };

  const updateLesson = (index: number, field: keyof Lesson, value: string | number) => {
    if (course) {
      const updatedLessons = [...course.lessons];
      updatedLessons[index] = { ...updatedLessons[index], [field]: value };
      setCourse({ ...course, lessons: updatedLessons });
    }
  };

  const deleteLesson = (index: number) => {
    if (course) {
      const updatedLessons = course.lessons.filter((_, i) => i !== index);
      // Update order
      updatedLessons.forEach((l, i) => l.order = i + 1);
      setCourse({ ...course, lessons: updatedLessons });
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin')} className="text-blue-500 hover:text-blue-600">
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold flex-grow">Edit Course</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Save size={20} /> Save Changes
        </button>
      </div>

      <div className={`p-6 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({...course, title: e.target.value})}
            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={course.description}
            onChange={(e) => setCourse({...course, description: e.target.value})}
            className={`w-full p-2 border rounded h-24 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lessons</h2>
        <button
          onClick={handleAddLesson}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
        >
          <Plus size={16} /> Add Lesson
        </button>
      </div>

      <div className="space-y-4">
        {course.lessons.map((lesson, index) => (
          <div key={lesson.id} className={`p-4 rounded-lg shadow border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Lesson {lesson.order}</h3>
              <button onClick={() => deleteLesson(index)} className="text-red-500 hover:text-red-600">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLesson(index, 'title', e.target.value)}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={lesson.durationMinutes}
                  onChange={(e) => updateLesson(index, 'durationMinutes', parseInt(e.target.value))}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={lesson.content}
                onChange={(e) => updateLesson(index, 'content', e.target.value)}
                className={`w-full p-2 border rounded h-32 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
          </div>
        ))}
        {course.lessons.length === 0 && (
          <p className="text-center py-8 text-gray-500">No lessons added yet.</p>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
