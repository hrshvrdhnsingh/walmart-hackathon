
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  items: number;
  total: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
  image: string;
  itemName: string;
}

const Orders = () => {
  const [orders] = useState<Order[]>([
    {
      id: "WM001234567",
      date: "2024-01-15",
      status: "delivered",
      items: 3,
      total: 89.97,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop",
      itemName: "Organic Bananas, 3 lbs",
    },
    {
      id: "WM001234568",
      date: "2024-01-10",
      status: "shipped",
      items: 1,
      total: 299.99,
      estimatedDelivery: "Jan 18, 2024",
      trackingNumber: "1Z999AA1234567890",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop",
      itemName: "Samsung 55\" Smart TV",
    },
    {
      id: "WM001234569",
      date: "2024-01-08",
      status: "processing",
      items: 2,
      total: 45.98,
      estimatedDelivery: "Jan 20, 2024",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
      itemName: "Cotton T-Shirt",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <Package className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Link to="/account" className="hover:text-accent">Account</Link>
            <span>/</span>
            <span>Your Orders</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Your Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track packages, review or buy items again, and more.
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-card border-border">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CardTitle className="text-sm font-medium text-foreground">
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                    <Button variant="ghost" size="sm" className="btn-ripple">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img
                    src={order.image}
                    alt={order.itemName}
                    className="w-16 h-16 object-cover rounded-lg bg-muted"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      {order.itemName}
                      {order.items > 1 && (
                        <span className="text-muted-foreground ml-1">
                          and {order.items - 1} other item{order.items - 1 > 1 ? 's' : ''}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Total: ${order.total.toFixed(2)}
                    </p>
                    
                    {order.estimatedDelivery && order.status !== 'delivered' && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Estimated delivery: {order.estimatedDelivery}
                      </p>
                    )}
                    
                    {order.trackingNumber && (
                      <p className="text-sm text-muted-foreground mb-3">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {order.status === 'delivered' && (
                        <>
                          <Button size="sm" variant="outline" className="btn-ripple">
                            Buy Again
                          </Button>
                          <Button size="sm" variant="outline" className="btn-ripple">
                            Write Review
                          </Button>
                        </>
                      )}
                      {order.status === 'shipped' && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90 btn-ripple">
                          Track Package
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="btn-ripple">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No orders yet
              </h3>
              <p className="text-muted-foreground mb-6">
                When you place your first order, it will appear here.
              </p>
              <Link to="/products">
                <Button className="bg-primary hover:bg-primary/90 btn-ripple">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Orders;
