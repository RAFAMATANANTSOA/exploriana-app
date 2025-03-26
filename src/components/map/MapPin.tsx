
import React from "react";
import { MapPin as MapPinIcon } from "lucide-react";

interface MapPinProps {
  id: string;
  name: string;
  location: string;
  position: { x: number; y: number };
}

const MapPin: React.FC<MapPinProps> = ({ id, name, location, position }) => {
  return (
    <div 
      className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 animate-float"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        animationDelay: `${parseInt(id) * 0.2}s`
      }}
    >
      <div className="relative group">
        <MapPinIcon className="w-6 h-6 text-primary" fill="rgba(var(--primary-rgb), 0.3)" />
        
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-popover shadow-lg rounded-lg p-2 text-xs">
            <p className="font-semibold">{name}</p>
            <p className="text-muted-foreground">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPin;
