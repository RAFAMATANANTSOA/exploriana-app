
import React from "react";
import MapView from "@/components/ui/MapView";
import TripMiniItinerary from "./TripMiniItinerary";

interface TripStop {
  id: string;
  name: string;
  location: string;
  duration: string;
}

interface MapViewTabProps {
  tripStops: TripStop[];
}

const MapViewTab: React.FC<MapViewTabProps> = ({ tripStops }) => {
  return (
    <>
      <MapView />
      <TripMiniItinerary tripStops={tripStops} />
    </>
  );
};

export default MapViewTab;
