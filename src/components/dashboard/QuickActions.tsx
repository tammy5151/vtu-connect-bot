
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, Smartphone, Tv, Zap, CreditCard, Users } from 'lucide-react';

interface ActionButton {
  label: string;
  icon: React.ReactNode;
  color: string;
}

const actions: ActionButton[] = [
  {
    label: 'Airtime',
    icon: <PhoneCall className="h-5 w-5" />,
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    label: 'Data',
    icon: <Smartphone className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    label: 'Cable TV',
    icon: <Tv className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-700'
  },
  {
    label: 'Electricity',
    icon: <Zap className="h-5 w-5" />,
    color: 'bg-green-100 text-green-700'
  },
  {
    label: 'Fund Wallet',
    icon: <CreditCard className="h-5 w-5" />,
    color: 'bg-red-100 text-red-700'
  },
  {
    label: 'Refer & Earn',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-indigo-100 text-indigo-700'
  }
];

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-dashed"
            >
              <div className={`p-2 rounded-full mb-2 ${action.color}`}>
                {action.icon}
              </div>
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
