
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft, PhoneCall, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'airtime' | 'data' | 'tv' | 'electricity';
  amount: string;
  recipient: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'airtime',
    amount: '₦1,000',
    recipient: '08012345678',
    date: '2 mins ago',
    status: 'completed'
  },
  {
    id: 'tx2',
    type: 'data',
    amount: '₦2,500',
    recipient: '09087654321',
    date: '1 hour ago',
    status: 'completed'
  },
  {
    id: 'tx3',
    type: 'airtime',
    amount: '₦500',
    recipient: '07023456789',
    date: '3 hours ago',
    status: 'completed'
  },
  {
    id: 'tx4',
    type: 'data',
    amount: '₦1,500',
    recipient: '08123456789',
    date: 'Yesterday',
    status: 'failed'
  },
];

const getIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'airtime':
      return <PhoneCall className="h-4 w-4 text-yellow-500" />;
    case 'data':
      return <Smartphone className="h-4 w-4 text-blue-500" />;
    case 'tv':
      return <ArrowUpRight className="h-4 w-4 text-purple-500" />;
    case 'electricity':
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    default:
      return <ArrowDownLeft className="h-4 w-4" />;
  }
};

const RecentTransactions = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <button className="text-sm text-vtu-primary">View All</button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-muted">
                {getIcon(transaction.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Topup</p>
                  <p className="font-medium">{transaction.amount}</p>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <p>{transaction.recipient}</p>
                  <p>{transaction.date}</p>
                </div>
              </div>
              
              <div className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                transaction.status === 'completed' ? "bg-green-100 text-green-800" :
                transaction.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              )}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
