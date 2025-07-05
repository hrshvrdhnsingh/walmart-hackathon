
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { User, MapPin, Phone, Mail, Edit, Package, Heart, Settings, CreditCard, ShoppingBag, Star, Gift, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving user data:', formData);
  };

  const accountSections = [
    { 
      icon: Package, 
      title: "Your Orders", 
      subtitle: "Track, return, or buy things again", 
      link: "/orders",
      count: "3 recent orders"
    },
    { 
      icon: Heart, 
      title: "Lists", 
      subtitle: "Shopping lists, registries, and wish lists", 
      link: "/lists",
      count: "2 active lists"
    },
    { 
      icon: User, 
      title: "Login & Security", 
      subtitle: "Edit login, name, and mobile number", 
      link: "/account/security",
      count: null
    },
    { 
      icon: CreditCard, 
      title: "Payment Options", 
      subtitle: "Edit or add payment methods", 
      link: "/payment",
      count: "1 card on file"
    },
    { 
      icon: MapPin, 
      title: "Your Addresses", 
      subtitle: "Edit addresses for orders and gifts", 
      link: "/addresses",
      count: "1 address"
    },
    { 
      icon: Settings, 
      title: "Account Settings", 
      subtitle: "Manage your account preferences", 
      link: "/settings",
      count: null
    },
  ];

  const quickActions = [
    { icon: ShoppingBag, title: "Reorder", subtitle: "See your previous orders", link: "/orders" },
    { icon: Star, title: "Reviews", subtitle: "Write and manage reviews", link: "/reviews" },
    { icon: Gift, title: "Gift Cards", subtitle: "Redeem or purchase gift cards", link: "/gift-cards" },
    { icon: HelpCircle, title: "Help", subtitle: "Get help with your account", link: "/help" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please sign in to view your account</h1>
            <Button className="bg-primary hover:bg-primary/90 btn-ripple">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Account
          </h1>
          <p className="text-muted-foreground">
            Manage your orders, account settings, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Profile Information</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-accent hover:text-accent/80 btn-ripple"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Location</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 btn-ripple">
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="border-border text-foreground btn-ripple">
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.location || 'Not set'}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.link}>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer">
                        <action.icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{action.title}</p>
                          <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Account Sections */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accountSections.map((section, index) => (
                <Link key={index} to={section.link}>
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <section.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{section.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{section.subtitle}</p>
                          {section.count && (
                            <p className="text-xs text-accent">{section.count}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
