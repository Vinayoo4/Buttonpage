import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Copy, Check, Search } from 'lucide-react';
import SimpleButtons from './buttons/SimpleButtons';
import BorderAnimationButtons from './buttons/BorderAnimationButtons';
import GradientButtons from './buttons/GradientButtons';
import IconButtons from './buttons/IconButtons';
import ThreeDButtons from './buttons/ThreeDButtons';
import NeomorphicButtons from './buttons/NeomorphicButtons';
import GlassButtons from './buttons/GlassButtons';
import LoadingButtons from './buttons/LoadingButtons';
import SocialButtons from './buttons/SocialButtons';
import TextAnimationButtons from './buttons/TextAnimationButtons';

interface ButtonCatalogProps {
  darkMode: boolean;
}

type CategoryType = 'all' | 'simple' | 'border' | 'gradient' | 'icon' | '3d' | 'neomorphic' | 'glass' | 'loading' | 'social' | 'text';

const ButtonCatalog: React.FC<ButtonCatalogProps> = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedButton, setSelectedButton] = useState<React.ReactNode | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = [
    { id: 'all', name: 'All Buttons' },
    { id: 'simple', name: 'Simple Effects' },
    { id: 'border', name: 'Border Animations' },
    { id: 'gradient', name: 'Gradient Effects' },
    { id: 'icon', name: 'Icon Buttons' },
    { id: '3d', name: '3D Effects' },
    { id: 'neomorphic', name: 'Neomorphic' },
    { id: 'glass', name: 'Glass Effects' },
    { id: 'loading', name: 'Loading States' },
    { id: 'social', name: 'Social Media' },
    { id: 'text', name: 'Text Animations' }
  ];

  const handleCopyCode = () => {
    if (selectedCode) {
      navigator.clipboard.writeText(selectedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      <div className="mb-12">
        <motion.div 
          className={`p-6 rounded-lg shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Button Preview
            </h2>
            <div className="relative mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search buttons..."
                className={`pl-10 pr-4 py-2 rounded-full w-full md:w-64 focus:outline-none focus:ring-2 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500' 
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-blue-400'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className={`absolute left-3 top-2.5 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className={`flex-1 rounded-lg p-10 flex items-center justify-center min-h-[200px] border transition-colors duration-300 ${
              darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
            }`}>
              {selectedButton ? (
                selectedButton
              ) : (
                <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Click on any button below to see it in action
                </p>
              )}
            </div>
            
            {selectedCode && (
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Code Snippet</h3>
                  <button
                    onClick={handleCopyCode}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className={`p-4 rounded-md text-sm overflow-x-auto transition-colors duration-300 ${
                  darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>
                  <code>{selectedCode}</code>
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id as CategoryType)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? darkMode 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {(activeCategory === 'all' || activeCategory === 'simple') && (
          <SimpleButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'border') && (
          <BorderAnimationButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'gradient') && (
          <GradientButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'icon') && (
          <IconButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === '3d') && (
          <ThreeDButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'neomorphic') && (
          <NeomorphicButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'glass') && (
          <GlassButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'loading') && (
          <LoadingButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'social') && (
          <SocialButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
        {(activeCategory === 'all' || activeCategory === 'text') && (
          <TextAnimationButtons darkMode={darkMode} setSelectedButton={setSelectedButton} setSelectedCode={setSelectedCode} />
        )}
      </motion.div>
    </div>
  );
};

export default ButtonCatalog;