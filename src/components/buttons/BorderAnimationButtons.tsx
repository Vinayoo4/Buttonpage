import React from 'react';

interface BorderAnimationButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const BorderAnimationButtons: React.FC<BorderAnimationButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'border-1',
      name: 'Border Sweep',
      component: (
        <button className="relative px-6 py-3 font-medium text-white bg-transparent border-2 border-pink-500 rounded-md group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          <span className="relative z-10 text-pink-500 transition-colors duration-300 group-hover:text-white">Border Sweep</span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 ease-out bg-pink-500 rounded-md -z-1 group-hover:h-full"></span>
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-white bg-transparent border-2 border-pink-500 rounded-md group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
  <span className="relative z-10 text-pink-500 transition-colors duration-300 group-hover:text-white">Border Sweep</span>
  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 ease-out bg-pink-500 rounded-md -z-1 group-hover:h-full"></span>
</button>`
    },
    {
      id: 'border-2',
      name: 'Border Flash',
      component: (
        <button className="relative px-6 py-3 overflow-hidden font-medium text-indigo-600 transition-all duration-300 border-2 border-indigo-600 rounded-md hover:border-indigo-400 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
          Border Flash
        </button>
      ),
      code: `<button className="relative px-6 py-3 overflow-hidden font-medium text-indigo-600 transition-all duration-300 border-2 border-indigo-600 rounded-md hover:border-indigo-400 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
  Border Flash
</button>`
    },
    {
      id: 'border-3',
      name: 'Border Slide',
      component: (
        <button className="relative px-6 py-3 font-medium text-white bg-orange-500 rounded-md before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-orange-500 before:rounded-md before:transition-all before:duration-300 hover:before:scale-110 hover:before:opacity-0 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Border Slide
        </button>
      ),
      code: `<button className="relative px-6 py-3 font-medium text-white bg-orange-500 rounded-md before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-orange-500 before:rounded-md before:transition-all before:duration-300 hover:before:scale-110 hover:before:opacity-0 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
  Border Slide
</button>`
    },
    {
      id: 'border-4',
      name: 'Outline Appear',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-teal-600 rounded-md outline-offset-0 outline-teal-600 outline-2 hover:outline hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-all duration-300">
          Outline Appear
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-teal-600 rounded-md outline-offset-0 outline-teal-600 outline-2 hover:outline hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-all duration-300">
  Outline Appear
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

export default BorderAnimationButtons;