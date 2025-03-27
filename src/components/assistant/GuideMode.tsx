
import React, { useRef, useEffect } from "react";
import { Message, ChatMessages } from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";
import { Mic, Navigation } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GuideModeProps {
  messages: Message[];
  isTyping: boolean;
  isRecording: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  startTour: () => void;
}

const GuideMode: React.FC<GuideModeProps> = ({
  messages,
  isTyping,
  isRecording,
  input,
  setInput,
  handleSendMessage,
  handleKeyPress,
  startTour
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full">
      {/* Tour Button and Chat Messages Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Guide Mode Start Tour Button */}
        <div className="mb-4">
          <Button 
            onClick={startTour} 
            disabled={isRecording}
            className="w-full glass-card"
          >
            {isRecording ? (
              <>
                <Mic className="h-4 w-4 mr-2 animate-pulse text-red-500" />
                <span>Listening...</span>
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4 mr-2" />
                <span>Start Tour</span>
              </>
            )}
          </Button>
        </div>
        
        {/* Chat Messages - scrollable area */}
        <div className="flex-1 overflow-hidden rounded-md border mb-4">
          <ScrollArea className="h-full">
            <div className="p-4 pb-6">
              <ChatMessages 
                messages={messages}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Message Input - fixed at bottom */}
      <div className="w-full">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default GuideMode;
