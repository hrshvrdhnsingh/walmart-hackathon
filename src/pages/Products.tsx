import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";

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
  },
  {
    id: "2",
    name: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 892,
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
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Simulate API call for top products
  useEffect(() => {
    const fetchTopProducts = async () => {
      setIsLoading(true);
      // TODO: Replace with actual API call
      setTimeout(() => {
        setProducts(mockProducts);
        setIsLoading(false);
      }, 1000);
    };

    fetchTopProducts();
  }, []);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const sortedProducts = [...products];
    
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
    
    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Top Products
          </h1>
          <p className="text-gray-600">
            Discover our most popular and highly-rated products
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071ce] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
