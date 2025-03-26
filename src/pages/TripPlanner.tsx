
import React, { useState } from "react";
import { Map, List } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TripHeader from "@/components/trip/TripHeader";
import MapViewTab from "@/components/trip/MapView";
import ListViewTab from "@/components/trip/ListView";

interface TripStop {
  id: string;
  name: string;
  location: string;
  image: string;
  duration: string;
  description: string;
}

const TripPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [tripStops] = useState<TripStop[]>([
    {
      id: "1",
      name: "Golden Gate Bridge",
      location: "San Francisco",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
      duration: "1 hour",
      description: "Iconic suspension bridge spanning the Golden Gate strait."
    },
    {
      id: "2",
      name: "Lombard Street",
      location: "San Francisco",
      image: "https://images.unsplash.com/photo-1555488205-d5e67846cf40",
      duration: "45 minutes",
      description: "Famous for its steep, one-block section with eight tight hairpin turns."
    },
    {
      id: "3",
      name: "Fisherman's Wharf",
      location: "San Francisco",
      image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da",
      duration: "2 hours",
      description: "Popular tourist attraction featuring seafood restaurants and shops."
    }
  ]);

  return (
    <AnimatedPage>
      <div className="page-container pb-20 sm:pb-6">
        <TripHeader />
        
        <Tabs defaultValue="map" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="glass-card mb-4">
            <TabsTrigger value="map" className="flex items-center gap-1">
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <List className="w-4 h-4" />
              <span>List View</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="animate-fade-in">
            <MapViewTab tripStops={tripStops} />
          </TabsContent>
          
          <TabsContent value="list" className="animate-fade-in">
            <ListViewTab tripStops={tripStops} />
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
};

export default TripPlanner;
