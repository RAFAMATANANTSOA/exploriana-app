
import React from "react";
import { Camera, ImageIcon, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  handleKeyPress
}) => {
  return (
    <div className="glass-card rounded-full p-1 flex items-center sticky bottom-0 z-10">
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
  );
};

export default ChatInput;
