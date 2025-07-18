import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { GraduationCap, CheckCircle, Clock, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Service } from "@shared/schema";

const AssignmentServices = () => {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services", "assignment"],
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
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8">
              <GraduationCap className="text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Assignment Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional academic and business writing services with expert quality assurance.
              Get top-quality assignments that meet your specific requirements.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-effect border-0 bg-card/50">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">On-Time Delivery</h3>
                <p className="text-muted-foreground">
                  We guarantee timely delivery of all assignments without compromising quality.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 bg-card/50">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Writers</h3>
                <p className="text-muted-foreground">
                  Our team consists of PhD holders and subject matter experts.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 bg-card/50">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Round-the-clock customer support to address all your queries.
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
                    <div className="flex items-center mb-6">
                      <img
                        src={service.imageUrl || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                        alt={service.title}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-2xl font-bold text-primary">
                          ${service.price}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    {service.features && (
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="text-success h-5 w-5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Link href="/contact">
                        <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all">
                          Order Now
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" className="flex-1">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Our Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Requirements</h3>
                <p className="text-muted-foreground">
                  Share your assignment details and specific requirements with us.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Assignment</h3>
                <p className="text-muted-foreground">
                  We assign the best-suited expert for your specific subject area.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Writing</h3>
                <p className="text-muted-foreground">
                  Our expert works on your assignment with attention to detail.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Delivery</h3>
                <p className="text-muted-foreground">
                  Receive your completed assignment before the deadline.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your assignment requirements and get a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-effect hover:bg-white/20 transition-all"
                >
                  View Samples
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

export default AssignmentServices;
