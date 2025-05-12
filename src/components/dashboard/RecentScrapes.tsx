import React from 'react';
import { Card } from '../ui/Card';
import { Clock } from 'lucide-react';

export function RecentScrapes() {
  return (
    <Card 
      title="Recent Scrapes" 
      subtitle="Latest articles and data collected"
      action={
        <div className="flex items-center">
          <Clock size={16} className="text-gray-500" />
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Source
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Published
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Sentiment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            <tr className="text-center">
              <td colSpan={5} className="px-2 py-8 text-gray-500 dark:text-gray-400">
                No articles scraped yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}