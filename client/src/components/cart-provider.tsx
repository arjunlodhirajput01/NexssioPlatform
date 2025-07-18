import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItem, Product } from "@shared/schema";

type CartContextType = {
  cartItems: CartItem[];
  products: Product[];
  addToCart: (productId: number, quantity?: number) => void;
  updateQuantity: (cartItemId: number, quantity: number) => void;
  removeFromCart: (cartItemId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
  sessionId: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("sessionId", id);
    }
    return id;
  });

  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["/api/cart", sessionId],
  });

  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: (data: { productId: number; quantity: number }) =>
      apiRequest("POST", "/api/cart", {
        sessionId,
        productId: data.productId,
        quantity: data.quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      apiRequest("PUT", `/api/cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", `/api/cart/clear/${sessionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const addToCart = (productId: number, quantity = 1) => {
    addToCartMutation.mutate({ productId, quantity });
  };

  const updateQuantity = (cartItemId: number, quantity: number) => {
    updateQuantityMutation.mutate({ id: cartItemId, quantity });
  };

  const removeFromCart = (cartItemId: number) => {
    removeFromCartMutation.mutate(cartItemId);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  const cartTotal = cartItems.reduce((total: number, item: CartItem) => {
    const product = products.find((p: Product) => p.id === item.productId);
    return total + (product ? parseFloat(product.price) * item.quantity : 0);
  }, 0);

  const cartCount = cartItems.reduce((count: number, item: CartItem) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        products,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        isLoading,
        sessionId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
