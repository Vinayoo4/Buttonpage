import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-8 mt-12 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          ButtonGallery © {new Date().getFullYear()} - A beautiful collection of button styles and animations
        </p>
        <div className="flex items-center mt-4 md:mt-0">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`p-2 rounded-full transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="GitHub Repository"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;