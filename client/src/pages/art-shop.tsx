import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Palette, ShoppingCart, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@shared/schema";

const ArtShop = () => {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-8">
              <Palette className="text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Art Shop
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unique handcrafted artworks, portraits, and creative items for every occasion.
              Each piece is carefully crafted with love and attention to detail.
            </p>
          </motion.div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-accent to-success text-white border-0"
            >
              <Filter className="w-4 h-4 mr-2" />
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="glass-effect hover:bg-white/20 transition-all capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="portfolio-item glass-effect border-0 bg-card/50 group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.imageUrl || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-effect hover:bg-white/20"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-accent to-success"
                            onClick={() => addToCart(product.id)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="capitalize bg-accent/90 text-white"
                        >
                          {product.category}
                        </Badge>
                      </div>
                      {!product.inStock && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-success">
                          ${product.price}
                        </span>
                        <Button
                          className="bg-gradient-to-r from-accent to-success hover:shadow-lg transition-all"
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Categories Showcase */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Our Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Paintings</h3>
                  <p className="text-muted-foreground mb-4">
                    Original paintings in various styles and mediums.
                  </p>
                  <p className="text-sm text-accent">
                    {products.filter(p => p.category === 'paintings').length} items
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Portraits</h3>
                  <p className="text-muted-foreground mb-4">
                    Custom portraits in watercolor, digital, and traditional media.
                  </p>
                  <p className="text-sm text-accent">
                    {products.filter(p => p.category === 'portraits').length} items
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Crafts</h3>
                  <p className="text-muted-foreground mb-4">
                    Handmade crafts including paper, wood, and resin items.
                  </p>
                  <p className="text-sm text-accent">
                    {products.filter(p => p.category === 'crafts').length} items
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Custom Orders */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Something Custom?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? We accept custom orders for portraits, 
              paintings, and crafts. Let us create something unique just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-accent to-success hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Request Custom Order
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-effect hover:bg-white/20 transition-all"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">
                  Free shipping on orders over $100. Safe and secure packaging.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Handcrafted</h3>
                <p className="text-muted-foreground">
                  Every piece is carefully handcrafted with attention to detail.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">↩️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">
                  30-day return policy. Not satisfied? We'll make it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArtShop;
