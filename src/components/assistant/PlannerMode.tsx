
import React, { useRef } from "react";
import { Map } from "lucide-react";
import { Message, ChatMessages } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlannerModeProps {
  messages: Message[];
  isTyping: boolean;
  plannerPrompt: string;
  setPlannerPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleGeneratePlan: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  showMapButton: boolean;
  viewOnMap: () => void;
}

const PlannerMode: React.FC<PlannerModeProps> = ({
  messages,
  isTyping,
  plannerPrompt,
  setPlannerPrompt,
  handleGeneratePlan,
  handleKeyPress,
  showMapButton,
  viewOnMap
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full">
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
      
      {/* Chat Messages */}
      <ChatMessages 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />
      
      {/* View on Map button */}
      {showMapButton && (
        <div className="mt-auto mb-4 sticky bottom-0 z-10">
          <Button 
            onClick={viewOnMap}
            className="w-full"
            variant="default"
          >
            <Map className="h-4 w-4 mr-2" />
            <span>View on Map</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlannerMode;
