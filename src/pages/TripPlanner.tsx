
import React, { useState } from "react";
import { Map, List, Plus, Calendar, Clock, Download } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import MapView from "@/components/ui/MapView";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TripStop {
  id: string;
  name: string;
  location: string;
  image: string;
  duration: string;
  description: string;
}

const tripStops: TripStop[] = [
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
];

const TripPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <AnimatedPage>
      <div className="page-container pb-20 sm:pb-6">
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
            <MapView />
            
            {/* Mini itinerary */}
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
          </TabsContent>
          
          <TabsContent value="list" className="animate-fade-in">
            <div className="space-y-4">
              {tripStops.map((stop, index) => (
                <div 
                  key={stop.id} 
                  className="glass-card rounded-xl overflow-hidden flex flex-col sm:flex-row animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="sm:w-1/4 h-40 sm:h-auto relative">
                    <img 
                      src={stop.image} 
                      alt={stop.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm text-primary-foreground font-medium">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-semibold">{stop.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{stop.location}</p>
                    <p className="text-sm mb-3">{stop.description}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center mr-4">
                        <Clock className="w-4 h-4 mr-1" />
                        {stop.duration}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Day 1</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-4 glass-card">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Stop
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
};

export default TripPlanner;
