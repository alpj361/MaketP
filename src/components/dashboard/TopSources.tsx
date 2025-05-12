import React from 'react';
import { Card } from '../ui/Card';
import { Globe2 } from 'lucide-react';

export function TopSources() {
  return (
    <Card 
      title="Top Sources" 
      subtitle="Most active news sources"
      action={
        <div className="flex items-center">
          <Globe2 size={16} className="text-gray-500" />
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">No sources yet</span>
          </div>
          <span className="text-sm text-gray-500">0 articles</span>
        </div>
      </div>
    </Card>
  );
}