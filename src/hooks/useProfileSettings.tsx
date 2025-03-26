
import { useState } from "react";
import { toast } from "sonner";

interface SavedTrip {
  id: number;
  name: string;
  date: string;
}

export const useProfileSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState("settings");
  
  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    // In a real app, this would toggle dark mode
    toast.success(`${enabled ? 'Dark' : 'Light'} mode activated`);
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleLogout = () => {
    toast.info("You have been logged out", {
      description: "In a real app, this would log you out"
    });
  };

  const savedTrips: SavedTrip[] = [
    { id: 1, name: "Weekend in Paris", date: "May 15-18, 2023" },
    { id: 2, name: "Tokyo Adventure", date: "Oct 5-15, 2023" },
    { id: 3, name: "New York City", date: "Dec 22-27, 2023" }
  ];

  return {
    darkMode,
    notifications,
    activeTab,
    setActiveTab,
    toggleDarkMode,
    setNotifications,
    handleSaveProfile,
    handleLogout,
    savedTrips
  };
};
