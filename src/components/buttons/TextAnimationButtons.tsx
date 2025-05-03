import React from 'react';
import { motion } from 'framer-motion';

interface TextAnimationButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const TextAnimationButtons: React.FC<TextAnimationButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'text-1',
      name: 'Text Slide',
      component: (
        <button className="group relative px-6 py-3 font-medium text-white bg-indigo-600 rounded-lg overflow-hidden">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:translate-y-full">
            Click Me
          </span>
          <span className="absolute inset-0 w-full h-full translate-y-full transition-all duration-300 group-hover:translate-y-0">
            Let's Go!
          </span>
        </button>
      ),
      code: `<button className="group relative px-6 py-3 font-medium text-white bg-indigo-600 rounded-lg overflow-hidden">
  <span className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:translate-y-full">
    Click Me
  </span>
  <span className="absolute inset-0 w-full h-full translate-y-full transition-all duration-300 group-hover:translate-y-0">
    Let's Go!
  </span>
</button>`
    },
    {
      id: 'text-2',
      name: 'Text Fade',
      component: (
        <button className="group relative px-6 py-3 font-medium text-white bg-rose-600 rounded-lg overflow-hidden">
          <span className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Hover Me
          </span>
          <span className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            Amazing!
          </span>
        </button>
      ),
      code: `<button className="group relative px-6 py-3 font-medium text-white bg-rose-600 rounded-lg overflow-hidden">
  <span className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-100 group-hover:opacity-0">
    Hover Me
  </span>
  <span className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
    Amazing!
  </span>
</button>`
    },
    {
      id: 'text-3',
      name: 'Text Scale',
      component: (
        <button className="group relative px-6 py-3 font-medium text-white bg-emerald-600 rounded-lg overflow-hidden">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-100 opacity-100 group-hover:scale-150 group-hover:opacity-0">
            Scale Me
          </span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            Scaled!
          </span>
        </button>
      ),
      code: `<button className="group relative px-6 py-3 font-medium text-white bg-emerald-600 rounded-lg overflow-hidden">
  <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-100 opacity-100 group-hover:scale-150 group-hover:opacity-0">
    Scale Me
  </span>
  <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100">
    Scaled!
  </span>
</button>`
    },
    {
      id: 'text-4',
      name: 'Text Rotate',
      component: (
        <button className="group relative px-6 py-3 font-medium text-white bg-amber-600 rounded-lg overflow-hidden">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 rotate-0 opacity-100 group-hover:rotate-[30deg] group-hover:opacity-0">
            Rotate
          </span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 -rotate-[30deg] opacity-0 group-hover:rotate-0 group-hover:opacity-100">
            Rotated!
          </span>
        </button>
      ),
      code: `<button className="group relative px-6 py-3 font-medium text-white bg-amber-600 rounded-lg overflow-hidden">
  <span className="absolute inset-0 w-full h-full transition-all duration-300 rotate-0 opacity-100 group-hover:rotate-[30deg] group-hover:opacity-0">
    Rotate
  </span>
  <span className="absolute inset-0 w-full h-full transition-all duration-300 -rotate-[30deg] opacity-0 group-hover:rotate-0 group-hover:opacity-100">
    Rotated!
  </span>
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

export default TextAnimationButtons;