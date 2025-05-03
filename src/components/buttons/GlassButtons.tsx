import React from 'react';
import { motion } from 'framer-motion';

interface GlassButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const GlassButtons: React.FC<GlassButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'glass-1',
      name: 'Basic Glass',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-white bg-opacity-20 rounded-lg backdrop-blur-lg shadow-lg hover:bg-opacity-30 transition-all duration-300">
          Basic Glass
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-white bg-opacity-20 rounded-lg backdrop-blur-lg shadow-lg hover:bg-opacity-30 transition-all duration-300">
  Basic Glass
</button>`
    },
    {
      id: 'glass-2',
      name: 'Colored Glass',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-blue-500 bg-opacity-30 rounded-lg backdrop-blur-lg shadow-lg hover:bg-opacity-40 transition-all duration-300">
          Colored Glass
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-blue-500 bg-opacity-30 rounded-lg backdrop-blur-lg shadow-lg hover:bg-opacity-40 transition-all duration-300">
  Colored Glass
</button>`
    },
    {
      id: 'glass-3',
      name: 'Border Glass',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg backdrop-blur-lg shadow-lg hover:bg-opacity-20 transition-all duration-300">
          Border Glass
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg backdrop-blur-lg shadow-lg hover:bg-opacity-20 transition-all duration-300">
  Border Glass
</button>`
    },
    {
      id: 'glass-4',
      name: 'Gradient Glass',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-gradient-to-r from-white/20 to-white/10 rounded-lg backdrop-blur-lg shadow-lg hover:from-white/30 hover:to-white/20 transition-all duration-300">
          Gradient Glass
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-gradient-to-r from-white/20 to-white/10 rounded-lg backdrop-blur-lg shadow-lg hover:from-white/30 hover:to-white/20 transition-all duration-300">
  Gradient Glass
</button>`
    }
  ];

  return (
    <>
      {buttons.map((button) => (
        <motion.div 
          key={button.id}
          className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
            darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
          }`}
          onClick={() => {
            setSelectedButton(button.component);
            setSelectedCode(button.code);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className={`text-lg font-medium mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{button.name}</h3>
          <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-purple-600">
            {button.component}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default GlassButtons;