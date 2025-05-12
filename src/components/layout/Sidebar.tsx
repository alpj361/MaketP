import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock,
  LayoutDashboard, 
  LineChart, 
  Menu, 
  MessageSquare, 
  Settings, 
  Users
} from 'lucide-react';
import { NavLink } from '../ui/NavLink';

type NavItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  comingSoon?: boolean;
};

const navItems: NavItem[] = [
  { 
    title: 'Dashboard', 
    icon: <LayoutDashboard size={20} />, 
    path: '/' 
  },
  { 
    title: 'Analytics', 
    icon: <BarChart3 size={20} />, 
    path: '/analytics',
    comingSoon: true
  },
  { 
    title: 'Campaigns', 
    icon: <LineChart size={20} />, 
    path: '/campaigns',
    comingSoon: true
  },
  { 
    title: 'Customers', 
    icon: <Users size={20} />, 
    path: '/customers',
    comingSoon: true
  },
  { 
    title: 'Messages', 
    icon: <MessageSquare size={20} />, 
    path: '/messages',
    comingSoon: true
  },
  { 
    title: 'Settings', 
    icon: <Settings size={20} />, 
    path: '/settings',
    comingSoon: true
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className={`bg-white dark:bg-gray-900 h-screen flex flex-col border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {expanded ? (
          <h2 className="font-semibold text-xl text-gray-800 dark:text-white">MarketPulse</h2>
        ) : (
          <h2 className="font-semibold text-xl text-gray-800 dark:text-white">MP</h2>
        )}
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <Menu size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
        {navItems.map((item, index) => (
          <div key={index} className={item.comingSoon ? 'opacity-50' : ''}>
            <NavLink 
              href={item.path} 
              expanded={expanded}
              icon={item.icon}
              title={item.title}
              comingSoon={item.comingSoon}
            />
          </div>
        ))}
      </div>
      
      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 opacity-50">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Clock size={16} className="text-gray-500" />
          </div>
          {expanded && (
            <div className="ml-3">
              <Clock size={16} className="text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}