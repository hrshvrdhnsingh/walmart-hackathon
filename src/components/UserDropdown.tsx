
import { useState } from "react";
import { User, MapPin, Settings, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const UserDropdown = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-primary/20 flex items-center gap-2">
          <User className="h-5 w-5" />
          <span className="hidden md:inline">Account</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-card border-border">
        <div className="p-3 border-b border-border">
          <p className="font-semibold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        
        <DropdownMenuItem className="text-foreground hover:bg-accent">
          <User className="h-4 w-4 mr-2" />
          My Account
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-foreground hover:bg-accent">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-border" />
        
        <DropdownMenuItem 
          onClick={logout}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
