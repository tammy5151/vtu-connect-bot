
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Monitor your business performance and trends</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="mr-2 h-3.5 w-3.5" />
            Last 30 days
            <ChevronDown className="ml-2 h-3.5 w-3.5" />
          </Button>
          
          <Select defaultValue="download">
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="download">Download CSV</SelectItem>
              <SelectItem value="pdf">Export PDF</SelectItem>
              <SelectItem value="email">Email Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦1,245,320.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">↑ 15%</span> vs. last period
            </p>
            <div className="mt-4 h-[80px] w-full bg-vtu-light rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Sales chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">WhatsApp Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,487</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">↑ 23%</span> vs. last period
            </p>
            <div className="mt-4 h-[80px] w-full bg-vtu-light rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Interactions chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">↑ 7%</span> vs. last period
            </p>
            <div className="mt-4 h-[80px] w-full bg-vtu-light rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Conversion chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-vtu-light rounded-md flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Product distribution chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-vtu-light rounded-md flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Sales trend chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">WhatsApp Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Response Time</h4>
              <p className="text-2xl font-bold">1.2 min</p>
              <p className="text-xs text-green-600">↓ 15% improvement</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Completion Rate</h4>
              <p className="text-2xl font-bold">87.5%</p>
              <p className="text-xs text-green-600">↑ 3% improvement</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Customer Satisfaction</h4>
              <p className="text-2xl font-bold">4.8/5</p>
              <p className="text-xs text-green-600">↑ 0.2 improvement</p>
            </div>
          </div>
          
          <div className="mt-6 h-[200px] bg-vtu-light rounded-md flex items-center justify-center">
            <span className="text-sm text-muted-foreground">WhatsApp analytics details will be displayed here</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
