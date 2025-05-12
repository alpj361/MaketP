import React from 'react';
import { Card } from '../ui/Card';
import { BarChart } from '../charts/BarChart';
import { Clock } from 'lucide-react';

export function TrendingTopics() {
  return (
    <Card 
      title="Trending Topics" 
      subtitle="Most discussed topics in the last 24 hours"
      action={
        <div className="flex items-center">
          <Clock size={16} className="text-gray-500" />
        </div>
      }
    >
      <div className="flex items-center justify-center h-64">
        <BarChart 
          data={[
            { label: 'Politics', value: 0, color: '#3b82f6' },
            { label: 'Economy', value: 0, color: '#10b981' },
            { label: 'Tech', value: 0, color: '#8b5cf6' },
            { label: 'Health', value: 0, color: '#ef4444' },
            { label: 'Environment', value: 0, color: '#f59e0b' }
          ]}
          height={180}
          animated={true}
        />
      </div>
    </Card>
  );
}