import React from 'react';
import { Card } from '../ui/Card';
import { Stat } from '../ui/Stat';
import { AreaChart } from '../charts/AreaChart';
import { TrendingUp, Newspaper, Globe2, Clock } from 'lucide-react';

export function NewsMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden">
        <Stat 
          title="Trending Topics" 
          value="0"
          change={{ value: 0, isPositive: true }}
          icon={<TrendingUp size={20} />}
          color="blue"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
          <AreaChart color="blue" height={60} animated={true} />
        </div>
      </Card>
      
      <Card className="relative overflow-hidden">
        <Stat 
          title="Articles Analyzed" 
          value="0"
          change={{ value: 0, isPositive: true }}
          icon={<Newspaper size={20} />}
          color="green"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
          <AreaChart color="green" height={60} animated={true} />
        </div>
      </Card>
      
      <Card className="relative overflow-hidden">
        <Stat 
          title="Active Sources" 
          value="0"
          icon={<Globe2 size={20} />}
          color="purple"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
          <AreaChart color="purple" height={60} animated={true} />
        </div>
      </Card>
      
      <Card className="relative overflow-hidden">
        <Stat 
          title="Latest Update" 
          value="--"
          icon={<Clock size={20} />}
          color="yellow"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
          <AreaChart color="yellow" height={60} animated={true} />
        </div>
      </Card>
    </div>
  );
}