
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Map } from "lucide-react";
import { Message } from "@/components/assistant/ChatMessage";
import GuideMode from "@/components/assistant/GuideMode";
import PlannerMode from "@/components/assistant/PlannerMode";
import Header from "@/components/assistant/Header";

const Assistant: React.FC = () => {
  const navigate = useNavigate();
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
  const [isRecording, setIsRecording] = useState(false);
  const [showMapButton, setShowMapButton] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    // This will be handled in child components
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
        
        // Show map button after generating a plan
        setShowMapButton(true);
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
      
      // Show map button after generating a plan
      setShowMapButton(true);
    }, 1500);
  };

  const startTour = () => {
    setIsRecording(true);
    
    // Simulate microphone activation
    setTimeout(() => {
      setIsRecording(false);
      
      // Add user message (simulating voice input)
      const userMessage: Message = {
        id: Date.now().toString(),
        content: "Tell me about the local attractions here.",
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI typing response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "You're near the historic district! To your left is the famous Art Museum built in 1895, known for its Renaissance collection. Ahead about 200 meters is the Central Plaza with its iconic fountain and cafés. Would you like me to tell you more about any of these places?",
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }, 1500);
    }, 2000);
  };

  const viewOnMap = () => {
    navigate('/trip-planner');
  };

  return (
    <AnimatedPage>
      <div className="page-container flex flex-col h-[calc(100vh-72px)] sm:h-[calc(100vh-96px)]">
        <Header 
          title="AI Assistant" 
          subtitle="Your personal travel companion" 
        />
        
        <Tabs 
          value={activeMode} 
          onValueChange={(value) => {
            setActiveMode(value as "guide" | "planner");
            setShowMapButton(false);
          }}
          className="w-full flex-1 flex flex-col"
        >
          <TabsList className="glass-card w-full grid grid-cols-2 mb-4 sticky top-[72px] z-10">
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Guide Mode</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Planner Mode</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent 
            value="guide" 
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            <GuideMode
              messages={messages}
              isTyping={isTyping}
              isRecording={isRecording}
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
              startTour={startTour}
            />
          </TabsContent>
          
          <TabsContent 
            value="planner" 
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            <PlannerMode
              messages={messages}
              isTyping={isTyping}
              plannerPrompt={plannerPrompt}
              setPlannerPrompt={setPlannerPrompt}
              handleGeneratePlan={handleGeneratePlan}
              handleKeyPress={handleKeyPress}
              showMapButton={showMapButton}
              viewOnMap={viewOnMap}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
};

export default Assistant;
