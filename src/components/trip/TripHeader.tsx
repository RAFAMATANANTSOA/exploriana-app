
import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const TripHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">Trip Planner</h1>
        <p className="text-muted-foreground text-sm">Plan your perfect itinerary</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1 glass-card"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          className="gap-1"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Stop</span>
        </Button>
      </div>
    </div>
  );
};

export default TripHeader;
