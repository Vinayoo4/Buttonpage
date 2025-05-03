import React from 'react';
import { motion } from 'framer-motion';

interface NeomorphicButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const NeomorphicButtons: React.FC<NeomorphicButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'neomorphic-1',
      name: 'Soft Shadow',
      component: (
        <button className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 text-gray-200 shadow-[4px_4px_10px_0px_#1a1c20,-4px_-4px_10px_0px_#2c2e33]'
            : 'bg-gray-100 text-gray-800 shadow-[4px_4px_10px_0px_#d1d1d1,-4px_-4px_10px_0px_#ffffff]'
        } hover:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.2)]`}>
          Soft Shadow
        </button>
      ),
      code: `<button className="px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-gray-100 text-gray-800 shadow-[4px_4px_10px_0px_#d1d1d1,-4px_-4px_10px_0px_#ffffff] hover:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.2)]">
  Soft Shadow
</button>`
    },
    {
      id: 'neomorphic-2',
      name: 'Pressed State',
      component: (
        <button className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 text-gray-200 shadow-[6px_6px_12px_0px_#1a1c20,-6px_-6px_12px_0px_#2c2e33] active:shadow-[inset_6px_6px_12px_0px_#1a1c20,inset_-6px_-6px_12px_0px_#2c2e33]'
            : 'bg-gray-100 text-gray-800 shadow-[6px_6px_12px_0px_#d1d1d1,-6px_-6px_12px_0px_#ffffff] active:shadow-[inset_6px_6px_12px_0px_#d1d1d1,inset_-6px_-6px_12px_0px_#ffffff]'
        }`}>
          Pressed State
        </button>
      ),
      code: `<button className="px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-gray-100 text-gray-800 shadow-[6px_6px_12px_0px_#d1d1d1,-6px_-6px_12px_0px_#ffffff] active:shadow-[inset_6px_6px_12px_0px_#d1d1d1,inset_-6px_-6px_12px_0px_#ffffff]">
  Pressed State
</button>`
    },
    {
      id: 'neomorphic-3',
      name: 'Gradient Neomorphic',
      component: (
        <button className={`px-6 py-3 rounded-xl font-medium bg-gradient-to-r transition-all duration-300 ${
          darkMode
            ? 'from-gray-800 to-gray-700 text-gray-200 shadow-[4px_4px_10px_0px_#1a1c20,-4px_-4px_10px_0px_#2c2e33]'
            : 'from-gray-50 to-gray-100 text-gray-800 shadow-[4px_4px_10px_0px_#d1d1d1,-4px_-4px_10px_0px_#ffffff]'
        } hover:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.1)]`}>
          Gradient Neomorphic
        </button>
      ),
      code: `<button className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow-[4px_4px_10px_0px_#d1d1d1,-4px_-4px_10px_0px_#ffffff] hover:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.1)]">
  Gradient Neomorphic
</button>`
    },
    {
      id: 'neomorphic-4',
      name: 'Colored Neomorphic',
      component: (
        <button className="px-6 py-3 rounded-xl font-medium text-blue-600 bg-blue-50 shadow-[4px_4px_10px_0px_#cce3ff,-4px_-4px_10px_0px_#ffffff] transition-all duration-300 hover:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.1)]">
          Colored Neomorphic
        </button>
      ),
      code: `<button className="px-6 py-3 rounded-xl font-medium text-blue-600 bg-blue-50 shadow-[4px_4px_10px_0px_#cce3ff,-4px_-4px_10px_0px_#ffffff] transition-all duration-300 hover:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.1)]">
  Colored Neomorphic
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
          <div className="flex items-center justify-center h-16">
            {button.component}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default NeomorphicButtons;