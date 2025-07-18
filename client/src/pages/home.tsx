import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Video, Palette, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Service, PortfolioItem } from "@shared/schema";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [stats, setStats] = useState({ projects: 0, clients: 0, artworks: 0, satisfaction: 0 });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: portfolioItems = [] } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio/featured"],
  });

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollY(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const targets = { projects: 500, clients: 350, artworks: 1200, satisfaction: 98 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        setStats({
          projects: Math.floor(targets.projects * easeProgress),
          clients: Math.floor(targets.clients * easeProgress),
          artworks: Math.floor(targets.artworks * easeProgress),
          satisfaction: Math.floor(targets.satisfaction * easeProgress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById("stats");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollY / 100})` }}
      />

      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="animate-slide-up"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Professional <span className="gradient-text">Creative</span>
              <br />
              Services Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Transform your ideas into reality with our comprehensive suite of assignment services,
              creative productions, and artistic masterpieces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Explore Services
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-effect hover:bg-white/20 transition-all"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Service Categories Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="service-card glass-effect p-6 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Assignment Services</h3>
                <p className="text-muted-foreground">Academic and professional writing solutions</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="service-card glass-effect p-6 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Creative Services</h3>
                <p className="text-muted-foreground">Video production, animations, and brochures</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="service-card glass-effect p-6 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Art Shop</h3>
                <p className="text-muted-foreground">Paintings, portraits, crafts, and more</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for all your creative and professional needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Assignment Services */}
            <Card className="service-card glass-effect border-0 bg-card/50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Assignment Services</h3>
                <p className="text-muted-foreground mb-6">
                  Professional academic and business writing services with expert quality assurance.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Academic Research Papers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Business Reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Technical Documentation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Content Writing</span>
                  </div>
                </div>

                <Link href="/assignment-services">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Creative Services */}
            <Card className="service-card glass-effect border-0 bg-card/50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-2xl flex items-center justify-center mb-6">
                  <Video className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Creative Services</h3>
                <p className="text-muted-foreground mb-6">
                  Professional video production, animations, and motion graphics for your brand.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Business Documentaries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Promotional Videos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Logo Animations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Motion Brochures</span>
                  </div>
                </div>

                <Link href="/creative-services">
                  <Button className="w-full bg-gradient-to-r from-secondary to-accent hover:shadow-lg transition-all">
                    View Portfolio
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Art Shop */}
            <Card className="service-card glass-effect border-0 bg-card/50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-accent to-success rounded-2xl flex items-center justify-center mb-6">
                  <Palette className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Art Shop</h3>
                <p className="text-muted-foreground mb-6">
                  Unique handcrafted artworks, portraits, and creative items for every occasion.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Custom Portraits</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Paintings & Artwork</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Handmade Crafts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-success h-5 w-5" />
                    <span>Resin Keychains</span>
                  </div>
                </div>

                <Link href="/art-shop">
                  <Button className="w-full bg-gradient-to-r from-accent to-success hover:shadow-lg transition-all">
                    Shop Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Featured Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcase of our finest creative work and professional projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="portfolio-item glass-effect rounded-2xl overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
                    <ArrowRight className="text-primary h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="glass-effect hover:bg-white/20 transition-all"
              >
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold stats-counter gradient-text mb-2">
                {stats.projects}
              </div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold stats-counter gradient-text mb-2">
                {stats.clients}
              </div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold stats-counter gradient-text mb-2">
                {stats.artworks}
              </div>
              <p className="text-muted-foreground">Artworks Created</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold stats-counter gradient-text mb-2">
                {stats.satisfaction}%
              </div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their creative and professional needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Get Started Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="glass-effect hover:bg-white/20 transition-all border-white text-white"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
