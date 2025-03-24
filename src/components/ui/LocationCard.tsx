
import React from "react";
import { cn } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";

interface LocationCardProps {
  image: string;
  name: string;
  location: string;
  rating: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  image,
  name,
  location,
  rating,
  className,
  style,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden",
        "h-[280px] relative group",
        "transform transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:shadow-xl",
        "cursor-pointer",
        "animate-fade-in",
        className
      )}
      style={style}
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="w-3 h-3 text-white/80" />
            <span className="text-white/80">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute top-3 right-3",
          "w-8 h-8 rounded-full",
          "flex items-center justify-center",
          "bg-white/20 backdrop-blur-sm",
          "group-hover:bg-white/30",
          "transition-all duration-300",
          "opacity-0 group-hover:opacity-100",
          "transform translate-y-2 group-hover:translate-y-0"
        )}
      >
        <Star 
          className="w-4 h-4 text-white" 
          fill="none"
        />
      </div>
    </div>
  );
};

export default LocationCard;
