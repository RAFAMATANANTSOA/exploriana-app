
import React from "react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Map } from "lucide-react";
import GuideMode from "@/components/assistant/GuideMode";
import PlannerMode from "@/components/assistant/PlannerMode";
import Header from "@/components/assistant/Header";
import { useAssistantMessages } from "@/hooks/useAssistantMessages";

const Assistant: React.FC = () => {
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
          }}
          className="w-full flex-1 flex flex-col"
        >
          <TabsList className="glass-card w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Guide Mode</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Planner Mode</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 flex flex-col">
            <TabsContent 
              value="guide" 
              className="flex-1 h-full"
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
              className="flex-1 h-full"
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
          </div>
        </Tabs>
      </div>
    </AnimatedPage>
  );
};

export default Assistant;
