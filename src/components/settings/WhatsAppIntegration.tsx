
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Info, CheckCircle2 } from 'lucide-react';

const WhatsAppIntegration = () => {
  const [apiKey, setApiKey] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsConnected(true);
      toast.success("WhatsApp integration settings saved successfully");
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>WhatsApp Business API Integration</CardTitle>
            <CardDescription>Connect your WhatsApp Business account to enable automated responses</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Switch 
              checked={isEnabled} 
              onCheckedChange={setIsEnabled} 
              id="airplane-mode" 
            />
            <Label htmlFor="airplane-mode" className="font-medium text-sm">
              {isEnabled ? 'Active' : 'Inactive'}
            </Label>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="settings">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="settings" className="p-0">
          <CardContent className="pt-6 space-y-4">
            {isConnected ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Successfully Connected</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your WhatsApp Business API is correctly configured and active. Messages will be automatically processed.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Setup Required</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Configure your WhatsApp Business API credentials to enable automated responses.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input 
                id="api-key" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                placeholder="Enter your WhatsApp Business API key" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone-number">WhatsApp Business Phone Number</Label>
              <Input 
                id="phone-number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                placeholder="+1234567890" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook">Webhook URL</Label>
              <Input 
                id="webhook" 
                value={webhookUrl} 
                onChange={(e) => setWebhookUrl(e.target.value)} 
                placeholder="https://your-webhook-url.com/whatsapp-events" 
              />
              <p className="text-xs text-muted-foreground">
                This URL will receive incoming message events from WhatsApp
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline">Test Connection</Button>
            <Button 
              onClick={handleSaveSettings} 
              disabled={isSaving}
              className="bg-vtu-primary hover:bg-vtu-primary/90"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="templates">
          <CardContent className="pt-6">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h4 className="font-medium text-amber-800">Message Templates</h4>
              <p className="text-sm text-amber-700 mt-1">
                Create and manage your WhatsApp message templates here. Templates need to be approved by WhatsApp before they can be used.
              </p>
              <Button variant="outline" className="mt-3 border-amber-300 bg-amber-100/40 hover:bg-amber-100">
                Create New Template
              </Button>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="analytics">
          <CardContent className="pt-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4">
              <h4 className="font-medium text-indigo-800">WhatsApp Analytics</h4>
              <p className="text-sm text-indigo-700 mt-1">
                Track and analyze your WhatsApp interactions to improve your response strategies and customer engagement.
              </p>
              <Button variant="outline" className="mt-3 border-indigo-300 bg-indigo-100/40 hover:bg-indigo-100">
                View Detailed Reports
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default WhatsAppIntegration;
