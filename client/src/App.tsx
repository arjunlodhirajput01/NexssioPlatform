import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./components/cart-provider";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import WhatsAppPopup from "./components/whatsapp-popup";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AssignmentServices from "@/pages/assignment-services";
import CreativeServices from "@/pages/creative-services";
import ArtShop from "@/pages/art-shop";
import Portfolio from "@/pages/portfolio";
import Contact from "@/pages/contact";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import ParticleBackground from "./components/particle-background";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assignment-services" component={AssignmentServices} />
      <Route path="/creative-services" component={CreativeServices} />
      <Route path="/art-shop" component={ArtShop} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/contact" component={Contact} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
              <ParticleBackground />
              <ThemeToggle />
              <WhatsAppPopup />
              <Toaster />
              <Router />
            </div>
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
