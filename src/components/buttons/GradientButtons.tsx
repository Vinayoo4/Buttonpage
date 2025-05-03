import React from 'react';

interface GradientButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const GradientButtons: React.FC<GradientButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'gradient-1',
      name: 'Gradient Shift',
      component: (
        <button className="px-6 py-3 font-medium text-white transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Gradient Shift
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
  Gradient Shift
</button>`
    },
    {
      id: 'gradient-2',
      name: 'Gradient Slide',
      component: (
        <button className="relative px-6 py-3 font-medium text-white overflow-hidden rounded-md group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 to-orange-400 transition-all duration-300 ease-out group-hover:scale-110"></span>
          <span className="relative">Gradient Slide</span>
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-white overflow-hidden rounded-md group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 to-orange-400 transition-all duration-300 ease-out group-hover:scale-110"></span>
  <span className="relative">Gradient Slide</span>
</button>`
    },
    {
      id: 'gradient-3',
      name: 'Gradient Outline',
      component: (
        <button className="relative px-6 py-3 font-medium text-white transition-colors bg-transparent bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
          <span className="relative">Gradient Outline</span>
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-white transition-colors bg-transparent bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
  <span className="relative">Gradient Outline</span>
</button>`
    },
    {
      id: 'gradient-4',
      name: 'Animated Gradient',
      component: (
        <button className="relative px-6 py-3 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-500">
          Animated Gradient
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-500">
  Animated Gradient
</button>`
    },
  ];

  return (
    <>
      {buttons.map((button) => (
        <div 
          key={button.id}
          className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
            darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
          }`}
          onClick={() => {
            setSelectedButton(button.component);
            setSelectedCode(button.code);
          }}
        >
          <h3 className={`text-lg font-medium mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{button.name}</h3>
          <div className="flex items-center justify-center h-16">
            {button.component}
          </div>
        </div>
      ))}
    </>
  );
};

export default GradientButtons;