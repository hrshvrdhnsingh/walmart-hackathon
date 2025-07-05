
import { useState } from "react";
import { Search, ShoppingCart, MapPin, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationSelector from "./LocationSelector";
import UserDropdown from "./UserDropdown";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg" 
              alt="Walmart" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl hidden sm:inline">Walmart</span>
          </Link>

          {/* Location */}
          <div className="hidden lg:flex">
            <LocationSelector />
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search everything at Walmart online and in store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 rounded-full bg-white text-black border-0 focus:ring-2 focus:ring-accent"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground btn-ripple"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserDropdown />
            ) : (
              <Button
                variant="ghost"
                onClick={handleSignInClick}
                className="text-white hover:bg-primary/20 btn-ripple"
              >
                <User className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            )}

            <Link to="/cart">
              <Button variant="ghost" className="text-white hover:bg-primary/20 relative btn-ripple">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
                <span className="hidden md:inline ml-2">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
