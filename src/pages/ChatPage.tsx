
import React from 'react';
import Chat from '@/components/whatsapp/Chat';

const ChatPage = () => {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">WhatsApp Chat</h2>
        <p className="text-muted-foreground">Manage and monitor WhatsApp conversations</p>
      </div>
      
      <div className="h-[calc(100%-5rem)]">
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
