
import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const LocationSelector = () => {
  const { user, updateUser } = useAuth();
  const [customLocation, setCustomLocation] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const predefinedLocations = [
    "New York, NY",
    "Los Angeles, CA", 
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
  ];

  const handleLocationSelect = (location: string) => {
    updateUser({ location });
    setShowCustomInput(false);
  };

  const handleCustomLocation = () => {
    if (customLocation.trim()) {
      updateUser({ location: customLocation });
      setCustomLocation("");
      setShowCustomInput(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-primary/20 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <div className="hidden md:block text-left">
            <div className="text-xs">Deliver to</div>
            <div className="text-sm font-medium">
              {user?.location || "Select location"}
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 bg-card border-border">
        {predefinedLocations.map((location) => (
          <DropdownMenuItem
            key={location}
            onClick={() => handleLocationSelect(location)}
            className="text-foreground hover:bg-accent"
          >
            <MapPin className="h-4 w-4 mr-2" />
            {location}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuItem
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="text-foreground hover:bg-accent"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Enter custom location
        </DropdownMenuItem>
        
        {showCustomInput && (
          <div className="p-2 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your location"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="flex-1 bg-input border-border text-foreground"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomLocation()}
              />
              <Button
                size="sm"
                onClick={handleCustomLocation}
                className="bg-primary hover:bg-primary/90"
              >
                Set
              </Button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationSelector;
