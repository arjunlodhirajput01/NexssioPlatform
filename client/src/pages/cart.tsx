import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@shared/schema";

const Cart = () => {
  const { cartItems, products, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  const getProductById = (id: number): Product | undefined => {
    return products.find(p => p.id === id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="container mx-auto px-6 py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href="/art-shop">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all"
                >
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-0 bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.imageUrl || ""}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {product.description}
                          </p>
                          <p className="text-xl font-bold text-success">
                            ${product.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-0 bg-card/50 sticky top-32">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/art-shop">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
