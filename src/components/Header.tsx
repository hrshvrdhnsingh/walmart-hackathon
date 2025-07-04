
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import UserDropdown from "./UserDropdown";
import LocationSelector from "./LocationSelector";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-primary text-white">
      {/* Top bar */}
      <div className="bg-[#004c91] py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <LocationSelector />
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <Link to="/signin">
                <Button variant="ghost" className="text-white hover:bg-primary/20 text-sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="walmart-gradient p-3 rounded-lg font-bold text-xl text-white shadow-lg">
              <svg width="32" height="32" viewBox="0 0 100 100" className="fill-current">
                <path d="M50 10L60 40H90L70 60L80 90L50 70L20 90L30 60L10 40H40L50 10Z"/>
              </svg>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 mx-8 max-w-2xl hidden md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search everything at Walmart online and in store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 text-foreground bg-background rounded-full border-2 border-accent focus:border-accent focus:ring-accent"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-10 w-10"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-primary/20">
              <ShoppingCart className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-primary/20 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 text-foreground bg-background rounded-full border-2 border-accent"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-10 w-10"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="bg-[#004c91] py-2">
        <div className="container mx-auto px-4">
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex items-center space-y-2 md:space-y-0 md:space-x-8 text-sm`}>
            <Link to="/products" className="block hover:text-accent transition-colors py-2 md:py-0">
              All Departments
            </Link>
            <Link to="/products" className="block hover:text-accent transition-colors py-2 md:py-0">
              Grocery & Essentials
            </Link>
            <Link to="/products" className="block hover:text-accent transition-colors py-2 md:py-0">
              Fashion
            </Link>
            <Link to="/products" className="block hover:text-accent transition-colors py-2 md:py-0">
              Electronics
            </Link>
            <Link to="/products" className="block hover:text-accent transition-colors py-2 md:py-0">
              Home
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
