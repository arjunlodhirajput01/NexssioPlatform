import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Infinity, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "./cart-provider";
import { useTheme } from "./theme-provider";
import { useState } from "react";

const Header = () => {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/assignment-services", label: "Assignment Services" },
    { href: "/creative-services", label: "Creative Services" },
    { href: "/art-shop", label: "Art Shop" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect animate-fade-in"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-4 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Infinity className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Nexssio</h1>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`hover:text-primary transition-colors cursor-pointer ${
                    location === item.href ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all hidden md:block">
                Get Started
              </Button>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={`text-lg hover:text-primary transition-colors ${
                          location === item.href ? "text-primary" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="justify-start"
                  >
                    {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
