
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Map, Image, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const TabNav: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const tabs = [
    { name: "Home", path: "/", icon: Home },
    { name: "Assistant", path: "/assistant", icon: MessageSquare },
    { name: "Map", path: "/trip-planner", icon: Map },
    { name: "Gallery", path: "/gallery", icon: Image },
    { name: "Profile", path: "/profile", icon: User }
  ];

  return (
    <nav 
      className={cn(
        "fixed z-50",
        "bg-white/80 dark:bg-black/30 backdrop-blur-lg",
        "border-t sm:border-b border-border/50",
        "transition-all duration-300 ease-in-out",
        isMobile 
          ? "bottom-0 left-0 right-0" 
          : "top-0 left-0 right-0"
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col sm:flex-row items-center sm:gap-2",
                  "py-3 px-3 sm:px-4 flex-1 sm:flex-none", // Increased px for mobile
                  "text-xs sm:text-sm font-medium",
                  "transition-all duration-300 ease-in-out",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <div
                  className={cn(
                    "relative mb-1 sm:mb-0",
                    "transition-all duration-300",
                    isActive && !isMobile && "after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 sm:w-4 sm:h-4",
                    "transition-all duration-300",
                    isActive && "animate-scale-in"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] sm:text-xs", // Smaller text on mobile
                  isActive && "animate-scale-in"
                )}>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabNav;
