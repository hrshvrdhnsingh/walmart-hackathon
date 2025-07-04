
import { Search, ShoppingCart, Menu, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-[#0071ce] text-white">
      {/* Top bar */}
      <div className="bg-[#004c91] py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              How do you want your items?
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Sign In</span>
            <span>Account</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-[#ffc220] text-[#0071ce] px-4 py-2 rounded font-bold text-xl">
              Walmart
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 mx-8 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search everything at Walmart online and in store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 text-black rounded-full border-2 border-[#ffc220] focus:border-[#ffc220] focus:ring-[#ffc220]"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ffc220] hover:bg-[#e6a91a] text-[#0071ce] rounded-full h-10 w-10"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#005bb5]">
              <ShoppingCart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#005bb5] md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#004c91] py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 text-sm">
            <Link to="/products" className="hover:text-[#ffc220] transition-colors">
              All Departments
            </Link>
            <Link to="/products" className="hover:text-[#ffc220] transition-colors">
              Grocery & Essentials
            </Link>
            <Link to="/products" className="hover:text-[#ffc220] transition-colors">
              Fashion
            </Link>
            <Link to="/products" className="hover:text-[#ffc220] transition-colors">
              Electronics
            </Link>
            <Link to="/products" className="hover:text-[#ffc220] transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
