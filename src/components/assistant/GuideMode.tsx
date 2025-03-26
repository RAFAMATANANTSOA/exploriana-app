
import React, { useRef } from "react";
import { Message, ChatMessages } from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";
import { Mic, Navigation } from "lucide-react";

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

  return (
    <div className="flex flex-col h-full">
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
      
      {/* Chat Messages */}
      <ChatMessages 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />
      
      {/* Message Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default GuideMode;
