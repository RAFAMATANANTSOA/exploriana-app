
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TripStopItem from "./TripStopItem";

interface TripStop {
  id: string;
  name: string;
  location: string;
  image: string;
  duration: string;
  description: string;
}

interface ListViewTabProps {
  tripStops: TripStop[];
}

const ListViewTab: React.FC<ListViewTabProps> = ({ tripStops }) => {
  return (
    <>
      <div className="space-y-4">
        {tripStops.map((stop, index) => (
          <TripStopItem 
            key={stop.id}
            id={stop.id}
            name={stop.name}
            location={stop.location}
            image={stop.image}
            duration={stop.duration}
            description={stop.description}
            index={index}
          />
        ))}
      </div>
      
      <Button className="w-full mt-4 glass-card">
        <Plus className="w-4 h-4 mr-2" />
        Add Another Stop
      </Button>
    </>
  );
};

export default ListViewTab;
