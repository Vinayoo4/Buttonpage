import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Flame } from 'lucide-react';
import { Course, Lesson } from '../types';
import { getCourses, markLessonComplete, getProgress } from '../store';
import { useAppContext } from '../AppContext';

const LessonViewer = () => {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();
  const navigate = useNavigate();
  const { currentUser, darkMode } = useAppContext();

  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  useEffect(() => {
    const courses = getCourses();
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      const foundLesson = foundCourse.lessons.find(l => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }

    if (currentUser && courseId && lessonId) {
      const progress = getProgress(currentUser.id);
      setIsCompleted(progress.some(p => p.courseId === courseId && p.lessonId === lessonId));
    }
  }, [courseId, lessonId, currentUser, navigate]);

  const handleComplete = () => {
    if (currentUser && courseId && lessonId) {
      markLessonComplete(currentUser.id, courseId, lessonId);
      setIsCompleted(true);
      setShowStreakModal(true);
    }
  };

  const nextLesson = course?.lessons.find(l => l.order === (lesson?.order || 0) + 1);

  if (!course || !lesson) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-500">
          {course.title} &bull; Lesson {lesson.order}
        </div>
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

        <div className="flex items-center gap-2 mb-8 text-sm opacity-70">
          <span>Duration: {lesson.durationMinutes} min</span>
        </div>

        <div className="prose prose-lg max-w-none mb-12" style={{ color: 'inherit' }}>
          {lesson.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>

        <div className="flex justify-center border-t border-gray-200 pt-8 dark:border-gray-700">
          {!isCompleted ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle /> Mark as Complete
            </button>
          ) : (
            <div className="text-center w-full">
              <div className="inline-flex items-center gap-2 text-green-500 font-bold text-xl mb-6">
                <CheckCircle size={28} /> Lesson Completed!
              </div>

              {nextLesson ? (
                <div>
                  <Link
                    to={`/lesson/${course.id}/${nextLesson.id}`}
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
                  >
                    Next Lesson: {nextLesson.title}
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-lg mb-4">You have completed all lessons in this course!</p>
                  <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showStreakModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-sm w-full p-8 rounded-2xl text-center shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Flame size={64} className="text-orange-500 fill-current mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Great Job!</h2>
            <p className="mb-6 opacity-80">You've completed a lesson and extended your streak. Keep it up!</p>
            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer;
