
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isSponsored?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow bg-card border-border">
      {product.isSponsored && (
        <div className="text-xs text-muted-foreground mb-2">Sponsored</div>
      )}
      
      <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium line-clamp-2 text-foreground">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1">
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

        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
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

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Add to cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
