import React from 'react';
import { Card } from '../ui/Card';
import { Clock } from 'lucide-react';

export function TrafficSources() {
  return (
    <Card 
      title="Traffic Sources" 
      subtitle="Last 30 days visitor breakdown"
      action={
        <div className="flex items-center">
          <Clock size={16} className="text-gray-500" />
        </div>
      }
    >
      <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
        Traffic source data will appear here
      </div>
    </Card>
  );
}