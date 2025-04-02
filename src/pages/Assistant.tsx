
import React, { useState, useRef, useEffect } from "react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/assistant/Header";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: "Hi there! How can I help you with your trip today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!isFirstLoad && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [messages, isFirstLoad]);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: uuidv4(),
        content: getAssistantResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Simple response generator (in a real app, this would be an API call)
  const getAssistantResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes("hello") || userInputLower.includes("hi")) {
      return "Hello! How can I assist with your travel plans today?";
    } else if (userInputLower.includes("weather")) {
      return "The weather looks great for your upcoming trip! Sunny skies with temperatures around 75°F (24°C).";
    } else if (userInputLower.includes("restaurant") || userInputLower.includes("food") || userInputLower.includes("eat")) {
      return "I can recommend several great restaurants nearby. What kind of cuisine are you interested in?";
    } else if (userInputLower.includes("hotel") || userInputLower.includes("stay") || userInputLower.includes("accommodation")) {
      return "There are several hotel options in the area. Would you prefer something luxurious or budget-friendly?";
    } else if (userInputLower.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm here to help with your travel needs. Feel free to ask about restaurants, hotels, activities, or anything else for your trip!";
    }
  };

  return (
    <AnimatedPage>
      <div className="page-container flex flex-col h-[calc(100vh-0px)] sm:h-[calc(100vh-96px)] pt-4 sm:pt-10">
        <Header title="Chat Assistant" subtitle="Your personal travel companion" />
        
        <div className="flex-1 flex flex-col min-h-0 mt-4">
          {/* Messages Container */}
          <ScrollArea className="flex-1 overflow-y-auto pr-1 mb-4">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="p-4 pt-2 flex-shrink-0 mb-2 sm:mb-0">
            <div className="glass-card rounded-full p-1 flex items-center w-full">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
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
        </div>
      </div>
    </AnimatedPage>
  );
};

// Message bubble component
interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`flex w-full mb-4 animate-fade-in ${message.isUser ? "justify-end" : "justify-start"}`}>
      {!message.isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-primary-foreground text-sm font-bold">A</span>
        </div>
      )}
      
      <div className={`max-w-[80%] rounded-2xl p-3 ${
        message.isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "glass-card rounded-tl-none"
      }`}>
        <p className="text-sm">{message.content}</p>
        <p className="text-[10px] opacity-70 mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {message.isUser && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ml-2 flex-shrink-0">
          <span className="text-muted-foreground text-sm font-bold">U</span>
        </div>
      )}
    </div>
  );
};

export default Assistant;
