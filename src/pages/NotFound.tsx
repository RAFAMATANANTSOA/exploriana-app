
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MapPin } from "lucide-react";
import AnimatedPage from "@/components/layout/AnimatedPage";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="page-container min-h-screen flex flex-col items-center justify-center text-center p-4">
        <MapPin className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex gap-4">
          <Button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default NotFound;
