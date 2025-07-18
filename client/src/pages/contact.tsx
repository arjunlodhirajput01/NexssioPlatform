import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { insertContactSubmissionSchema } from "@shared/schema";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertContactSubmissionSchema>>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: z.infer<typeof insertContactSubmissionSchema>) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: z.infer<typeof insertContactSubmissionSchema>) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

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
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to bring your creative vision to life? Let's discuss your project
              and create something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-effect border-0 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Your full name"
                                  className="glass-effect border-0 bg-white/10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="your@email.com"
                                  className="glass-effect border-0 bg-white/10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="What's this about?"
                                className="glass-effect border-0 bg-white/10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={6}
                                placeholder="Tell us about your project..."
                                className="glass-effect border-0 bg-white/10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Email Us</h3>
                      <p className="text-muted-foreground">info@nexssio.com</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Call Us</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Available Monday to Friday, 9 AM to 6 PM EST.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Visit Us</h3>
                      <p className="text-muted-foreground">123 Creative Street, Art City</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Schedule an appointment to visit our studio.
                  </p>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="glass-effect border-0 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">How do I place an order?</h3>
                  <p className="text-muted-foreground">
                    You can place an order by contacting us through this form, email, or phone.
                    We'll discuss your requirements and provide a detailed quote.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">What are your payment terms?</h3>
                  <p className="text-muted-foreground">
                    We typically require 50% upfront and 50% upon completion. We accept
                    all major credit cards and bank transfers.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">How long does a project take?</h3>
                  <p className="text-muted-foreground">
                    Project timelines vary depending on complexity. Assignment services
                    typically take 3-7 days, while creative projects may take 1-4 weeks.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Do you offer revisions?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer unlimited revisions until you're completely satisfied
                    with the final result. Your satisfaction is our top priority.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
