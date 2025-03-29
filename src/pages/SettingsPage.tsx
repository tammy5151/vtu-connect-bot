
import React from 'react';
import WhatsAppIntegration from '@/components/settings/WhatsAppIntegration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account and application settings</p>
      </div>
      
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="bg-muted/40 rounded-md p-8 flex items-center justify-center text-muted-foreground">
            Account settings will be implemented here
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="bg-muted/40 rounded-md p-8 flex items-center justify-center text-muted-foreground">
            Security settings will be implemented here
          </div>
        </TabsContent>
        
        <TabsContent value="integrations">
          <WhatsAppIntegration />
        </TabsContent>
        
        <TabsContent value="billing">
          <div className="bg-muted/40 rounded-md p-8 flex items-center justify-center text-muted-foreground">
            Billing settings will be implemented here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
