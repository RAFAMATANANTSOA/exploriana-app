
import React from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  messagesEndRef
}) => {
  return (
    <div className="space-y-4">
      {messages.map(message => (
        <ChatMessageItem
          key={message.id}
          message={message.content}
          isUser={message.isUser}
          timestamp={message.timestamp}
        />
      ))}
      
      {isTyping && (
        <ChatMessageItem
          message=""
          isUser={false}
          timestamp={new Date()}
          isTyping={true}
        />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

interface ChatMessageItemProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  isUser,
  timestamp,
  isTyping = false
}) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
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
            <p className="text-sm whitespace-pre-line">{message}</p>
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
