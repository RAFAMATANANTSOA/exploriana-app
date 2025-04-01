
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
  const prevMessagesLengthRef = useRef(messages.length);
  
  // Only auto-scroll when messages change or typing status changes, not on initial render
  useEffect(() => {
    // Only scroll when new messages are added or typing status changes
    if (messages.length > prevMessagesLengthRef.current || 
        (prevMessagesLengthRef.current === messages.length && isTyping !== undefined)) {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    
    prevMessagesLengthRef.current = messages.length;
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Content container that takes full height minus input height */}
      <div className="flex flex-col h-full">
        {/* Guide Mode Start Tour Button */}
        <div className="p-4 pb-0 flex-shrink-0">
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
        
        {/* Chat Messages - scrollable area that fills remaining space */}
        <div className="flex-1 p-4 overflow-hidden min-h-0">
          <ScrollArea className="h-full rounded-md border">
            <div className="p-4">
              <ChatMessages 
                messages={messages}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
              />
            </div>
          </ScrollArea>
        </div>
        
        {/* Message Input - fixed at bottom */}
        <div className="p-4 pt-2 flex-shrink-0">
          <ChatInput
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default GuideMode;
