import React from 'react';
import { Layout } from '../components/layout/Layout';
import { OverviewMetrics } from '../components/dashboard/OverviewMetrics';
import { TrafficSources } from '../components/dashboard/TrafficSources';
import { RecentCampaigns } from '../components/dashboard/RecentCampaigns';
import { UserSegmentation } from '../components/dashboard/UserSegmentation';

export function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Marketing Dashboard</h1>
      
      <OverviewMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserSegmentation />
        <TrafficSources />
      </div>
      
      <div className="mt-6">
        <RecentCampaigns />
      </div>
    </Layout>
  );
}