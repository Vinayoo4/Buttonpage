import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Flame, Clock } from 'lucide-react';
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

  // Custom states for interactive elements
  const [reflectionText, setReflectionText] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const courses = getCourses();
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      const foundLesson = foundCourse.lessons.find(l => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);

        // Save to local storage for offline view on load
        localStorage.setItem(`offline_lesson_${foundLesson.id}`, JSON.stringify(foundLesson));
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }

    if (currentUser && courseId && lessonId) {
      const progress = getProgress(currentUser.id);
      setIsCompleted(progress.some(p => p.courseId === courseId && p.lessonId === lessonId));

      // Load reflection if exists
      const savedReflection = localStorage.getItem(`reflection_${lessonId}_${currentUser.id}`);
      if (savedReflection) {
          setReflectionText(savedReflection);
      } else {
          setReflectionText(''); // Reset on new lesson
      }
    }

    // Clear countdown on lesson change
    setCountdown(null);
  }, [courseId, lessonId, currentUser, navigate]);

  // Handle countdown effect
  useEffect(() => {
      let timer: NodeJS.Timeout;
      if (countdown !== null && countdown > 0) {
          timer = setTimeout(() => {
              setCountdown(prev => prev! - 1);
          }, 1000);
      } else if (countdown === 0) {
          const nextLesson = course?.lessons.find(l => l.order === (lesson?.order || 0) + 1);
          if (nextLesson) {
              navigate(`/lesson/${course?.id}/${nextLesson.id}`);
          } else {
              navigate('/');
          }
      }
      return () => clearTimeout(timer);
  }, [countdown, course, lesson, navigate]);

  const handleComplete = () => {
    if (currentUser && courseId && lessonId) {
      markLessonComplete(currentUser.id, courseId, lessonId);
      setIsCompleted(true);

      // Save reflection if present
      if (lesson?.type === 'reflection') {
          localStorage.setItem(`reflection_${lessonId}_${currentUser.id}`, reflectionText);
      }

      // Auto-advance logic
      const nextLesson = course?.lessons.find(l => l.order === (lesson?.order || 0) + 1);
      if (nextLesson) {
          setCountdown(3);
      }
    }
  };

  const handleCancelAutoAdvance = () => {
      setCountdown(null);
  };

  const nextLesson = course?.lessons.find(l => l.order === (lesson?.order || 0) + 1);
  const prevLesson = course?.lessons.find(l => l.order === (lesson?.order || 0) - 1);

  if (!course || !lesson) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-16">
      <Link to="/" className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 mb-6 font-medium">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <div className={`p-8 rounded-2xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
              {course.title}
            </div>
            <div className={`text-sm font-medium px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                Lesson {lesson.order} of {course.lessons.length}
            </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">{lesson.title}</h1>

        <div className={`flex items-center gap-4 mb-8 pb-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2 text-sm font-medium opacity-80">
            <Clock size={16} /> <span>{lesson.durationMinutes} min read</span>
          </div>
          <div className="text-sm px-2 py-1 bg-indigo-50 text-indigo-700 rounded capitalize">
            {lesson.type}
          </div>
        </div>

        {/* Breathing Exercise Component */}
        {lesson.type === 'breathing' && (
            <div className="mb-12 flex flex-col items-center justify-center p-8 bg-indigo-50 dark:bg-gray-700 rounded-xl">
                <p className="mb-8 font-medium text-center">Follow the circle to regulate your breathing.</p>
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute w-full h-full bg-indigo-200 dark:bg-indigo-900 rounded-full animate-[ping_10s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    <div className="relative w-32 h-32 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/50">
                        Breathe
                    </div>
                </div>
            </div>
        )}

        <div className="prose prose-lg max-w-none mb-12" style={{ color: 'inherit' }}>
          {lesson.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
          ))}
        </div>

        {/* Reflection Prompt */}
        {lesson.type === 'reflection' && (
            <div className={`mb-12 p-6 rounded-xl border-2 border-indigo-100 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-indigo-50'}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">Your Reflection</h3>
                <textarea
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className={`w-full p-4 rounded-lg min-h-[150px] resize-y focus:ring-2 focus:ring-indigo-500 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-200'}`}
                />
            </div>
        )}

        <div className={`flex flex-col items-center justify-center border-t pt-8 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {!isCompleted ? (
            <button
              onClick={handleComplete}
              className="flex items-center justify-center gap-2 w-full md:w-auto min-w-[250px] bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              Mark as Complete
            </button>
          ) : (
            <div className="text-center w-full">
              <div className="inline-flex items-center justify-center w-full gap-2 text-green-600 dark:text-green-400 font-bold text-xl mb-6 py-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <CheckCircle size={24} /> Completed ✓
              </div>

              {countdown !== null ? (
                 <div className="flex flex-col items-center">
                    <p className="text-lg mb-4 font-medium animate-pulse">Next lesson in {countdown}s...</p>
                    <button
                        onClick={handleCancelAutoAdvance}
                        className="text-sm underline opacity-70 hover:opacity-100"
                    >
                        Cancel
                    </button>
                 </div>
              ) : (
                  <div className="flex justify-between items-center mt-8 w-full gap-4">
                      {prevLesson ? (
                         <Link
                            to={`/lesson/${course.id}/${prevLesson.id}`}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                         >
                            <ArrowLeft size={18} /> Previous
                         </Link>
                      ) : <div></div>}

                      {nextLesson ? (
                         <Link
                            to={`/lesson/${course.id}/${nextLesson.id}`}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                         >
                            Next Lesson <ArrowRight size={18} />
                         </Link>
                      ) : (
                          <Link
                            to="/"
                            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                          >
                            Finish Course <CheckCircle size={18} />
                          </Link>
                      )}
                  </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
