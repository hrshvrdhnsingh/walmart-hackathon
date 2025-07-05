
import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    // Sorting logic would be implemented here based on requirements
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Save items you love for later!</p>
              <Link to="/products">
                <Button className="bg-primary hover:bg-primary/90 btn-ripple">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="border-border text-foreground hover:bg-accent"
          >
            Clear All
          </Button>
        </div>

        {/* Filters and Sort Bar */}
        <Card className="bg-card p-4 rounded-lg shadow-sm mb-8 border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-border rounded px-3 py-1 text-sm bg-input text-foreground"
              >
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Wishlist Items Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
