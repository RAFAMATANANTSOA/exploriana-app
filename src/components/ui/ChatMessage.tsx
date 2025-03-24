
import React from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  timestamp,
  isTyping = false,
  className
}) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start",
      className
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-2xl p-3",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "glass-card rounded-tl-none"
      )}>
        {isTyping ? (
          <div className="flex space-x-1 h-6 items-center px-2">
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        ) : (
          <>
            <p className="text-sm">{message}</p>
            <p className="text-[10px] opacity-70 mt-1 text-right">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ml-2 flex-shrink-0">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
