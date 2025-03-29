
import React from 'react';
import { Users, PhoneCall, Smartphone, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import QuickActions from '@/components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back to your VTU Connect dashboard</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Balance" 
          value="₦45,320.00" 
          trend={{ value: "12% from last month", positive: true }}
          icon={<ArrowUp className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Active Users" 
          value="1,247" 
          trend={{ value: "8% from last month", positive: true }}
          icon={<Users className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Airtime Sales" 
          value="₦320,450.00" 
          trend={{ value: "5% from last month", positive: true }}
          icon={<PhoneCall className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Data Sales" 
          value="₦520,230.00" 
          trend={{ value: "3% from last month", positive: false }}
          icon={<Smartphone className="h-5 w-5 text-vtu-primary" />}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <RecentTransactions />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">WhatsApp Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-vtu-light rounded-md">
              <p className="text-vtu-primary text-sm">Chart visualization will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm">MTN 1GB Data</p>
                <p className="text-sm font-semibold">42%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-vtu-primary h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm">Airtel Airtime</p>
                <p className="text-sm font-semibold">28%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-vtu-primary h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm">DSTV Subscription</p>
                <p className="text-sm font-semibold">18%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-vtu-primary h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm">PHCN Electricity</p>
                <p className="text-sm font-semibold">12%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-vtu-primary h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
