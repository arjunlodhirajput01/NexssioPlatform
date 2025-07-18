import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/components/cart-provider";
import { insertOrderSchema } from "@shared/schema";

const checkoutSchema = insertOrderSchema.extend({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  expiryDate: z.string().min(5, "Expiry date required"),
  cvv: z.string().min(3, "CVV required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { cartItems, products, cartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      total: (cartTotal * 1.1).toFixed(2),
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const orderMutation = useMutation({
    mutationFn: (data: z.infer<typeof insertOrderSchema>) =>
      apiRequest("POST", "/api/orders", data),
    onSuccess: () => {
      setOrderComplete(true);
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      setIsProcessing(false);
    },
    onError: () => {
      toast({
        title: "Error processing order",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsProcessing(false);
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const { cardNumber, expiryDate, cvv, ...orderData } = data;
      orderMutation.mutate(orderData);
    }, 2000);
  };

  const getProductById = (id: number) => {
    return products.find(p => p.id === id);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="container mx-auto px-6 py-32">
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 gradient-text">Order Complete!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your order. We've received your payment and will begin processing your items shortly.
                You'll receive a confirmation email with tracking information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all"
                  onClick={() => window.location.href = "/"}
                >
                  Continue Shopping
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/contact"}
                >
                  Contact Support
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="container mx-auto px-6 py-32">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all"
              onClick={() => window.location.href = "/art-shop"}
            >
              Continue Shopping
            </Button>
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
          <h1 className="text-4xl font-bold mb-2 gradient-text">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-effect border-0 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Secure Checkout</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="customerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John Doe"
                                  className="glass-effect border-0 bg-white/10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="customerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="john@example.com"
                                  className="glass-effect border-0 bg-white/10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="glass-effect border-0 bg-white/10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Payment Information</span>
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="1234 5678 9012 3456"
                                className="glass-effect border-0 bg-white/10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="MM/YY"
                                  className="glass-effect border-0 bg-white/10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="123"
                                  className="glass-effect border-0 bg-white/10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Place Order - ${(cartTotal * 1.1).toFixed(2)}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-effect border-0 bg-card/50 sticky top-32">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={product.imageUrl || ""}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          ${(parseFloat(product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
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
                </div>

                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
