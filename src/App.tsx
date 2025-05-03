import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import ButtonCatalog from './components/ButtonCatalog';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const disableActions = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      alert('Hey 👶🫵🏼 ,Stay Out of it 🙅🧌.');
    };
    document.addEventListener('copy', disableActions);
    document.addEventListener('cut', disableActions);
    document.addEventListener('contextmenu', disableActions);

    return () => {
      document.removeEventListener('copy', disableActions);
      document.removeEventListener('cut', disableActions);
      document.removeEventListener('contextmenu', disableActions);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="fixed top-4 right-4 z-10">
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800 shadow-md'}`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <Header darkMode={darkMode} />
        <main className="my-12">
          <ButtonCatalog darkMode={darkMode} />
        </main>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;