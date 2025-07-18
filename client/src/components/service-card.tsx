import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  imageUrl?: string;
  icon: React.ReactNode;
  gradientColors: string;
  onOrderClick: () => void;
  onQuoteClick: () => void;
  index?: number;
}

const ServiceCard = ({
  title,
  description,
  price,
  features,
  imageUrl,
  icon,
  gradientColors,
  onOrderClick,
  onQuoteClick,
  index = 0,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="service-card glass-effect border-0 bg-card/50 h-full">
        <CardContent className="p-8">
          <div className={`w-20 h-20 bg-gradient-to-r ${gradientColors} rounded-2xl flex items-center justify-center mb-6`}>
            {icon}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-2xl font-bold text-primary">
              ${price}
            </p>
          </div>

          <p className="text-muted-foreground mb-6">{description}</p>

          {imageUrl && (
            <div className="mb-6">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="space-y-3 mb-6">
            {features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center space-x-3">
                <CheckCircle className="text-success h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onOrderClick}
              className={`flex-1 bg-gradient-to-r ${gradientColors} hover:shadow-lg transition-all`}
            >
              Order Now
            </Button>
            <Button
              onClick={onQuoteClick}
              variant="outline"
              className="flex-1 glass-effect hover:bg-white/20"
            >
              Get Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
