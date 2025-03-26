
import React from "react";
import { Clock } from "lucide-react";

interface TripStop {
  id: string;
  name: string;
  location: string;
  duration: string;
}

interface TripMiniItineraryProps {
  tripStops: TripStop[];
}

const TripMiniItinerary: React.FC<TripMiniItineraryProps> = ({ tripStops }) => {
  return (
    <div className="mt-4 glass-card rounded-xl p-4">
      <h3 className="text-md font-semibold mb-3">Your Itinerary</h3>
      <div className="space-y-2">
        {tripStops.map((stop, index) => (
          <div key={stop.id} className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
              {index + 1}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{stop.name}</p>
              <p className="text-xs text-muted-foreground">{stop.location}</p>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {stop.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripMiniItinerary;
