
import React, { useState } from "react";
import { Sun, Moon, Bell, Globe, Lock, LogOut, User, HelpCircle, Settings } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";
import SettingsItem from "@/components/ui/SettingsItem";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    
    // In a real app, this would toggle dark mode
    // For demonstration purposes, just show a toast
    toast.success(`${enabled ? 'Dark' : 'Light'} mode activated`);
  };

  return (
    <AnimatedPage>
      <div className="page-container pb-20 sm:pb-6">
        <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>
        
        {/* User Profile */}
        <div className="glass-card rounded-xl p-6 mb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">John Traveler</h2>
          <p className="text-muted-foreground text-sm mb-4">john.traveler@example.com</p>
          <Button variant="outline" size="sm" className="glass-card">
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        
        {/* Settings */}
        <div className="space-y-3">
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
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;
