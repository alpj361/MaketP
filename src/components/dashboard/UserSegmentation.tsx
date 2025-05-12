import React from 'react';
import { Card } from '../ui/Card';
import { Clock } from 'lucide-react';

export function UserSegmentation() {
  return (
    <Card 
      title="Customer Segments" 
      subtitle="Distribution of customer types in the last 30 days"
      action={
        <div className="flex items-center">
          <Clock size={16} className="text-gray-500" />
        </div>
      }
    >
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Customer segmentation data will appear here
      </div>
    </Card>
  );
}