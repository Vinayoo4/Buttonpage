import React from 'react';

interface ThreeDButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const ThreeDButtons: React.FC<ThreeDButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: '3d-1',
      name: '3D Press',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-blue-600 border-b-4 border-blue-800 rounded-md active:border-b-2 active:translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
          3D Press
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-blue-600 border-b-4 border-blue-800 rounded-md active:border-b-2 active:translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
  3D Press
</button>`
    },
    {
      id: '3d-2',
      name: '3D Flip',
      component: (
        <button className="group relative inline-flex h-12 w-40 items-center justify-center overflow-hidden bg-transparent font-medium">
          <span className="absolute h-0 w-0 rounded-full bg-pink-600 transition-all duration-300 ease-out group-hover:h-56 group-hover:w-56"></span>
          <span className="relative text-pink-600 transition-colors duration-300 group-hover:text-white">3D Flip</span>
        </button>
      ),
      code: `<button className="group relative inline-flex h-12 w-40 items-center justify-center overflow-hidden bg-transparent font-medium">
  <span className="absolute h-0 w-0 rounded-full bg-pink-600 transition-all duration-300 ease-out group-hover:h-56 group-hover:w-56"></span>
  <span className="relative text-pink-600 transition-colors duration-300 group-hover:text-white">3D Flip</span>
</button>`
    },
    {
      id: '3d-3',
      name: '3D Shadow',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-purple-600 rounded-md transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[-5px_-5px_0_0_#9333ea] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          3D Shadow
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-purple-600 rounded-md transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[-5px_-5px_0_0_#9333ea] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
  3D Shadow
</button>`
    },
    {
      id: '3d-4',
      name: '3D Rotate',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-teal-600 rounded-md transition-all duration-300 hover:rotate-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
          3D Rotate
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-teal-600 rounded-md transition-all duration-300 hover:rotate-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
  3D Rotate
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

export default ThreeDButtons;