
import React from "react";
import { Bell, CreditCard, Globe, HelpCircle, Lock, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsItem from "@/components/ui/SettingsItem";
import { toast } from "sonner";

interface SettingsTabProps {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
  onLogout: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  darkMode,
  setDarkMode,
  notifications,
  setNotifications,
  onLogout
}) => {
  return (
    <div className="space-y-3 mt-4">
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
        onChange={setDarkMode}
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
        onClick={onLogout}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  );
};

export default SettingsTab;
