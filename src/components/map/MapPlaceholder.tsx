
import React from "react";
import { Map } from "lucide-react";

const MapPlaceholder: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
      <div className="text-center">
        <Map className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">Interactive map would be displayed here</p>
      </div>
    </div>
  );
};

export default MapPlaceholder;
