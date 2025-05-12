import React from 'react';

type DataItem = {
  label: string;
  value: number;
  color?: string;
};

const generateRandomData = (count: number): DataItem[] => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return Array.from({ length: count }, (_, i) => ({
    label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7],
    value: Math.floor(Math.random() * 100) + 20,
    color: colors[i % colors.length],
  }));
};

type BarChartProps = {
  data?: DataItem[];
  height?: number;
  barCount?: number;
  showValues?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  className?: string;
};

export function BarChart({
  data,
  height = 200,
  barCount = 7,
  showValues = true,
  showLabels = true,
  animated = true,
  className = '',
}: BarChartProps) {
  const chartData = React.useMemo(() => data || generateRandomData(barCount), [data, barCount]);
  
  const maxValue = Math.max(...chartData.map(item => item.value));
  
  // If maxValue is not a multiple of 10, round up to next 10
  const roundedMax = Math.ceil(maxValue / 10) * 10;
  
  const getHeight = (value: number) => {
    return (value / roundedMax) * (height - (showLabels ? 30 : 0));
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-full" style={{ height }}>
        {/* Chart grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pb-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-gray-200 dark:border-gray-800 h-1/5 flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                {Math.round((roundedMax * (4 - i)) / 4)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Bars */}
        <div className="absolute inset-0 ml-8 flex items-end justify-around pb-6">
          {chartData.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              {showValues && (
                <span className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">
                  {item.value}
                </span>
              )}
              <div
                className={`w-9 rounded-t-md transition-all duration-700 ${animated ? 'animate-grow-up' : ''}`}
                style={{
                  height: getHeight(item.value),
                  backgroundColor: item.color || '#3b82f6',
                  animationDelay: `${i * 0.1}s`,
                  transform: animated ? 'scaleY(0)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                }}
              ></div>
              {showLabels && (
                <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}