import React from 'react';

interface SimpleButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const SimpleButtons: React.FC<SimpleButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'simple-1',
      name: 'Smooth Fill',
      component: (
        <button className="relative px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
          Smooth Fill
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
  Smooth Fill
</button>`
    },
    {
      id: 'simple-2',
      name: 'Slide Background',
      component: (
        <button className="relative px-6 py-3 font-medium text-blue-600 transition-colors border-2 border-blue-600 rounded group hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
          <span className="relative z-10">Slide Background</span>
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-blue-600 transition-colors border-2 border-blue-600 rounded group hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
  <span className="relative z-10">Slide Background</span>
</button>`
    },
    {
      id: 'simple-3',
      name: 'Pulse Effect',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-green-600 rounded-md animate-none hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
          Pulse Effect
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-green-600 rounded-md animate-none hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
  Pulse Effect
</button>`
    },
    {
      id: 'simple-4',
      name: 'Scale Transform',
      component: (
        <button className="px-6 py-3 font-medium text-white transition-transform bg-purple-600 rounded-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Scale Transform
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white transition-transform bg-purple-600 rounded-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
  Scale Transform
</button>`
    }
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

export default SimpleButtons;