
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Download, MessageSquare, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  totalSpent: string;
  lastTransaction: string;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '08012345678',
    status: 'active',
    totalSpent: '₦45,320',
    lastTransaction: '2 hours ago'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '09087654321',
    status: 'active',
    totalSpent: '₦78,150',
    lastTransaction: '1 day ago'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '07034567890',
    status: 'inactive',
    totalSpent: '₦12,750',
    lastTransaction: '3 weeks ago'
  },
  {
    id: '4',
    name: 'Emily Williams',
    email: 'emily@example.com',
    phone: '08023456789',
    status: 'active',
    totalSpent: '₦32,600',
    lastTransaction: '5 days ago'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '09034567890',
    status: 'active',
    totalSpent: '₦64,800',
    lastTransaction: 'Yesterday'
  }
];

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        
        <Button className="bg-vtu-primary hover:bg-vtu-primary/90">
          <UserPlus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
        <div className="w-full max-w-sm flex space-x-2">
          <Input 
            placeholder="Search customers..." 
            className="h-9"
          />
          <Button size="sm" className="h-9 px-3">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Transaction</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={customer.name} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Badge 
                    variant={customer.status === 'active' ? 'default' : 'secondary'}
                    className={customer.status === 'active' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>{customer.totalSpent}</TableCell>
                <TableCell>{customer.lastTransaction}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-vtu-primary">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>25</strong> customers
        </p>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-vtu-light text-vtu-primary">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
