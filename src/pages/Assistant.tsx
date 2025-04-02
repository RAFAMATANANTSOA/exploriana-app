
import React, { useState, useRef, useEffect } from "react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Map, Navigation } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChatMessages, Message } from "@/components/assistant/ChatMessage";
import ChatInput from "@/components/assistant/ChatInput";

const Assistant: React.FC = () => {
  const [guideMessages, setGuideMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI travel assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [plannerMessages, setPlannerMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to the Travel Planner! Tell me where and when you want to travel, and I'll create a custom itinerary for you.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [activeMode, setActiveMode] = useState<"guide" | "planner">("guide");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMapButton, setShowMapButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Get appropriate messages based on active mode
  const messages = activeMode === "guide" ? guideMessages : plannerMessages;
  const setMessages = activeMode === "guide" ? setGuideMessages : setPlannerMessages;

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
      if (activeMode === "planner") {
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
    
    setGuideMessages(prev => [...prev, userMessage]);
    
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
      
      setGuideMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const viewOnMap = () => {
    navigate('/trip-planner');
  };

  return (
    <AnimatedPage>
      <div className={`page-container flex flex-col h-[calc(100vh-0px)] sm:h-[calc(100vh-96px)] ${isMobile ? 'pb-20' : ''}`}>
        {/* Header */}
        <div className="mb-4 sticky top-0 z-10 pt-2 pb-0 bg-background">
          <h1 className="text-2xl font-bold">Travel Assistant</h1>
          <p className="text-muted-foreground text-sm mb-4">Your personal travel companion</p>
          
          {/* Mode selector using ToggleGroup */}
          <ToggleGroup 
            type="single" 
            value={activeMode}
            onValueChange={(value) => {
              if (value) setActiveMode(value as "guide" | "planner");
            }}
            className="w-full mb-4 glass-card p-1 rounded-full"
          >
            <ToggleGroupItem 
              value="guide" 
              className="flex-1 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Guide Mode
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="planner" 
              className="flex-1 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Planner Mode
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Action Button (Start Tour or View Map) */}
        <Button 
          onClick={activeMode === "planner" ? viewOnMap : startTour}
          className="w-full mb-4"
          disabled={activeMode === "planner" && !showMapButton}
        >
          {activeMode === "planner" ? (
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
            <div className="p-4">
              <ChatMessages 
                messages={messages}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
              />
            </div>
          </ScrollArea>
        </div>
        
        {/* Input area */}
        <div className={`p-4 ${isMobile ? 'mb-16' : ''} ${isMobile ? 'fixed bottom-16 left-0 right-0 bg-background z-10' : ''}`}>
          <ChatInput
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Assistant;
