import { useState } from 'react';
import { MessageCircle, X, GraduationCap, Video, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const WhatsAppPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    {
      id: 'assignment',
      title: 'Assignment Services',
      description: 'Academic and professional writing solutions',
      icon: GraduationCap,
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      message: 'Hi! I need help with assignment services. Can you provide details about academic and professional writing solutions?'
    },
    {
      id: 'creative',
      title: 'Creative Services',
      description: 'Video production, animations, and brochures',
      icon: Video,
      color: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      message: 'Hi! I\'m interested in creative services. Can you tell me about video production, animations, and brochure design?'
    },
    {
      id: 'art',
      title: 'Art Shop',
      description: 'Paintings, portraits, crafts, and more',
      icon: Palette,
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      message: 'Hi! I\'d like to know more about your art shop. Can you provide details about paintings, portraits, and crafts?'
    }
  ];

  const handleServiceClick = (service: typeof services[0]) => {
    const phoneNumber = '1234567890'; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(service.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                Chat with us on WhatsApp
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose a service category to start chatting:
              </p>
              
              <div className="grid gap-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-md border-2 hover:border-primary/50 ${service.bgColor}`}
                      onClick={() => handleServiceClick(service)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${service.bgColor}`}>
                            <Icon className={`w-5 h-5 ${service.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{service.title}</h3>
                            <p className="text-xs text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-2 pt-2 border-t">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  alt="WhatsApp" 
                  className="w-5 h-5"
                />
                <span className="text-sm text-muted-foreground">
                  You'll be redirected to WhatsApp
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default WhatsAppPopup;