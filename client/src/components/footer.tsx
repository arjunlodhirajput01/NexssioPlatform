import { Link } from "wouter";
import { Infinity, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Infinity className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">Nexssio</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Professional creative services platform delivering exceptional results for businesses and individuals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/assignment-services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Assignment Writing
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/creative-services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Video Production
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/art-shop">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Custom Artwork
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Portfolio Design
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 info@nexssio.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Creative Street, Art City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Nexssio. All rights reserved. | Built with passion for creative excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
