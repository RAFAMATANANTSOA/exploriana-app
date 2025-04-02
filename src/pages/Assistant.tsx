
import React, { useState, useRef, useEffect } from "react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Map, Navigation } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Define message type
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
  const [isPlannerMode, setIsPlannerMode] = useState(false);
  const [showMapButton, setShowMapButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      
      // Add AI response based on the mode
      if (isPlannerMode) {
        const planResponses = [
          "Here's your 3-day itinerary for San Francisco:\n\nDay 1: Golden Gate Bridge, Fisherman's Wharf, and Pier 39\nDay 2: Alcatraz Island, Chinatown, and Union Square\nDay 3: Golden Gate Park, Twin Peaks, and Mission District",
          "I've created a 5-day Paris plan:\n\nDay 1: Eiffel Tower and Seine River Cruise\nDay 2: Louvre Museum and Tuileries Garden\nDay 3: Notre Dame and Latin Quarter\nDay 4: Montmartre and Sacré-Cœur\nDay 5: Versailles Day Trip"
        ];
        const response = planResponses[Math.floor(Math.random() * planResponses.length)];
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setShowMapButton(true);
      } else {
        // Guide mode responses
        const guideResponses = [
          "I'd recommend visiting the Golden Gate Bridge while you're in San Francisco. It's iconic!",
          "That's a great question! The best time to visit would be during spring or fall to avoid crowds.",
          "Based on your preferences, I think you'd enjoy exploring the local markets and historical sites."
        ];
        const response = guideResponses[Math.floor(Math.random() * guideResponses.length)];
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const startTour = () => {
    // Simulate starting a tour
    const userMessage: Message = {
      id: Date.now().toString(),
      content: "Starting tour mode. What can you tell me about this area?",
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "You're near the historic district! To your left is the famous Art Museum built in 1895, known for its Renaissance collection. Ahead about 200 meters is the Central Plaza with its iconic fountain and cafés.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const viewOnMap = () => {
    navigate('/trip-planner');
  };

  return (
    <AnimatedPage>
      <div className={`page-container flex flex-col h-[calc(100vh-0px)] sm:h-[calc(100vh-96px)] ${isMobile ? 'pb-20' : ''}`}>
        {/* Header */}
        <div className="mb-2 sticky top-0 z-10 pt-2 pb-0 bg-background">
          <h1 className="text-2xl font-bold">Travel Assistant</h1>
          <p className="text-muted-foreground text-sm">Your personal travel companion</p>
        </div>
        
        {/* Mode selector */}
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="mode" 
            checked={isPlannerMode}
            onCheckedChange={(checked) => {
              setIsPlannerMode(checked === true);
              setMessages([{
                id: "1",
                content: isPlannerMode ? 
                  "Hello! I'm your AI travel assistant. How can I help you today?" : 
                  "Welcome to the Travel Planner! Tell me where and when you want to travel, and I'll create a custom itinerary for you.",
                isUser: false,
                timestamp: new Date()
              }]);
              setShowMapButton(false);
            }}
          />
          <label
            htmlFor="mode"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {isPlannerMode ? "Planner Mode" : "Guide Mode"}
          </label>
        </div>
        
        {/* Action Button (Start Tour or View Map) */}
        <Button 
          onClick={isPlannerMode ? viewOnMap : startTour}
          className="w-full mb-4"
          disabled={isPlannerMode && !showMapButton}
        >
          {isPlannerMode ? (
            <>
              <Map className="h-4 w-4 mr-2" />
              <span>View on Map</span>
            </>
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              <span>Start Tour</span>
            </>
          )}
        </Button>
        
        {/* Chat container */}
        <div className="flex-1 min-h-0 overflow-hidden rounded-md border">
          <ScrollArea className="h-full pb-4">
            <div className="p-4 space-y-4">
              {/* Messages */}
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "glass-card rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-[10px] opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-card rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex space-x-1 h-6 items-center px-2">
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>
        
        {/* Input area */}
        <div className={`p-4 ${isMobile ? 'mb-16' : ''}`}>
          <div className="glass-card rounded-full p-1 flex items-center w-full">
            <Input
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Assistant;
