import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../AppContext';

const Forbidden = () => {
    const { darkMode } = useAppContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg ${darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-500'}`}>
                <ShieldAlert size={48} />
            </div>

            <h1 className="text-4xl font-bold mb-4">403 - Access Denied</h1>
            <p className={`text-lg max-w-md mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You don't have permission to view this page. This area is restricted to administrators.
            </p>

            <Link
                to="/"
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors"
            >
                <ArrowLeft size={20} /> Return to Dashboard
            </Link>
        </div>
    );
};

export default Forbidden;
