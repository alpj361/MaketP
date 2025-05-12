import React from 'react';

const generateRandomData = (points: number, min: number, max: number): number[] => {
  return Array.from({ length: points }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

type AreaChartProps = {
  data?: number[];
  height?: number;
  width?: string | number;
  color?: string;
  strokeWidth?: number;
  gradient?: boolean;
  points?: number;
  min?: number;
  max?: number;
  className?: string;
  animated?: boolean;
};

export function AreaChart({
  data,
  height = 80,
  width = '100%',
  color = 'blue',
  strokeWidth = 2,
  gradient = true,
  points = 12,
  min = 10,
  max = 100,
  className = '',
  animated = true,
}: AreaChartProps) {
  const generatedData = React.useMemo(() => data || generateRandomData(points, min, max), [data, points, min, max]);
  
  const minValue = Math.min(...generatedData);
  const maxValue = Math.max(...generatedData);
  
  const getY = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return height - normalized * (height - strokeWidth * 2) - strokeWidth;
  };
  
  const getX = (index: number) => {
    return (index / (generatedData.length - 1)) * 100 + '%';
  };
  
  const getColorVariables = () => {
    switch (color) {
      case 'blue':
        return {
          stroke: '#3b82f6',
          fill: '#93c5fd',
          fillOpacity: 0.2,
          gradientFrom: '#3b82f6',
          gradientTo: '#bfdbfe',
        };
      case 'green':
        return {
          stroke: '#10b981',
          fill: '#6ee7b7',
          fillOpacity: 0.2,
          gradientFrom: '#10b981',
          gradientTo: '#a7f3d0',
        };
      case 'red':
        return {
          stroke: '#ef4444',
          fill: '#fca5a5',
          fillOpacity: 0.2,
          gradientFrom: '#ef4444',
          gradientTo: '#fecaca',
        };
      case 'yellow':
        return {
          stroke: '#f59e0b',
          fill: '#fcd34d',
          fillOpacity: 0.2,
          gradientFrom: '#f59e0b',
          gradientTo: '#fde68a',
        };
      case 'purple':
        return {
          stroke: '#8b5cf6',
          fill: '#c4b5fd',
          fillOpacity: 0.2,
          gradientFrom: '#8b5cf6',
          gradientTo: '#ddd6fe',
        };
      default:
        return {
          stroke: '#3b82f6',
          fill: '#93c5fd',
          fillOpacity: 0.2,
          gradientFrom: '#3b82f6',
          gradientTo: '#bfdbfe',
        };
    }
  };
  
  const colorVars = getColorVariables();
  const id = React.useId();
  
  // Generate path
  let pathD = '';
  // Start at bottom left
  pathD += `M 0,${height} `;
  // Draw line to first point
  pathD += `L 0,${getY(generatedData[0])} `;
  
  // Add all points
  generatedData.forEach((value, index) => {
    pathD += `L ${getX(index)},${getY(value)} `;
  });
  
  // Close the path by going to bottom right then back to start
  pathD += `L 100%,${height} Z`;
  
  const animationClass = animated ? 'animate-draw-line' : '';
  
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 100% ${height}`}
      preserveAspectRatio="none"
      className={`overflow-visible ${className}`}
    >
      {gradient && (
        <defs>
          <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorVars.gradientFrom} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colorVars.gradientTo} stopOpacity="0.02" />
          </linearGradient>
        </defs>
      )}
      
      <path
        d={pathD}
        fill={gradient ? `url(#gradient-${id})` : colorVars.fill}
        fillOpacity={gradient ? 1 : colorVars.fillOpacity}
        stroke="none"
      />
      
      <path
        d={pathD.replace(` L 100%,${height} Z`, '')}
        fill="none"
        stroke={colorVars.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animationClass}
        style={{ strokeDasharray: 1000, strokeDashoffset: animated ? 1000 : 0 }}
      />
      
      {/* Add dots for each data point */}
      {generatedData.map((value, index) => (
        <circle
          key={index}
          cx={getX(index)}
          cy={getY(value)}
          r={strokeWidth + 1}
          fill="white"
          stroke={colorVars.stroke}
          strokeWidth={strokeWidth / 2}
          className={animated ? 'animate-fade-in' : ''}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </svg>
  );
}