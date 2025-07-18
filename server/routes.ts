import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertFeedbackSubmissionSchema, insertCartItemSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const services = await storage.getServicesByCategory(category);
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services by category" });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/item/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const items = await storage.getPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/featured", async (req, res) => {
    try {
      const items = await storage.getFeaturedPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured portfolio items" });
    }
  });

  app.get("/api/portfolio/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getPortfolioItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio items by category" });
    }
  });

  // Cart routes
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const items = await storage.getCartItems(sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const result = insertCartItemSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid cart item data", details: result.error });
      }
      const item = await storage.addToCart(result.data);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      const item = await storage.updateCartItem(id, quantity);
      if (!item) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart/clear/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await storage.clearCart(sessionId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const result = insertOrderSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid order data", details: result.error });
      }
      const order = await storage.createOrder(result.data);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid contact submission data", details: result.error });
      }
      const submission = await storage.createContactSubmission(result.data);
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Feedback routes
  app.post("/api/feedback", async (req, res) => {
    try {
      const result = insertFeedbackSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid feedback submission data", details: result.error });
      }
      const submission = await storage.createFeedbackSubmission(result.data);
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
