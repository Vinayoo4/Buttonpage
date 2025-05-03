import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoadingButtons: React.FC<LoadingButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'loading-1',
      name: 'Spinner Loading',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
  <Loader2 className="w-4 h-4 animate-spin" />
  Loading...
</button>`
    },
    {
      id: 'loading-2',
      name: 'Progress Loading',
      component: (
        <button className="relative px-6 py-3 font-medium text-white bg-green-600 rounded-lg overflow-hidden">
          <span className="relative z-10">Processing...</span>
          <div className="absolute inset-0 bg-green-500 animate-[progress_2s_ease-in-out_infinite]"></div>
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-white bg-green-600 rounded-lg overflow-hidden">
  <span className="relative z-10">Processing...</span>
  <div className="absolute inset-0 bg-green-500 animate-[progress_2s_ease-in-out_infinite]"></div>
</button>`
    },
    {
      id: 'loading-3',
      name: 'Dots Loading',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-purple-600 rounded-lg flex items-center gap-1 hover:bg-purple-700 transition-colors">
          Loading
          <span className="animate-[dots_1.4s_infinite]">.</span>
          <span className="animate-[dots_1.4s_0.2s_infinite]">.</span>
          <span className="animate-[dots_1.4s_0.4s_infinite]">.</span>
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-purple-600 rounded-lg flex items-center gap-1 hover:bg-purple-700 transition-colors">
  Loading
  <span className="animate-[dots_1.4s_infinite]">.</span>
  <span className="animate-[dots_1.4s_0.2s_infinite]">.</span>
  <span className="animate-[dots_1.4s_0.4s_infinite]">.</span>
</button>`
    },
    {
      id: 'loading-4',
      name: 'Success State',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-emerald-600 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors">
          <svg className="w-5 h-5 animate-[checkmark_0.4s_ease-in-out]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 }}
              d="M20 6L9 17l-5-5"
            />
          </svg>
          Complete
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-emerald-600 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors">
  <svg className="w-5 h-5 animate-[checkmark_0.4s_ease-in-out]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4 }}
      d="M20 6L9 17l-5-5"
    />
  </svg>
  Complete
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

export default LoadingButtons;