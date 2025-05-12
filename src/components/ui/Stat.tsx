import React from 'react';

type StatProps = {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
};

export function Stat({ title, value, change, icon, color = 'blue' }: StatProps) {
  const getColors = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'red':
        return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'purple':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'gray':
        return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="flex items-start space-x-4">
      {icon && (
        <div className={`p-3 rounded-lg ${getColors()}`}>
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h4 className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white">{value}</h4>
        {change && (
          <div className="mt-1 flex items-center">
            <span className={`text-sm font-medium ${change.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {change.isPositive ? '+' : ''}{change.value}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}