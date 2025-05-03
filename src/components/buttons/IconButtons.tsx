import React from 'react';
import { ArrowRight, Download, Heart, Zap } from 'lucide-react';

interface IconButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const IconButtons: React.FC<IconButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'icon-1',
      name: 'Icon Slide',
      component: (
        <button className="group relative px-6 py-3 font-medium text-white bg-blue-600 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
          <div className="flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-full opacity-100 group-hover:opacity-0">
            <span>Click Me</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
            <ArrowRight className="mr-2" size={16} />
            <span>Go Now</span>
          </div>
        </button>
      ),
      code: `<button className="group relative px-6 py-3 font-medium text-white bg-blue-600 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
  <div className="flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-full opacity-100 group-hover:opacity-0">
    <span>Click Me</span>
  </div>
  <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
    <ArrowRight className="mr-2" size={16} />
    <span>Go Now</span>
  </div>
</button>`
    },
    {
      id: 'icon-2',
      name: 'Icon Pop',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-green-600 rounded-md flex items-center gap-2 transition-all duration-300 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
          <span>Download</span>
          <Download size={16} />
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-green-600 rounded-md flex items-center gap-2 transition-all duration-300 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
  <span>Download</span>
  <Download size={16} />
</button>`
    },
    {
      id: 'icon-3',
      name: 'Icon Rotate',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-purple-600 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          <span>Like</span>
          <Heart className="transition-transform duration-300 hover:rotate-12" size={16} />
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-purple-600 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
  <span>Like</span>
  <Heart className="transition-transform duration-300 hover:rotate-12" size={16} />
</button>`
    },
    {
      id: 'icon-4',
      name: 'Icon Pulse',
      component: (
        <button className="group px-6 py-3 font-medium text-white bg-amber-500 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          <span>Power</span>
          <Zap className="group-hover:animate-pulse" size={16} />
        </button>
      ),
      code: `<button className="group px-6 py-3 font-medium text-white bg-amber-500 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
  <span>Power</span>
  <Zap className="group-hover:animate-pulse" size={16} />
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

export default IconButtons;