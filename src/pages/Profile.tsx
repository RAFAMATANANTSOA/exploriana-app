
import React, { useState } from "react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import { Bookmark, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import ProfileHeader from "@/components/profile/ProfileHeader";
import SettingsTab from "@/components/profile/SettingsTab";
import SavedTripsTab from "@/components/profile/SavedTripsTab";
import { useProfileSettings } from "@/hooks/useProfileSettings";

const Profile: React.FC = () => {
  const { 
    darkMode, 
    notifications, 
    activeTab, 
    setActiveTab, 
    toggleDarkMode, 
    setNotifications, 
    handleSaveProfile, 
    handleLogout,
    savedTrips
  } = useProfileSettings();

  return (
    <AnimatedPage>
      <div className="page-container pb-20 sm:pb-6 pt-4">
        <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>
        
        <ProfileHeader 
          name="John Traveler"
          email="john.traveler@example.com"
          onSaveProfile={handleSaveProfile}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved Trips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <SettingsTab 
              darkMode={darkMode}
              setDarkMode={toggleDarkMode}
              notifications={notifications}
              setNotifications={setNotifications}
              onLogout={handleLogout}
            />
          </TabsContent>
          
          <TabsContent value="saved">
            <SavedTripsTab trips={savedTrips} />
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
};

export default Profile;
