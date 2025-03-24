
import React from "react";
import { ArrowRight } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import WeatherDisplay from "@/components/ui/WeatherDisplay";
import SearchBar from "@/components/ui/SearchBar";
import LocationCard from "@/components/ui/LocationCard";
import { Button } from "@/components/ui/button";

const trendingDestinations = [
  {
    id: "1",
    name: "Golden Gate Bridge",
    location: "San Francisco, USA",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    rating: 4.8
  },
  {
    id: "2",
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    rating: 4.9
  },
  {
    id: "3",
    name: "Santorini Island",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    rating: 4.7
  },
  {
    id: "4",
    name: "Kyoto Temples",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4",
    rating: 4.6
  }
];

const recommendations = [
  {
    id: "5",
    name: "Maldives Beach Resort",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    rating: 4.9
  },
  {
    id: "6",
    name: "Swiss Alps",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1531410050281-59e31dd04ab3",
    rating: 4.8
  }
];

const Index: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="page-container pb-20 sm:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Explore<span className="text-primary">.</span>
          </h1>
          <p className="text-muted-foreground mt-1">Discover amazing destinations</p>
        </div>
        
        {/* Search */}
        <SearchBar className="mb-6" />
        
        {/* Weather Widget */}
        <WeatherDisplay className="mb-6" />
        
        {/* Trending Destinations */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Trending Destinations</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingDestinations.map((destination, index) => (
              <LocationCard
                key={destination.id}
                image={destination.image}
                name={destination.name}
                location={destination.location}
                rating={destination.rating}
                className="animation-delay-[calc(100ms*var(--index))]"
                style={{ '--index': index } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
        
        {/* Recommendations */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((recommendation, index) => (
              <LocationCard
                key={recommendation.id}
                image={recommendation.image}
                name={recommendation.name}
                location={recommendation.location}
                rating={recommendation.rating}
                className="animation-delay-[calc(100ms*var(--index))]"
                style={{ '--index': index } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Index;
