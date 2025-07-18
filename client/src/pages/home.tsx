import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Video, Palette, ArrowRight, CheckCircle, Sparkles, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  morphText, 
  glowPulse, 
  magneticHover, 
  parallaxFloat,
  liquidMorph,
  particleMove 
} from "@/lib/animations";
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
      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={particleMove}
            animate="animate"
            className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full blur-sm"
          />
          <motion.div
            variants={particleMove}
            animate="animate"
            style={{ animationDelay: '2s' }}
            className="absolute top-40 right-20 w-6 h-6 bg-secondary/30 rounded-full blur-sm"
          />
          <motion.div
            variants={particleMove}
            animate="animate"
            style={{ animationDelay: '4s' }}
            className="absolute bottom-40 left-1/4 w-3 h-3 bg-accent/30 rounded-full blur-sm"
          />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={morphText}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-gaming-text">
                Professional{" "}
                <motion.span 
                  className="gradient-text inline-block animate-gaming-pulse"
                  variants={glowPulse}
                  animate="animate"
                >
                  Creative
                </motion.span>
                <br />
                <motion.span
                  variants={parallaxFloat}
                  animate="animate"
                  className="inline-block"
                >
                  Services Platform
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto"
            >
              Transform your ideas into reality with our comprehensive suite of assignment services,
              creative productions, and artistic masterpieces.
            </motion.p>

            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/assignment-services">
                <motion.div
                  variants={magneticHover}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore Services
                  </Button>
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.div
                  variants={magneticHover}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-effect hover:bg-white/20 transition-all"
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    View Portfolio
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Service Categories Preview */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              <motion.div
                variants={staggerItem}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="service-card glass-effect p-6 rounded-xl text-center group cursor-pointer animate-gaming-glow"
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4"
                  variants={liquidMorph}
                  animate="animate"
                >
                  <GraduationCap className="text-2xl group-hover:scale-110 transition-transform" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Assignment Services</h3>
                <p className="text-muted-foreground">Academic and professional writing solutions</p>
                <motion.div 
                  className="w-0 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 group-hover:w-full transition-all duration-300"
                />
              </motion.div>

              <motion.div
                variants={staggerItem}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="service-card glass-effect p-6 rounded-xl text-center group cursor-pointer animate-gaming-glow"
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4"
                  variants={liquidMorph}
                  animate="animate"
                  style={{ animationDelay: '1s' }}
                >
                  <Video className="text-2xl group-hover:scale-110 transition-transform" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Creative Services</h3>
                <p className="text-muted-foreground">Video production, animations, and brochures</p>
                <motion.div 
                  className="w-0 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-4 group-hover:w-full transition-all duration-300"
                />
              </motion.div>

              <motion.div
                variants={staggerItem}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="service-card glass-effect p-6 rounded-xl text-center group cursor-pointer animate-gaming-glow"
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4"
                  variants={liquidMorph}
                  animate="animate"
                  style={{ animationDelay: '2s' }}
                >
                  <Palette className="text-2xl group-hover:scale-110 transition-transform" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Art Shop</h3>
                <p className="text-muted-foreground">Paintings, portraits, crafts, and more</p>
                <motion.div 
                  className="w-0 h-0.5 bg-gradient-to-r from-accent to-success mx-auto mt-4 group-hover:w-full transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Delivering excellence with measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: stats.projects, label: "Projects", suffix: "+" },
              { value: stats.clients, label: "Happy Clients", suffix: "+" },
              { value: stats.artworks, label: "Artworks", suffix: "+" },
              { value: stats.satisfaction, label: "Satisfaction", suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl glass-effect group"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                  variants={glowPulse}
                  animate="animate"
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for all your creative and professional needs
            </p>
          </motion.div>

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
      <section className="py-20 px-6 bg-muted/20 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-accent/20 to-success/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Featured Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcase of our finest creative work and professional projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                className="portfolio-item glass-effect rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  >
                    <Zap className="text-white h-8 w-8" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
                    <ArrowRight className="text-primary h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/portfolio">
              <motion.div
                variants={magneticHover}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-effect hover:bg-white/20 transition-all"
                >
                  View Full Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
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
