import React from 'react';
import { Card } from '../ui/Card';
import { Stat } from '../ui/Stat';
import { AreaChart } from '../charts/AreaChart';
import { BarChart3, Clock, DollarSign, ShoppingCart, Users } from 'lucide-react';

export function OverviewMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden">
        <Stat 
          title="Total Revenue" 
          value="$0.00"
          change={{ value: 0, isPositive: true }}
          icon={<DollarSign size={20} />}
          color="blue"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
          <AreaChart color="blue" height={60} animated={true} points={0} />
        </div>
      </Card>
      
      <Card className="relative overflow-hidden">
        <Stat 
          title="Active Customers" 
          value="0"
          change={{ value: 0, isPositive: true }}
          icon={<Users size={20} />}
          color="green"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
          <AreaChart color="green" height={60} animated={true} points={0} />
        </div>
      </Card>
      
      <div className="opacity-50">
        <Card className="relative overflow-hidden">
          <div className="flex items-center">
            <Clock size={16} className="text-gray-500" />
          </div>
          <Stat 
            title="Conversion Rate" 
            value="--"
            icon={<BarChart3 size={20} />}
            color="purple"
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
            <AreaChart color="purple" height={60} animated={true} points={0} />
          </div>
        </Card>
      </div>
      
      <div className="opacity-50">
        <Card className="relative overflow-hidden">
          <div className="flex items-center">
            <Clock size={16} className="text-gray-500" />
          </div>
          <Stat 
            title="Average Order" 
            value="--"
            icon={<ShoppingCart size={20} />}
            color="yellow"
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-70">
            <AreaChart color="yellow" height={60} animated={true} points={0} />
          </div>
        </Card>
      </div>
    </div>
  );
}