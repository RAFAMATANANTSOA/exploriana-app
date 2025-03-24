
import React from "react";
import { cn } from "@/lib/utils";
import { MapPin, Calendar } from "lucide-react";

interface MemoryCardProps {
  image: string;
  date: Date;
  location: string;
  note?: string;
  className?: string;
  onClick?: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  image,
  date,
  location,
  note,
  className,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden",
        "transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.01]",
        "cursor-pointer group",
        "animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-[220px]">
        <img 
          src={image} 
          alt={location} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="w-3 h-3" />
              <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
      
      {note && (
        <div className="p-3">
          <p className="text-sm text-foreground line-clamp-2">{note}</p>
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
