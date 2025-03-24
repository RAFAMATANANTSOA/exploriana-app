
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sun, CloudRain, CloudSun, CloudLightning, Compass, Thermometer } from "lucide-react";

interface WeatherDisplayProps {
  className?: string;
}

type WeatherType = "sunny" | "cloudy" | "rain" | "storm";

interface WeatherData {
  temperature: number;
  weatherType: WeatherType;
  location: string;
  description: string;
  loading: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ className }) => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    weatherType: "sunny",
    location: "",
    description: "",
    loading: true
  });

  // Simulate fetching weather data
  useEffect(() => {
    const timer = setTimeout(() => {
      const weatherTypes: WeatherType[] = ["sunny", "cloudy", "rain", "storm"];
      const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      
      setWeather({
        temperature: Math.floor(Math.random() * 15) + 15, // 15-30 degrees
        weatherType: randomWeather,
        location: "San Francisco, CA",
        description: getWeatherDescription(randomWeather),
        loading: false
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getWeatherDescription = (type: WeatherType): string => {
    switch (type) {
      case "sunny": return "Clear skies";
      case "cloudy": return "Partially cloudy";
      case "rain": return "Light rain";
      case "storm": return "Thunderstorms";
      default: return "";
    }
  };

  const getWeatherIcon = () => {
    switch (weather.weatherType) {
      case "sunny": return <Sun className="w-8 h-8 animate-pulse-slow text-amber-400" />;
      case "cloudy": return <CloudSun className="w-8 h-8 animate-pulse-slow text-blue-400" />;
      case "rain": return <CloudRain className="w-8 h-8 animate-pulse-slow text-blue-500" />;
      case "storm": return <CloudLightning className="w-8 h-8 animate-pulse-slow text-purple-500" />;
      default: return <Sun className="w-8 h-8" />;
    }
  };

  if (weather.loading) {
    return (
      <div className={cn(
        "glass-card rounded-xl overflow-hidden",
        "h-32 w-full",
        "loading-skeleton",
        className
      )}>
        <div className="animate-pulse p-4 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="h-6 bg-muted/50 rounded w-1/3"></div>
            <div className="h-8 w-8 bg-muted/50 rounded-full"></div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <div className="h-10 bg-muted/50 rounded w-1/4"></div>
            <div className="h-4 bg-muted/50 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden",
        "transition-all duration-500 ease-out",
        "animate-fade-in",
        className
      )}
    >
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{weather.location}</span>
          </div>
          {getWeatherIcon()}
        </div>
        
        <div className="flex items-end justify-between mt-4">
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold">{weather.temperature}°</span>
            <Thermometer className="w-4 h-4 text-muted-foreground mb-1" />
          </div>
          <span className="text-sm text-muted-foreground">{weather.description}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
