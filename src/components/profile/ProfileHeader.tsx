
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, Shield, User } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  onSaveProfile: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, onSaveProfile }) => {
  return (
    <div className="glass-card rounded-xl p-6 mb-6 text-center">
      <Avatar className="w-20 h-20 mx-auto mb-3">
        <AvatarImage src="/placeholder.svg" alt={name} />
        <AvatarFallback className="bg-muted">
          <User className="w-10 h-10 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-muted-foreground text-sm mb-4">{email}</p>
      <div className="flex gap-2 justify-center">
        <Button variant="outline" size="sm" className="glass-card">
          <Settings className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="glass-card"
          onClick={onSaveProfile}
        >
          <Shield className="w-4 h-4 mr-2" />
          Premium
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
