import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Video, Play, Camera, Palette, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Service } from "@shared/schema";

const CreativeServices = () => {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services", "creative"],
  });

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
            <div className="w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-8">
              <Video className="text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Creative Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional video production, animations, and motion graphics for your brand.
              Bring your creative vision to life with our expert team.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-effect border-0 bg-card/50">
              <CardContent className="p-6 text-center">
                <Camera className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Equipment</h3>
                <p className="text-muted-foreground">
                  State-of-the-art cameras, lighting, and audio equipment for premium quality.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 bg-card/50">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
                <p className="text-muted-foreground">
                  Quick and efficient production process without compromising quality.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 bg-card/50">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Award-Winning Team</h3>
                <p className="text-muted-foreground">
                  Our creative team has won multiple industry awards for excellence.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="service-card glass-effect border-0 bg-card/50">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <img
                        src={service.imageUrl || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                        alt={service.title}
                        className="w-full h-48 rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-2xl font-bold text-secondary">
                        ${service.price}
                      </p>
                    </div>

                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    {service.features && (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Link href="/contact">
                        <Button className="flex-1 bg-gradient-to-r from-secondary to-accent hover:shadow-lg transition-all">
                          Start Project
                        </Button>
                      </Link>
                      <Link href="/portfolio">
                        <Button variant="outline" className="flex-1">
                          View Samples
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Video Production Process */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Our Creative Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Concept</h3>
                <p className="text-muted-foreground text-sm">
                  We develop creative concepts based on your vision and goals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold">📝</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Planning</h3>
                <p className="text-muted-foreground text-sm">
                  Detailed planning and storyboarding for seamless execution.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Production</h3>
                <p className="text-muted-foreground text-sm">
                  Professional filming with top-quality equipment and crew.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold">✂️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Post-Production</h3>
                <p className="text-muted-foreground text-sm">
                  Expert editing, color grading, and audio enhancement.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold">🚀</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Final delivery in multiple formats for all your needs.
                </p>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Our Specializations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🎬</span>
                  </div>
                  <h3 className="font-semibold mb-2">Corporate Videos</h3>
                  <p className="text-muted-foreground text-sm">
                    Professional corporate documentaries and presentations.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">📺</span>
                  </div>
                  <h3 className="font-semibold mb-2">Commercials</h3>
                  <p className="text-muted-foreground text-sm">
                    Eye-catching promotional videos and advertisements.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">✨</span>
                  </div>
                  <h3 className="font-semibold mb-2">Animations</h3>
                  <p className="text-muted-foreground text-sm">
                    2D and 3D animations for logos and branding.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🎨</span>
                  </div>
                  <h3 className="font-semibold mb-2">Motion Graphics</h3>
                  <p className="text-muted-foreground text-sm">
                    Dynamic motion graphics and visual effects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's bring your creative vision to life with our professional video production services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-accent hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Start Your Project
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-effect hover:bg-white/20 transition-all"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreativeServices;
