import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Course, Lesson, LessonType } from '../types';
import { getCourses, saveCourse } from '../store';
import { useAppContext } from '../AppContext';

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkMode } = useAppContext();

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id === 'new') {
        setCourse({
            id: `course-${Date.now()}`,
            title: '',
            description: '',
            category: 'focus',
            difficulty: 'beginner',
            estimatedDuration: 0,
            published: false,
            lessons: []
        });
        return;
    }

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
      // Recalculate duration
      const totalDuration = course.lessons.reduce((acc, l) => acc + l.durationMinutes, 0);
      saveCourse({ ...course, estimatedDuration: totalDuration });
      navigate('/admin');
    }
  };

  const handleAddLesson = () => {
    if (course) {
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        courseId: course.id,
        title: 'New Lesson',
        type: 'reading',
        content: '',
        durationMinutes: 5,
        order: course.lessons.length + 1,
        tips: []
      };
      setCourse({
        ...course,
        lessons: [...course.lessons, newLesson]
      });
    }
  };

  const updateLesson = (index: number, field: keyof Lesson, value: any) => {
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

  const moveLesson = (index: number, direction: 'up' | 'down') => {
      if (!course) return;
      const updatedLessons = [...course.lessons];
      if (direction === 'up' && index > 0) {
          const temp = updatedLessons[index - 1];
          updatedLessons[index - 1] = updatedLessons[index];
          updatedLessons[index] = temp;
      } else if (direction === 'down' && index < updatedLessons.length - 1) {
          const temp = updatedLessons[index + 1];
          updatedLessons[index + 1] = updatedLessons[index];
          updatedLessons[index] = temp;
      }

      // Update order
      updatedLessons.forEach((l, i) => l.order = i + 1);
      setCourse({ ...course, lessons: updatedLessons });
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin')} className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold flex-grow">{id === 'new' ? 'Create Course' : 'Edit Course'}</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Save size={20} /> Save Changes
        </button>
      </div>

      <div className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Course Title</label>
              <input
                type="text"
                value={course.title}
                onChange={(e) => setCourse({...course, title: e.target.value})}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={course.category}
                onChange={(e) => setCourse({...course, category: e.target.value})}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                  <option value="focus">Focus</option>
                  <option value="sleep">Sleep</option>
                  <option value="breathing">Breathing</option>
                  <option value="meditation">Meditation</option>
                  <option value="stress relief">Stress Relief</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Difficulty</label>
              <select
                value={course.difficulty}
                onChange={(e) => setCourse({...course, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced'})}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={course.description}
                onChange={(e) => setCourse({...course, description: e.target.value})}
                className={`w-full p-3 border rounded-lg h-24 resize-y focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
                <input
                    type="checkbox"
                    id="published"
                    checked={course.published}
                    onChange={(e) => setCourse({...course, published: e.target.checked})}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="published" className="font-semibold cursor-pointer">Published (visible to learners)</label>
            </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 pt-4">
        <h2 className="text-2xl font-bold">Lessons</h2>
        <button
          onClick={handleAddLesson}
          className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
        >
          <Plus size={18} /> Add Lesson
        </button>
      </div>

      <div className="space-y-6">
        {course.lessons.map((lesson, index) => (
          <div key={lesson.id} className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                  <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {lesson.order}
                  </span>
                  <h3 className="font-bold text-lg">Lesson Setup</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveLesson(index, 'up')} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <ArrowUp size={20} />
                </button>
                <button onClick={() => moveLesson(index, 'down')} disabled={index === course.lessons.length - 1} className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <ArrowDown size={20} />
                </button>
                <div className="w-px h-6 bg-gray-200 mx-2"></div>
                <button onClick={() => deleteLesson(index)} className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLesson(index, 'title', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Duration (min)</label>
                <input
                  type="number"
                  value={lesson.durationMinutes}
                  onChange={(e) => updateLesson(index, 'durationMinutes', parseInt(e.target.value))}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-semibold mb-2">Type</label>
                <div className="flex gap-4">
                    {(['reading', 'breathing', 'reflection'] as LessonType[]).map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name={`type-${lesson.id}`}
                                value={type}
                                checked={lesson.type === type}
                                onChange={(e) => updateLesson(index, 'type', e.target.value as LessonType)}
                                className="text-indigo-600"
                            />
                            <span className="capitalize">{type}</span>
                        </label>
                    ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Content (Reading text or exercise instructions)</label>
              <textarea
                value={lesson.content}
                onChange={(e) => updateLesson(index, 'content', e.target.value)}
                className={`w-full p-3 border rounded-lg h-32 resize-y focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              />
            </div>

            <div className="mt-6">
                <label className="block text-sm font-semibold mb-2">Tips (comma separated)</label>
                <input
                  type="text"
                  value={lesson.tips?.join(', ') || ''}
                  onChange={(e) => {
                      const tips = e.target.value.split(',').map(t => t.trim()).filter(t => t !== '');
                      updateLesson(index, 'tips', tips);
                  }}
                  placeholder="e.g. Find a quiet spot, Breathe naturally"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                />
            </div>
          </div>
        ))}
        {course.lessons.length === 0 && (
          <div className={`p-12 text-center rounded-xl border border-dashed ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-500'}`}>
              <p>No lessons added yet. Click "Add Lesson" to start building your course.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
