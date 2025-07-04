
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Truck, RefreshCw, DollarSign, Clock } from "lucide-react";

const Index = () => {
  const categories = [
    { name: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop", color: "bg-green-100" },
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop", color: "bg-blue-100" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop", color: "bg-pink-100" },
    { name: "Home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop", color: "bg-yellow-100" },
  ];

  const features = [
    { icon: Truck, title: "Free shipping", subtitle: "On orders $35+" },
    { icon: RefreshCw, title: "Free returns", subtitle: "Within 90 days" },
    { icon: DollarSign, title: "Everyday low prices", subtitle: "We won't be beat" },
    { icon: Clock, title: "Pickup today", subtitle: "At your local store" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0071ce] to-[#004c91] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Save Money. Live Better.
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Shop everything you need, from groceries to electronics, all in one place with unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-[#ffc220] hover:bg-[#e6a91a] text-[#0071ce] font-semibold px-8">
                Shop Now
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0071ce] px-8">
                Search Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0071ce] text-white rounded-full mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/products">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-center text-gray-900">
                      {category.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#ffc220] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0071ce] mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-[#0071ce] text-lg mb-8">
            Discover thousands of products at unbeatable prices
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-[#0071ce] hover:bg-[#005bb5] text-white px-8">
              Browse All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#004c91] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <div className="space-y-2 text-sm">
                <div>Help Center</div>
                <div>Returns</div>
                <div>Contact Us</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <div className="space-y-2 text-sm">
                <div>All Departments</div>
                <div>Weekly Ad</div>
                <div>Clearance</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <div className="space-y-2 text-sm">
                <div>Sign In</div>
                <div>Create Account</div>
                <div>Order Status</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-2 text-sm">
                <div>Facebook</div>
                <div>Twitter</div>
                <div>Instagram</div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#0071ce] mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Walmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
