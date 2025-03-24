
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  type?: "link" | "switch";
  value?: boolean;
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  className?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  description,
  type = "link",
  value,
  onChange,
  onClick,
  className
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl",
        "flex items-center p-4",
        "transition-all duration-300",
        "hover:shadow-md hover:scale-[1.01]",
        type === "link" && "cursor-pointer",
        "animate-fade-in",
        className
      )}
      onClick={type === "link" ? onClick : undefined}
    >
      <div className={cn(
        "mr-4 w-10 h-10",
        "flex items-center justify-center",
        "rounded-full bg-muted/50"
      )}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-md font-medium">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      {type === "link" && (
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      )}
      
      {type === "switch" && (
        <Switch
          checked={value}
          onCheckedChange={onChange}
          className="ml-4 data-[state=checked]:bg-primary"
        />
      )}
    </div>
  );
};

export default SettingsItem;
