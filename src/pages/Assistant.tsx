
import React, { useState } from "react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import Header from "@/components/assistant/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuideMode from "@/components/assistant/GuideMode";
import PlannerMode from "@/components/assistant/PlannerMode";
import { useAssistantMessages } from "@/hooks/useAssistantMessages";
import { useIsMobile } from "@/hooks/use-mobile";

const Assistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"guide" | "planner">("guide");
  const isMobile = useIsMobile();
  
  const {
    messages,
    input,
    setInput,
    isTyping,
    isRecording,
    showMapButton,
    plannerPrompt,
    setPlannerPrompt,
    handleSendMessage,
    handleKeyPress,
    handleGeneratePlan,
    startTour,
    viewOnMap,
    activeMode,
    setActiveMode
  } = useAssistantMessages();

  // Update the active mode when tab changes
  const handleTabChange = (value: string) => {
    if (value === "guide" || value === "planner") {
      setActiveTab(value as "guide" | "planner");
      setActiveMode(value as "guide" | "planner");
      
      // Scroll to top when switching tabs
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatedPage>
      <div className={`page-container flex flex-col h-[calc(100vh-0px)] sm:h-[calc(100vh-96px)] ${isMobile ? 'pb-20' : ''}`}>
        <Header title="Travel Assistant" subtitle="Your personal travel companion" />
        
        <Tabs 
          defaultValue="guide" 
          className="w-full mt-4"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <div className="flex justify-center mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="guide">Guide Mode</TabsTrigger>
              <TabsTrigger value="planner">Planner Mode</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="guide" className="h-[calc(100%-72px)]">
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
          
          <TabsContent value="planner" className="h-[calc(100%-72px)]">
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
