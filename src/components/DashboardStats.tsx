
import React from 'react';
import { BookOpen, Code, CheckCircle2, Award, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            {change && (
              <p className={`text-xs mt-1 ${
                trend === 'up' ? 'text-green-500' : 
                trend === 'down' ? 'text-red-500' : 
                'text-gray-500'
              }`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
              </p>
            )}
          </div>
          <div className="p-2 bg-muted rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Active Courses" 
        value={6} 
        change="2 new this week"
        /*icon={<BookOpen className="h-5 w-5 text-campus-600" />}*/
        trend="neutral"
      />
      <StatCard 
        title="Coding Problems" 
        value={127} 
        change="75 completed"
        /*icon={<Code className="h-5 w-5 text-blue-600" />}*/
        trend="neutral"
      />
      <StatCard 
        title="Assignments Due" 
        value={3} 
        change="Due this week"
        /*icon={<CheckCircle2 className="h-5 w-5 text-orange-600" />}*/
        trend="neutral"
      />
      <StatCard 
        title="Coding Streak" 
        value="7 days" 
        change="Personal best"
        /*icon={<TrendingUp className="h-5 w-5 text-green-600" />}*/
        trend="neutral"
      />
    </div>
  );
};

export default DashboardStats;
