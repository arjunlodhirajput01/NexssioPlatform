import { 
  users, services, products, portfolioItems, cartItems, orders, contactSubmissions, feedbackSubmissions,
  type User, type InsertUser, type Service, type InsertService, type Product, type InsertProduct,
  type PortfolioItem, type InsertPortfolioItem, type CartItem, type InsertCartItem,
  type Order, type InsertOrder, type ContactSubmission, type InsertContactSubmission,
  type FeedbackSubmission, type InsertFeedbackSubmission
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service methods
  getServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Portfolio methods
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getFeaturedPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;

  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;

  // Contact methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Feedback methods
  createFeedbackSubmission(submission: InsertFeedbackSubmission): Promise<FeedbackSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private services: Map<number, Service> = new Map();
  private products: Map<number, Product> = new Map();
  private portfolioItems: Map<number, PortfolioItem> = new Map();
  private cartItems: Map<number, CartItem> = new Map();
  private orders: Map<number, Order> = new Map();
  private contactSubmissions: Map<number, ContactSubmission> = new Map();
  private feedbackSubmissions: Map<number, FeedbackSubmission> = new Map();
  
  private currentUserId = 1;
  private currentServiceId = 1;
  private currentProductId = 1;
  private currentPortfolioItemId = 1;
  private currentCartItemId = 1;
  private currentOrderId = 1;
  private currentContactSubmissionId = 1;
  private currentFeedbackSubmissionId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed services
    const assignmentServices: InsertService[] = [
      {
        title: "Academic Research Papers",
        description: "Professional academic research papers with proper citations and formatting",
        category: "assignment",
        price: "50.00",
        features: ["Professional Writing", "Proper Citations", "Plagiarism-Free", "Unlimited Revisions"],
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true
      },
      {
        title: "Business Reports",
        description: "Comprehensive business analysis and strategic reports",
        category: "assignment",
        price: "75.00",
        features: ["Market Analysis", "Financial Projections", "Strategic Recommendations", "Executive Summary"],
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true
      }
    ];

    const creativeServices: InsertService[] = [
      {
        title: "Business Documentary",
        description: "Professional business documentary production",
        category: "creative",
        price: "500.00",
        features: ["Script Writing", "Professional Filming", "Post-Production", "Color Grading"],
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true
      },
      {
        title: "Promotional Video",
        description: "High-impact promotional video content",
        category: "creative",
        price: "300.00",
        features: ["Concept Development", "Professional Filming", "Motion Graphics", "Sound Design"],
        imageUrl: "https://pixabay.com/get/g9df599a0187af512057bae133890f41980347f3217c976e385e849b4a7d2cee69bb20e0a7080fbecad60440a1c47bb91d2152b71d6a1d4822d2b825aa8c062a3_1280.jpg",
        isActive: true
      }
    ];

    // Seed products
    const artProducts: InsertProduct[] = [
      {
        name: "Watercolor Portrait",
        description: "Custom watercolor portrait commission",
        price: "150.00",
        category: "portraits",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
        stockQuantity: 10
      },
      {
        name: "Abstract Canvas",
        description: "Vibrant abstract acrylic painting",
        price: "200.00",
        category: "paintings",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
        stockQuantity: 5
      },
      {
        name: "Paper Craft Art",
        description: "Intricate handmade paper sculptures",
        price: "45.00",
        category: "crafts",
        imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
        stockQuantity: 15
      },
      {
        name: "Wooden Craft",
        description: "Handcrafted wooden decorative items",
        price: "75.00",
        category: "crafts",
        imageUrl: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
        stockQuantity: 8
      },
      {
        name: "Resin Keychains",
        description: "Custom resin keychains with unique designs",
        price: "25.00",
        category: "keychains",
        imageUrl: "https://pixabay.com/get/g0297abf8d272c227e3511e2c64d6fcbe767c1703195adb01f5890986129f4a30fb9cabb05f631c13f7d1f2860d331cc9be64fae986e29ed45d4070d6cee13874_1280.jpg",
        inStock: true,
        stockQuantity: 50
      },
      {
        name: "Flower Bouquet",
        description: "Fresh handcrafted flower arrangements",
        price: "65.00",
        category: "bouquets",
        imageUrl: "https://images.unsplash.com/photo-1487070183336-b863922373d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        inStock: true,
        stockQuantity: 12
      }
    ];

    // Seed portfolio items
    const portfolioData: InsertPortfolioItem[] = [
      {
        title: "Corporate Documentary",
        description: "Professional business documentary production",
        category: "creative",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        tags: ["Video Production", "Corporate", "Documentary"],
        isFeatured: true
      },
      {
        title: "Brand Identity Package",
        description: "Complete brand identity design",
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        tags: ["Branding", "Design", "Identity"],
        isFeatured: true
      },
      {
        title: "Digital Portrait Series",
        description: "Professional digital portrait artwork",
        category: "art",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        tags: ["Digital Art", "Portraits", "Illustration"],
        isFeatured: true
      },
      {
        title: "Motion Graphics Campaign",
        description: "Dynamic motion graphics for marketing",
        category: "video",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        tags: ["Motion Graphics", "Animation", "Marketing"],
        isFeatured: false
      }
    ];

    // Create services
    assignmentServices.forEach(service => {
      this.createService(service);
    });
    creativeServices.forEach(service => {
      this.createService(service);
    });

    // Create products
    artProducts.forEach(product => {
      this.createProduct(product);
    });

    // Create portfolio items
    portfolioData.forEach(item => {
      this.createPortfolioItem(item);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.category === category);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Portfolio methods
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => item.isFeatured);
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => item.category === category);
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioItemId++;
    const item: PortfolioItem = { ...insertItem, id };
    this.portfolioItems.set(id, item);
    return item;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const item: CartItem = { ...insertItem, id, createdAt: new Date() };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId);
    itemsToRemove.forEach(item => this.cartItems.delete(item.id));
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { ...insertOrder, id, createdAt: new Date() };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  // Contact methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const submission: ContactSubmission = { ...insertSubmission, id, createdAt: new Date() };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  // Feedback methods
  async createFeedbackSubmission(insertSubmission: InsertFeedbackSubmission): Promise<FeedbackSubmission> {
    const id = this.currentFeedbackSubmissionId++;
    const submission: FeedbackSubmission = { ...insertSubmission, id, createdAt: new Date() };
    this.feedbackSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
