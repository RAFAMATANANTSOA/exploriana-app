
import React, { useState } from "react";
import { Sun, Moon, Bell, Globe, Lock, LogOut, User, HelpCircle, Settings, Shield, CreditCard, Bookmark, MapPin } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import SettingsItem from "@/components/ui/SettingsItem";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Profile: React.FC = () => {
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

  const savedTrips = [
    { id: 1, name: "Weekend in Paris", date: "May 15-18, 2023" },
    { id: 2, name: "Tokyo Adventure", date: "Oct 5-15, 2023" },
    { id: 3, name: "New York City", date: "Dec 22-27, 2023" }
  ];

  return (
    <AnimatedPage>
      <div className="page-container pb-20 sm:pb-6 pt-4">
        <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>
        
        {/* User Profile */}
        <div className="glass-card rounded-xl p-6 mb-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-3">
            <AvatarImage src="/placeholder.svg" alt="John Traveler" />
            <AvatarFallback className="bg-muted">
              <User className="w-10 h-10 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">John Traveler</h2>
          <p className="text-muted-foreground text-sm mb-4">john.traveler@example.com</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" className="glass-card">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-card"
              onClick={handleSaveProfile}
            >
              <Shield className="w-4 h-4 mr-2" />
              Premium
            </Button>
          </div>
        </div>
        
        {/* Tabs for different sections */}
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
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-3 mt-4">
            <h2 className="text-lg font-semibold mb-2">Preferences</h2>
            
            <SettingsItem
              icon={<Globe className="w-5 h-5 text-muted-foreground" />}
              title="Language"
              description="English (US)"
              type="link"
              onClick={() => toast.info('Language settings would open here')}
            />
            
            <SettingsItem
              icon={darkMode ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-muted-foreground" />}
              title="Dark Mode"
              description="Change application appearance"
              type="switch"
              value={darkMode}
              onChange={toggleDarkMode}
            />
            
            <SettingsItem
              icon={<Bell className="w-5 h-5 text-muted-foreground" />}
              title="Notifications"
              description="Receive travel alerts and updates"
              type="switch"
              value={notifications}
              onChange={setNotifications}
            />
            
            <SettingsItem
              icon={<CreditCard className="w-5 h-5 text-muted-foreground" />}
              title="Payment Methods"
              description="Manage your payment options"
              type="link"
              onClick={() => toast.info('Payment settings would open here')}
            />
            
            <h2 className="text-lg font-semibold mt-6 mb-2">Privacy & Support</h2>
            
            <SettingsItem
              icon={<Lock className="w-5 h-5 text-muted-foreground" />}
              title="Privacy Settings"
              description="Manage your data and permissions"
              type="link"
              onClick={() => toast.info('Privacy settings would open here')}
            />
            
            <SettingsItem
              icon={<HelpCircle className="w-5 h-5 text-muted-foreground" />}
              title="Help & Support"
              description="FAQs, contact support"
              type="link"
              onClick={() => toast.info('Help center would open here')}
            />
            
            <Button 
              variant="outline" 
              className="w-full mt-4 text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </TabsContent>
          
          {/* Saved Trips Tab */}
          <TabsContent value="saved" className="mt-4">
            <div className="space-y-4">
              {savedTrips.map(trip => (
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
              ))}
              
              {savedTrips.length === 0 && (
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
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
};

export default Profile;
