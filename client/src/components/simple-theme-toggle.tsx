import { useState } from 'react';
import { Moon, Sun, Gamepad2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from './theme-provider';

export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright',
      icon: Sun,
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200'
    },
    {
      id: 'dark', 
      name: 'Dark Mode',
      description: 'Easy on the eyes',
      icon: Moon,
      bgColor: 'bg-gray-800 hover:bg-gray-700',
      textColor: 'text-white',
      borderColor: 'border-gray-600'
    },
    {
      id: 'gaming',
      name: 'Gaming Mode', 
      description: 'Neon effects',
      icon: Gamepad2,
      bgColor: 'bg-green-900 hover:bg-green-800',
      textColor: 'text-green-100',
      borderColor: 'border-green-500'
    }
  ];

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme as "light" | "dark" | "gaming");
    setIsOpen(false);
  };

  const getCurrentThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-6 h-6" />;
      case 'dark':
        return <Moon className="w-6 h-6" />;
      case 'gaming':
        return <Gamepad2 className="w-6 h-6" />;
      default:
        return <Palette className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className={`rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110 ${
              theme === "gaming" 
                ? "bg-green-500 hover:bg-green-600 animate-pulse shadow-green-500/50" 
                : theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white shadow-gray-800/50"
                : "bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-200 shadow-gray-300/50"
            }`}
          >
            {getCurrentThemeIcon()}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Choose Theme
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isSelected = theme === themeOption.id;
              
              return (
                <Card
                  key={themeOption.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md border-2 ${
                    isSelected 
                      ? 'border-primary shadow-lg bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleThemeSelect(themeOption.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${themeOption.bgColor} ${themeOption.textColor} border ${themeOption.borderColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{themeOption.name}</h3>
                        <p className="text-xs text-muted-foreground">{themeOption.description}</p>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-2">
            Click any theme to apply instantly
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}