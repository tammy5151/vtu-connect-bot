
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, BarChart3, Settings, Users, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface SidebarLink {
  name: string;
  icon: React.ElementType;
  path: string;
}

const links: SidebarLink[] = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'WhatsApp Chat', icon: MessageSquare, path: '/chat' },
  { name: 'Products', icon: ShoppingCart, path: '/products' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const MobileNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0">
          <div className="py-6 flex flex-col h-full">
            <div className="px-3 mb-6">
              <Button className="w-full bg-vtu-primary hover:bg-vtu-primary/90">
                Add Credit
              </Button>
            </div>
            
            <div className="space-y-1 px-3 flex-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                
                return (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-vtu-light text-vtu-primary" 
                        : "hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="px-3 mt-auto">
              <div className="rounded-md bg-vtu-light p-3">
                <h3 className="font-medium text-vtu-primary">Need Help?</h3>
                <p className="text-sm text-muted-foreground mt-1">Contact our support team for assistance</p>
                <Button variant="link" className="text-vtu-secondary p-0 h-auto mt-1">Contact Support</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
