
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isSponsored?: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)}`,
      duration: 2000,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist", {
        description: product.name,
        duration: 2000,
      });
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!", {
        description: product.name,
        duration: 2000,
      });
    }
  };

  const formatPrice = (price: number) => {
    const dollars = Math.floor(price);
    const cents = Math.round((price - dollars) * 100);
    return { dollars, cents };
  };

  const { dollars, cents } = formatPrice(product.price);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow bg-card border-border h-full flex flex-col relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleWishlistToggle}
        className={`absolute top-2 right-2 z-10 h-8 w-8 ${
          isInWishlist(product.id) 
            ? "text-red-500 hover:text-red-600" 
            : "text-gray-400 hover:text-red-500"
        }`}
      >
        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
      </Button>

      {product.isSponsored && (
        <div className="text-xs text-muted-foreground mb-2 h-4">Sponsored</div>
      )}
      {!product.isSponsored && (
        <div className="h-4 mb-2"></div>
      )}
      
      <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>

      <div className="space-y-3 flex-1 flex flex-col">
        <h3 className="text-sm font-medium line-clamp-2 text-foreground min-h-[2.5rem] flex-shrink-0">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1 flex-shrink-0">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "text-accent fill-current"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="walmart-price text-lg font-semibold text-foreground">
            <span className="dollar">$</span>
            <span>{dollars}</span>
            <span className="cents">{cents.toString().padStart(2, '0')}</span>
          </div>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                {discount}% off
              </span>
            </>
          )}
        </div>

        <div className="mt-auto pt-2">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-ripple"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
