
import React from "react";
import { Clock, Calendar } from "lucide-react";

interface TripStopProps {
  id: string;
  name: string;
  location: string;
  image: string;
  duration: string;
  description: string;
  index: number;
}

const TripStopItem: React.FC<TripStopProps> = ({
  id,
  name,
  location,
  image,
  duration,
  description,
  index
}) => {
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden flex flex-col sm:flex-row animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="sm:w-1/4 h-40 sm:h-auto relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm text-primary-foreground font-medium">
          {index + 1}
        </div>
      </div>
      
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{location}</p>
        <p className="text-sm mb-3">{description}</p>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center mr-4">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Day 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripStopItem;
