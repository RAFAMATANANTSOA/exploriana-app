
import React from "react";
import { Bookmark, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Trip {
  id: number;
  name: string;
  date: string;
}

interface SavedTripsTabProps {
  trips: Trip[];
}

const SavedTripsTab: React.FC<SavedTripsTabProps> = ({ trips }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4 mt-4">
      {trips.length > 0 ? (
        trips.map(trip => (
          <div key={trip.id} className="glass-card p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{trip.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{trip.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info(`Viewing ${trip.name} itinerary`)}
                >
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/trip-planner')}
                >
                  Map
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-medium">No saved trips yet</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Your saved itineraries will appear here
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/assistant')}
          >
            Plan a Trip
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedTripsTab;
