import React, { useState } from 'react';
import { Bell, Clock, Moon, Search, Sun } from 'lucide-react';

export function Header() {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="py-2 pl-10 pr-4 w-64 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 dark:text-gray-200"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="opacity-50">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center">
              <Bell size={20} className="text-gray-500 dark:text-gray-400" />
              <Clock size={16} className="text-gray-500 ml-2" />
            </button>
          </div>
          
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {darkMode ? (
              <Sun size={20} className="text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon size={20} className="text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <Clock size={16} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}