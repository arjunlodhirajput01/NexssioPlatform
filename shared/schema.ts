import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'assignment', 'creative', 'art-shop'
  price: text("price"),
  features: text("features"), // JSON string
  imageUrl: text("image_url"),
  isActive: integer("is_active", { mode: 'boolean' }).default(true),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  category: text("category").notNull(), // 'paintings', 'portraits', 'crafts', etc.
  imageUrl: text("image_url"),
  inStock: integer("in_stock", { mode: 'boolean' }).default(true),
  stockQuantity: integer("stock_quantity").default(0),
});

export const portfolioItems = sqliteTable("portfolio_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // 'creative', 'art', 'design', 'video'
  imageUrl: text("image_url").notNull(),
  projectUrl: text("project_url"),
  tags: text("tags"), // JSON string
  isFeatured: integer("is_featured", { mode: 'boolean' }).default(false),
});

export const cartItems = sqliteTable("cart_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  total: text("total").notNull(),
  status: text("status").notNull().default('pending'), // 'pending', 'completed', 'cancelled'
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const feedbackSubmissions = sqliteTable("feedback_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  rating: integer("rating").notNull(),
  feedback: text("feedback").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
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
