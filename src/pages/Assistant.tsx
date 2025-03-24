
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Camera, Image as ImageIcon } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import ChatMessage from "@/components/ui/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI travel assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Add AI response
      const responses = [
        "I'd recommend visiting the Golden Gate Bridge while you're in San Francisco. It's iconic!",
        "That's a great question! The best time to visit would be during spring or fall to avoid crowds.",
        "Based on your preferences, I think you'd enjoy exploring the local markets and historical sites.",
        "Let me translate that menu for you. It appears to be a traditional local dish made with fresh seafood.",
        "According to my data, this landmark was built in 1886 and has a fascinating history."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <AnimatedPage>
      <div className="page-container h-screen flex flex-col pb-20 sm:pb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground text-sm">Ask me anything about your travels</p>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {isTyping && (
              <ChatMessage
                message=""
                isUser={false}
                timestamp={new Date()}
                isTyping={true}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message Input */}
        <div className="glass-card rounded-full p-1 flex items-center">
          <div className="flex space-x-1 ml-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Camera className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask something about your trip..."
            className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
          />
          
          <Button 
            size="icon" 
            className="rounded-full h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Assistant;
