import { db } from "./db";
import { services, products, portfolioItems } from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(portfolioItems);
  await db.delete(products);
  await db.delete(services);

  // Seed services
  const assignmentServices = [
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
    },
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

  await db.insert(services).values(assignmentServices);

  // Seed products
  const artProducts = [
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

  await db.insert(products).values(artProducts);

  // Seed portfolio items
  const portfolioData = [
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

  await db.insert(portfolioItems).values(portfolioData);

  console.log("Database seeded successfully!");
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });