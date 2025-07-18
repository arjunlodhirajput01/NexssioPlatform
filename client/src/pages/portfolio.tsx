import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { PortfolioItem } from "@shared/schema";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: portfolioItems = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const categories = ["all", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Featured Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcase of our finest creative work and professional projects.
              Each piece represents our commitment to excellence and innovation.
            </p>
          </motion.div>

          {/* Portfolio Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-secondary"
                    : "glass-effect hover:bg-white/20 transition-all"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="portfolio-item glass-effect border-0 bg-card/50 group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-3">
                          {item.category === "video" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-effect hover:bg-white/20"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          {item.projectUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-effect hover:bg-white/20"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="capitalize bg-primary/90 text-white"
                        >
                          {item.category}
                        </Badge>
                      </div>
                      {item.isFeatured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-accent text-white">Featured</Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground capitalize">
                          {item.category}
                        </span>
                        <ArrowRight className="text-primary h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">
                No portfolio items found for the selected category.
              </p>
            </div>
          )}

          {/* Process Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
              Our Creative Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Discovery</h3>
                <p className="text-muted-foreground">
                  We start by understanding your vision, goals, and requirements.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Concept</h3>
                <p className="text-muted-foreground">
                  We develop creative concepts and present them for your approval.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Creation</h3>
                <p className="text-muted-foreground">
                  Our experts bring the concept to life with attention to detail.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Delivery</h3>
                <p className="text-muted-foreground">
                  We deliver the final product that exceeds your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
