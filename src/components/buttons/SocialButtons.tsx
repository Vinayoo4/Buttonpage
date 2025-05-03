import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react';

interface SocialButtonsProps {
  darkMode: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setSelectedCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ darkMode, setSelectedButton, setSelectedCode }) => {
  const buttons = [
    {
      id: 'social-1',
      name: 'GitHub Button',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-gray-900 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-gray-900 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
  <Github className="w-5 h-5" />
  Continue with GitHub
</button>`
    },
    {
      id: 'social-2',
      name: 'Twitter Button',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-blue-400 rounded-lg flex items-center gap-2 hover:bg-blue-500 transition-colors">
          <Twitter className="w-5 h-5" />
          Share on Twitter
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-blue-400 rounded-lg flex items-center gap-2 hover:bg-blue-500 transition-colors">
  <Twitter className="w-5 h-5" />
  Share on Twitter
</button>`
    },
    {
      id: 'social-3',
      name: 'Facebook Button',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Facebook className="w-5 h-5" />
          Share on Facebook
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
  <Facebook className="w-5 h-5" />
  Share on Facebook
</button>`
    },
    {
      id: 'social-4',
      name: 'LinkedIn Button',
      component: (
        <button className="px-6 py-3 font-medium text-white bg-blue-700 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors">
          <Linkedin className="w-5 h-5" />
          Connect on LinkedIn
        </button>
      ),
      code: `<button className="px-6 py-3 font-medium text-white bg-blue-700 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors">
  <Linkedin className="w-5 h-5" />
  Connect on LinkedIn
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

export default SocialButtons;