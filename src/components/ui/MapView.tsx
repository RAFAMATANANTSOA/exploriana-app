
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import MapPin from "../map/MapPin";
import MapRoute from "../map/MapRoute";
import MapPlaceholder from "../map/MapPlaceholder";

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
      <MapPlaceholder />
      
      {/* Pins on the map */}
      {destinations.map((dest) => (
        <MapPin 
          key={dest.id}
          id={dest.id}
          name={dest.name}
          location={dest.location}
          position={dest.position}
        />
      ))}
      
      {/* Route line between points */}
      <MapRoute destinations={destinations} />
    </div>
  );
};

export default MapView;
