
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your VTU products and services</p>
        </div>
        
        <Button className="bg-vtu-primary hover:bg-vtu-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      <div className="flex items-center w-full max-w-sm space-x-2 mb-6">
        <Input type="text" placeholder="Search products..." className="w-full" />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="airtime" className="w-full">
        <TabsList>
          <TabsTrigger value="airtime">Airtime</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="cable">Cable TV</TabsTrigger>
          <TabsTrigger value="electricity">Electricity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="airtime" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {['MTN', 'Airtel', 'Glo', '9mobile'].map((provider) => (
              <Card key={provider}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{provider} Airtime</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Discount:</span>
                    <span className="font-medium">2.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Manage</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="data" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {['MTN Data', 'Airtel Data', 'Glo Data', '9mobile Data'].map((product) => (
              <Card key={product}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{product}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Plans:</span>
                    <span className="font-medium">12 plans</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View Plans</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cable" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {['DSTV', 'GOTV', 'Startimes'].map((provider) => (
              <Card key={provider}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{provider}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Packages:</span>
                    <span className="font-medium">8 packages</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View Packages</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="electricity" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {['PHCN', 'EKEDC', 'IBEDC', 'AEDC'].map((provider) => (
              <Card key={provider}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{provider}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Type:</span>
                    <span className="font-medium">Prepaid & Postpaid</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Manage</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsPage;
