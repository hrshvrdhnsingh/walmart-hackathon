
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Filter, Grid, List, X, Search as SearchIcon } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1200],
    rating: "",
    brand: "",
  });

  // Filter products based on search query and filters
  useEffect(() => {
    let filtered = [...products];

    // Search query filter
    if (query) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating) {
      const minRating = Number(filters.rating);
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Brand search filter
    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products, query]);

  // Sort products
  useEffect(() => {
    const sortedProducts = [...filteredProducts];
    
    switch (sortBy) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(sortedProducts);
  }, [sortBy]);

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1200],
      rating: "",
      brand: "",
    });
  };

  const hasActiveFilters = filters.rating !== "" || filters.brand !== "" || 
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1200;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search Results {query && `for "${query}"`}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="bg-card border-border p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-accent hover:text-accent/80"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Brand Search */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Brand</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search brands..."
                      value={filters.brand}
                      onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                      className="w-full pl-8"
                    />
                    <SearchIcon className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                {/* Customer Rating */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Customer Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    className="w-full border border-border rounded px-3 py-2 text-sm bg-input text-foreground"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4 Stars & Up</option>
                    <option value="4.5">4.5 Stars & Up</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters and Sort Bar */}
            <Card className="bg-card p-4 rounded-lg shadow-sm mb-8 border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="border-border text-foreground hover:bg-accent lg:hidden"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-border rounded px-3 py-1 text-sm bg-input text-foreground"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={{...product, category: product.category}} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={clearFilters} className="bg-primary hover:bg-primary/90">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
