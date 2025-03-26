
import React from "react";

interface Destination {
  id: string;
  position: { x: number; y: number };
}

interface MapRouteProps {
  destinations: Destination[];
}

const MapRoute: React.FC<MapRouteProps> = ({ destinations }) => {
  // Create path for the route
  const pathData = destinations.map((dest, index) => {
    return `${index === 0 ? 'M' : 'L'} ${dest.position.x}% ${dest.position.y}%`;
  }).join(' ');

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <path 
        d={pathData}
        stroke="hsla(var(--primary))"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 3"
        className="animate-pulse-slow"
      />
    </svg>
  );
};

export default MapRoute;
