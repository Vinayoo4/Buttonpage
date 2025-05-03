import React from 'react';
import { Palette } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  return (
    <header className="py-10 text-center">
      <div className="flex items-center justify-center mb-4">
        <Palette size={40} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Button<span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Gallery</span>
        </h1>
      </div>
      <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        A showcase of 20 beautiful button designs with unique hover animations and effects
      </p>
      <div className={`mt-6 inline-block rounded-full px-6 py-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <span className="text-sm font-medium">Hover, click, and explore each button to see its effect</span>
      </div>
    </header>
  );
};

export default Header;