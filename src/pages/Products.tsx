import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, Grid, List, X } from "lucide-react";

// Mock data - replace with actual API call
const mockProducts = [
  {
    id: "1",
    name: "Samsung 65\" 4K Smart TV with HDR and Alexa Built-in",
    price: 499.99,
    originalPrice: 699.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 1250,
    isSponsored: true,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 892,
    category: "Electronics",
  },
  {
    id: "3",
    name: "Nike Air Max 270 Running Shoes - Men's",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 567,
  },
  {
    id: "4",
    name: "KitchenAid Artisan Series 5-Qt Stand Mixer",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 334,
  },
  {
    id: "5",
    name: "iPhone 15 Pro 256GB - Natural Titanium",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 2104,
  },
  {
    id: "6",
    name: "Dyson V15 Detect Cordless Vacuum Cleaner",
    price: 649.99,
    originalPrice: 749.99,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 445,
  },
  {
    id: "7",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 329.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 778,
  },
  {
    id: "8",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=300&h=300&fit=crop",
    rating: 4.4,
    reviews: 1567,
  },
];

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    rating: "",
  });

  // Simulate API call for top products
  useEffect(() => {
    const fetchTopProducts = async () => {
      setIsLoading(true);
      // TODO: Replace with actual API call
      setTimeout(() => {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setIsLoading(false);
      }, 1000);
    };

    fetchTopProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    if (filters.rating) {
      const minRating = Number(filters.rating);
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const sortedProducts = [...filteredProducts];
    
    switch (newSort) {
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
        // Keep original order for "featured"
        break;
    }
    
    setFilteredProducts(sortedProducts);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: "",
      rating: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== "");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Top Products
          </h1>
          <p className="text-muted-foreground">
            Discover our most popular and highly-rated products
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
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full border border-border rounded px-3 py-2 text-sm bg-input text-foreground"
                  >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full border border-border rounded px-3 py-2 text-sm bg-input text-foreground"
                  >
                    <option value="">Any Price</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-500">$100 - $500</option>
                    <option value="500-1000">$500 - $1000</option>
                    <option value="1000-99999">$1000+</option>
                  </select>
                </div>

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
                      className={viewMode === "grid" ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-accent"}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-accent"}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-border rounded px-3 py-1 text-sm bg-input text-foreground"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {filters.category && (
                      <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">
                        Category: {filters.category}
                      </span>
                    )}
                    {filters.priceRange && (
                      <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">
                        Price: ${filters.priceRange.replace('-', ' - $')}
                      </span>
                    )}
                    {filters.rating && (
                      <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">
                        Rating: {filters.rating}+ Stars
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Products Grid/List */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}

            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button onClick={clearFilters} className="bg-primary hover:bg-primary/90">
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {!isLoading && filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="px-8 border-border text-foreground hover:bg-accent">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
