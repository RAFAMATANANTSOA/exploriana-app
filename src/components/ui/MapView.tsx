
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Map, MapPin, Route } from "lucide-react";

interface MapViewProps {
  className?: string;
}

interface Destination {
  id: string;
  name: string;
  location: string;
  position: { x: number; y: number };
}

const MapView: React.FC<MapViewProps> = ({ className }) => {
  const [destinations] = useState<Destination[]>([
    { id: "1", name: "Golden Gate Bridge", location: "San Francisco", position: { x: 20, y: 40 } },
    { id: "2", name: "Lombard Street", location: "San Francisco", position: { x: 40, y: 50 } },
    { id: "3", name: "Fisherman's Wharf", location: "San Francisco", position: { x: 50, y: 30 } },
  ]);

  return (
    <div className={cn(
      "glass-card rounded-xl overflow-hidden",
      "relative w-full h-[400px] sm:h-[500px]",
      "animate-fade-in",
      className
    )}>
      {/* Placeholder for a real map implementation */}
      <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
        <div className="text-center">
          <Map className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Interactive map would be displayed here</p>
        </div>
      </div>
      
      {/* Demo pins */}
      {destinations.map((dest) => (
        <div 
          key={dest.id}
          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 animate-float"
          style={{ 
            left: `${dest.position.x}%`, 
            top: `${dest.position.y}%`,
            animationDelay: `${parseInt(dest.id) * 0.2}s`
          }}
        >
          <div className="relative group">
            <MapPin className="w-6 h-6 text-primary" fill="rgba(var(--primary-rgb), 0.3)" />
            
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-popover shadow-lg rounded-lg p-2 text-xs">
                <p className="font-semibold">{dest.name}</p>
                <p className="text-muted-foreground">{dest.location}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Demo route line - in a real app you'd draw SVG paths between points */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path 
          d={`M ${destinations[0].position.x}% ${destinations[0].position.y}% 
              L ${destinations[1].position.x}% ${destinations[1].position.y}% 
              L ${destinations[2].position.x}% ${destinations[2].position.y}%`}
          stroke="hsla(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5 3"
          className="animate-pulse-slow"
        />
      </svg>
    </div>
  );
};

export default MapView;
