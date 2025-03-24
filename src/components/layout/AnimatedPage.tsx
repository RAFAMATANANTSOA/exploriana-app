
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "min-h-screen overflow-hidden", 
        "transition-all duration-500 ease-out",
        "animate-fade-in",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedPage;
