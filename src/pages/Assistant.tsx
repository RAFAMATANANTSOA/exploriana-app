
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Camera, Image as ImageIcon, MessageSquare, Map } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import ChatMessage from "@/components/ui/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Assistant: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"guide" | "planner">("guide");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI travel assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [plannerPrompt, setPlannerPrompt] = useState("");
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
      let response = "";
      
      if (activeMode === "guide") {
        const responses = [
          "I'd recommend visiting the Golden Gate Bridge while you're in San Francisco. It's iconic!",
          "That's a great question! The best time to visit would be during spring or fall to avoid crowds.",
          "Based on your preferences, I think you'd enjoy exploring the local markets and historical sites.",
          "Let me translate that menu for you. It appears to be a traditional local dish made with fresh seafood.",
          "According to my data, this landmark was built in 1886 and has a fascinating history."
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      } else {
        const planResponses = [
          "I've created a 3-day itinerary for San Francisco including the Golden Gate Bridge, Alcatraz, and Fisherman's Wharf.",
          "Here's a 5-day plan for your Paris trip with visits to the Eiffel Tower, Louvre, and Notre Dame Cathedral.",
          "For your weekend in New York, I suggest visiting Central Park, Times Square, and the Metropolitan Museum of Art.",
          "I've planned a cultural tour of Tokyo including Senso-ji Temple, Meiji Shrine, and the Imperial Palace.",
          "Your beach vacation in Hawaii could include visits to Waikiki Beach, Diamond Head, and Pearl Harbor."
        ];
        response = planResponses[Math.floor(Math.random() * planResponses.length)];
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (activeMode === "guide") {
        handleSendMessage();
      } else if (plannerPrompt.trim()) {
        handleGeneratePlan();
      }
    }
  };

  const handleGeneratePlan = () => {
    if (!plannerPrompt.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `Please create a travel plan for: ${plannerPrompt}`,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setPlannerPrompt("");
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const planResponses = [
        "Here's your 3-day itinerary for San Francisco:\n\nDay 1: Golden Gate Bridge, Fisherman's Wharf, and Pier 39\nDay 2: Alcatraz Island, Chinatown, and Union Square\nDay 3: Golden Gate Park, Twin Peaks, and Mission District",
        "I've created a 5-day Paris plan:\n\nDay 1: Eiffel Tower and Seine River Cruise\nDay 2: Louvre Museum and Tuileries Garden\nDay 3: Notre Dame and Latin Quarter\nDay 4: Montmartre and Sacré-Cœur\nDay 5: Versailles Day Trip",
        "Your weekend in New York:\n\nDay 1: Central Park, Metropolitan Museum of Art, and Times Square\nDay 2: Statue of Liberty, 9/11 Memorial, and Brooklyn Bridge",
        "Your 4-day Tokyo itinerary:\n\nDay 1: Senso-ji Temple and Nakamise Shopping Street\nDay 2: Meiji Shrine and Shibuya Crossing\nDay 3: Imperial Palace and Tokyo Tower\nDay 4: Tsukiji Fish Market and Ginza Shopping",
        "Hawaii beach vacation plan:\n\nDay 1: Waikiki Beach and Diamond Head\nDay 2: Pearl Harbor and USS Arizona Memorial\nDay 3: North Shore beaches and Polynesian Cultural Center\nDay 4: Snorkeling at Hanauma Bay and hiking at Manoa Falls"
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: planResponses[Math.floor(Math.random() * planResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="page-container h-screen flex flex-col pb-20 sm:pb-16">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground text-sm">Your personal travel companion</p>
        </div>
        
        <Tabs 
          value={activeMode} 
          onValueChange={(value) => setActiveMode(value as "guide" | "planner")}
          className="w-full mb-4"
        >
          <TabsList className="glass-card w-full grid grid-cols-2">
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Guide Mode</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Planner Mode</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="guide" className="flex-1 flex flex-col">
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
          </TabsContent>
          
          <TabsContent value="planner" className="flex-1 flex flex-col">
            <div className="glass-card p-4 mb-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Trip Planner</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Tell me where and when you want to travel, and I'll create a custom itinerary for you.
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={plannerPrompt}
                  onChange={(e) => setPlannerPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="E.g., 3 days in San Francisco in October"
                  className="flex-1"
                />
                <Button 
                  onClick={handleGeneratePlan}
                  disabled={!plannerPrompt.trim()}
                >
                  Generate Plan
                </Button>
              </div>
            </div>
            
            {/* Chat Messages (shared with Guide mode) */}
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
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
};

export default Assistant;
