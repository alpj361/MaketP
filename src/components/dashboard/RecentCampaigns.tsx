import React from 'react';
import { Card } from '../ui/Card';
import { BarChart } from '../charts/BarChart';
import { Clock } from 'lucide-react';

export function RecentCampaigns() {
  return (
    <Card 
      title="Recent Campaigns" 
      subtitle="Performance metrics for recent marketing campaigns"
      action={
        <div className="flex items-center opacity-50">
          <Clock size={16} className="text-gray-500" />
        </div>
      }
    >
      <div className="mb-6">
        <BarChart 
          data={[]}
          height={180}
          animated={true}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Spend
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Impressions
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                CTR
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                CPC
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Conversions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            <tr className="text-center">
              <td colSpan={7} className="px-2 py-8 text-gray-500 dark:text-gray-400">
                No campaigns to display
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}