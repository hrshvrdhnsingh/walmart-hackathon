
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
      <div className="bg-[hsl(270,20%,15%)] py-2">
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
            <div className="bg-accent p-3 rounded-lg shadow-lg">
              <svg 
                width="120" 
                height="40" 
                viewBox="0 0 519.187 108.922" 
                className="fill-current text-primary"
              >
                <path d="M55.8 28.6L63.7 0h10.7l7.9 28.6L90.6 0h11.5L86.9 42.8H75.1L68.2 19L61.3 42.8H49.5L34.3 0h11.5L55.8 28.6z"/>
                <path d="M138.8 31.8c0 6.9-5.6 12.5-12.5 12.5s-12.5-5.6-12.5-12.5c0-1.2.2-2.4.5-3.5l-7.4-2.1c-.7 1.8-1.1 3.7-1.1 5.6 0 12.2 9.9 22.1 22.1 22.1s22.1-9.9 22.1-22.1c0-1.9-.2-3.8-.6-5.6l-7.6 2.1c.3 1.1.5 2.3.5 3.5z"/>
                <path d="M175.8 0v8.8h-9.8V0h-10.7v42.8h10.7v-8.8h9.8v8.8h10.7V0h-10.7z"/>
                <path d="M222.1 31.8c0 6.9-5.6 12.5-12.5 12.5s-12.5-5.6-12.5-12.5c0-1.2.2-2.4.5-3.5l-7.4-2.1c-.7 1.8-1.1 3.7-1.1 5.6 0 12.2 9.9 22.1 22.1 22.1s22.1-9.9 22.1-22.1c0-1.9-.2-3.8-.6-5.6l-7.6 2.1c.3 1.1.5 2.3.5 3.5z"/>
                <path d="M519.2 42.8h-11.2l-7.4-28.7-7.4 28.7H482l-12.4-42.8h11.6l7.3 29.2 7.5-29.2h11.2l7.5 29.2 7.3-29.2h11.6L519.2 42.8z"/>
                <path d="M273.4 0h-10.7v42.8h10.7V0z"/>
                <path d="M305.7 31.8c0 6.9-5.6 12.5-12.5 12.5s-12.5-5.6-12.5-12.5c0-1.2.2-2.4.5-3.5l-7.4-2.1c-.7 1.8-1.1 3.7-1.1 5.6 0 12.2 9.9 22.1 22.1 22.1s22.1-9.9 22.1-22.1c0-1.9-.2-3.8-.6-5.6l-7.6 2.1c.3 1.1.5 2.3.5 3.5z"/>
                <path d="M372.4 42.8h-10.7L354.4 19l-7.3 23.8h-10.7L322 0h11.6l7.3 29.2L348.4 0h11.2l7.5 29.2L374.4 0H386L372.4 42.8z"/>
                <path d="M431.5 54.3c-12.2 0-22.1 9.9-22.1 22.1s9.9 22.1 22.1 22.1 22.1-9.9 22.1-22.1-9.9-22.1-22.1-22.1zm0 33.5c-6.3 0-11.4-5.1-11.4-11.4s5.1-11.4 11.4-11.4 11.4 5.1 11.4 11.4-5.1 11.4-11.4 11.4z"/>
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
      <nav className="bg-[hsl(270,20%,15%)] py-2">
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
