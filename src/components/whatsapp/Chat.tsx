
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Predefined responses for simulation
const botResponses = [
  "Hello! Welcome to VTU Connect. How can I assist you today?",
  "You can purchase airtime, data, pay bills, and more through our service.",
  "What service would you like to use today? We offer airtime, data, cable TV, and electricity bill payments.",
  "Great! To purchase airtime, please provide your phone number and the amount.",
  "Perfect! I'll process your ₦1000 airtime purchase for 08012345678. Please confirm.",
  "Your transaction has been processed successfully! Reference: VTU-12345.",
  "Is there anything else you would like help with today?",
  "Thank you for using VTU Connect! Have a great day."
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to VTU Connect. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [responseIndex, setResponseIndex] = useState(1);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[responseIndex % botResponses.length],
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setResponseIndex(prev => prev + 1);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-md border">
      {/* Chat header */}
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder.svg" alt="Bot" />
          <AvatarFallback className="bg-whatsapp-green text-white">
            VTU
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">VTU Connect Assistant</h3>
          <p className="text-xs text-muted-foreground">Online | Powered by AI</p>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={cn(
              "flex",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === 'bot' && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src="/placeholder.svg" alt="Bot" />
                <AvatarFallback className="bg-whatsapp-green text-white text-xs">VTU</AvatarFallback>
              </Avatar>
            )}
            
            <div 
              className={cn(
                "chat-bubble",
                message.sender === 'user' 
                  ? "chat-bubble-user" 
                  : "chat-bubble-bot"
              )}
            >
              {message.text}
              <div className={cn(
                "text-xs mt-1",
                message.sender === 'user' ? "text-right text-gray-500" : "text-gray-500"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            {message.sender === 'user' && (
              <Avatar className="h-8 w-8 ml-2 mt-1">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Bot" />
              <AvatarFallback className="bg-whatsapp-green text-white text-xs">VTU</AvatarFallback>
            </Avatar>
            <div className="chat-bubble chat-bubble-bot flex gap-1 items-center py-3 px-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />
          
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Smile className="h-5 w-5" />
          </Button>
          
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            className="bg-whatsapp-green hover:bg-whatsapp-dark text-white rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
