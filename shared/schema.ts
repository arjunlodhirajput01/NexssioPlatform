import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'assignment', 'creative', 'art-shop'
  price: decimal("price", { precision: 10, scale: 2 }),
  features: text("features").array(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // 'paintings', 'portraits', 'crafts', etc.
  imageUrl: text("image_url"),
  inStock: boolean("in_stock").default(true),
  stockQuantity: integer("stock_quantity").default(0),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // 'creative', 'art', 'design', 'video'
  imageUrl: text("image_url").notNull(),
  projectUrl: text("project_url"),
  tags: text("tags").array(),
  isFeatured: boolean("is_featured").default(false),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default('pending'), // 'pending', 'completed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedbackSubmissions = pgTable("feedback_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  rating: integer("rating").notNull(),
  feedback: text("feedback").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertFeedbackSubmissionSchema = createInsertSchema(feedbackSubmissions).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export type FeedbackSubmission = typeof feedbackSubmissions.$inferSelect;
export type InsertFeedbackSubmission = z.infer<typeof insertFeedbackSubmissionSchema>;
