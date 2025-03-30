
import React, { useEffect, useState } from 'react';
import { Users, PhoneCall, Smartphone, ArrowUp, Package, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/StatsCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  status: string;
  created_at: string;
  user?: {
    first_name: string;
    last_name: string;
  };
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
}

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalRevenue: 0,
    totalProducts: 0
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      // Fetch recent transactions
      const { data: transactionsData } = await supabase
        .from('transactions')
        .select(`
          id,
          transaction_type,
          amount,
          status,
          created_at,
          user_id,
          profiles:profiles(first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (transactionsData) {
        setTransactions(transactionsData.map(t => ({
          ...t,
          user: t.profiles as unknown as User
        })));
      }

      // Fetch users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);

      if (usersData) {
        setUsers(usersData);
      }

      // Fetch stats
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: transactionsCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true });

      const { data: revenue } = await supabase
        .from('transactions')
        .select('amount')
        .eq('status', 'completed');

      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: usersCount || 0,
        totalTransactions: transactionsCount || 0,
        totalRevenue: revenue ? revenue.reduce((sum, tx) => sum + Number(tx.amount), 0) : 0,
        totalProducts: productsCount || 0
      });
    };

    fetchData();
  }, [isAdmin, navigate]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">Welcome to the VTU Connect admin panel</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Users" 
          value={stats.totalUsers.toString()} 
          trend={{ value: "Active accounts", positive: true }}
          icon={<Users className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Total Transactions" 
          value={stats.totalTransactions.toString()} 
          trend={{ value: "All time", positive: true }}
          icon={<PhoneCall className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Total Revenue" 
          value={`₦${stats.totalRevenue.toFixed(2)}`} 
          trend={{ value: "All time", positive: true }}
          icon={<ArrowUp className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Total Products" 
          value={stats.totalProducts.toString()} 
          trend={{ value: "Active products", positive: true }}
          icon={<Package className="h-5 w-5 text-vtu-primary" />}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.transaction_type}</TableCell>
                      <TableCell>₦{Number(tx.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {tx.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No transactions found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Recent Users</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.first_name} {user.last_name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">No users found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Revenue Analytics</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-vtu-light rounded-md">
              <p className="text-vtu-primary text-sm">Revenue chart visualization will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
