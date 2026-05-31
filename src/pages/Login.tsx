import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAppContext } from '../AppContext';

const Login = () => {
    const { users, setCurrentUser, darkMode } = useAppContext();
    const navigate = useNavigate();

    const [emailId, setEmailId] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Mock authentication: match either email or ID
        const user = users.find(u => u.email === emailId || u.id === emailId);

        if (user) {
            setCurrentUser(user);
            sessionStorage.setItem('mindcourse_session', user.id);
            navigate('/');
        } else {
            setError('Invalid credentials. Try demo/learner@mindcourse.com or admin/admin@mindcourse.com');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16">
            <div className={`p-8 rounded-2xl shadow-lg border text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <LogIn size={32} />
                </div>

                <h1 className="text-2xl font-bold mb-2">Welcome to MindCourse</h1>
                <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sign in to continue your mindfulness journey.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                            className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium text-left">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                <div className={`mt-8 pt-6 border-t text-sm text-left ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                    <p className="font-semibold mb-2 text-indigo-500">Demo Accounts:</p>
                    <ul className="space-y-1">
                        <li>Learner: <span className="font-mono">demo</span></li>
                        <li>Admin: <span className="font-mono">admin</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;
