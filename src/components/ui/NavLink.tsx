import React from 'react';
import { Clock } from 'lucide-react';

type NavLinkProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  comingSoon?: boolean;
};

export function NavLink({ href, title, icon, expanded, comingSoon }: NavLinkProps) {
  const isActive = window.location.pathname === href;
  
  return (
    <a 
      href={href}
      className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
        isActive && !comingSoon
          ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center justify-center">
        <span className={isActive && !comingSoon ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>
          {icon}
        </span>
      </div>
      
      {expanded && (
        <div className="ml-3 flex-1 flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          {comingSoon && <Clock size={16} className="text-gray-500" />}
        </div>
      )}
    </a>
  );
}