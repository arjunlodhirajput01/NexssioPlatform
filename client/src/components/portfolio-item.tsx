import { motion } from "framer-motion";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PortfolioItemProps {
  id: number;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  projectUrl?: string;
  tags?: string[];
  isFeatured?: boolean;
  index?: number;
  onClick?: () => void;
}

const PortfolioItem = ({
  title,
  description,
  category,
  imageUrl,
  projectUrl,
  tags,
  isFeatured,
  index = 0,
  onClick,
}: PortfolioItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="portfolio-item glass-effect border-0 bg-card/50 group h-full">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-3">
                {category === "video" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-effect hover:bg-white/20"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
                {projectUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-effect hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(projectUrl, '_blank');
                    }}
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
                {category}
              </Badge>
            </div>
            {isFeatured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-accent text-white">Featured</Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            {description && (
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {description}
              </p>
            )}
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, tagIndex) => (
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
                {category}
              </span>
              <ArrowRight className="text-primary h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioItem;
