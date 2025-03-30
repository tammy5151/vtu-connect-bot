
import React, { useEffect, useState } from 'react';
import { PhoneCall, Smartphone, ArrowUp, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/StatsCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import QuickActions from '@/components/dashboard/QuickActions';

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  status: string;
  created_at: string;
  reference: string;
}

const UserDashboard = () => {
  const { user, profile } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    balance: 5000, // Placeholder - would be fetched from user account
    airtimePurchased: 0,
    dataPurchased: 0,
    billsPaid: 0
  });

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      setTransactions(data);

      // Calculate stats
      const airtimeTotal = data
        .filter(tx => tx.transaction_type === 'airtime' && tx.status === 'completed')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
        
      const dataTotal = data
        .filter(tx => tx.transaction_type === 'data' && tx.status === 'completed')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
        
      const billsTotal = data
        .filter(tx => ['electricity', 'cable', 'water'].includes(tx.transaction_type) && tx.status === 'completed')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
        
      setStats({
        balance: 5000, // Placeholder
        airtimePurchased: airtimeTotal,
        dataPurchased: dataTotal,
        billsPaid: billsTotal
      });
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}! Here's what's happening with your account.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Balance" 
          value={`₦${stats.balance.toFixed(2)}`} 
          trend={{ value: "Available for transactions", positive: true }}
          icon={<CreditCard className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Airtime Purchased" 
          value={`₦${stats.airtimePurchased.toFixed(2)}`} 
          trend={{ value: "Lifetime purchases", positive: true }}
          icon={<PhoneCall className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Data Purchased" 
          value={`₦${stats.dataPurchased.toFixed(2)}`} 
          trend={{ value: "Lifetime purchases", positive: true }}
          icon={<Smartphone className="h-5 w-5 text-vtu-primary" />}
        />
        <StatsCard 
          title="Bills Paid" 
          value={`₦${stats.billsPaid.toFixed(2)}`} 
          trend={{ value: "Lifetime payments", positive: true }}
          icon={<ArrowUp className="h-5 w-5 text-vtu-primary" />}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        
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
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="capitalize">{tx.transaction_type}</TableCell>
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
                      <TableCell className="text-xs font-mono">{tx.reference || '-'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No transactions found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
