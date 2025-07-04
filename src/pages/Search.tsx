
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter } from "lucide-react";

// Mock data - replace with actual API call
const mockSearchResults = [
  {
    id: "1",
    name: "Samsung 65\" 4K Smart TV with HDR",
    price: 499.99,
    originalPrice: 699.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 1250,
    isSponsored: true,
  },
  {
    id: "2",
    name: "Apple AirPods Pro (2nd Generation)",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 892,
  },
  {
    id: "3",
    name: "Nike Air Max Running Shoes",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 567,
  },
  {
    id: "4",
    name: "KitchenAid Stand Mixer",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 334,
  },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState(mockSearchResults);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API call
  const performSearch = async (query: string) => {
    setIsLoading(true);
    // TODO: Replace with actual API call
    setTimeout(() => {
      setResults(mockSearchResults.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      ));
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-card p-6 rounded-lg shadow-sm mb-8 border-border">
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-input border-border text-foreground"
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button type="button" variant="outline" className="border-border text-foreground hover:bg-accent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </form>
          
          {searchQuery && (
            <div className="text-sm text-muted-foreground">
              Showing results for "{searchQuery}" ({results.length} items)
            </div>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Searching...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
