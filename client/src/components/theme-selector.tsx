import { useState } from 'react';
import { Moon, Sun, Gamepad2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from './theme-provider';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: Sun,
      colors: ['#ffffff', '#f3f4f6', '#1f2937'],
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes',
      icon: Moon,
      colors: ['#0f172a', '#1e293b', '#64748b'],
    },
    {
      id: 'gaming',
      name: 'Gaming Mode',
      description: 'Neon effects and cyberpunk style',
      icon: Gamepad2,
      colors: ['#0a0a0a', '#00ff00', '#ff00ff'],
    },
  ];

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme as "light" | "dark" | "gaming");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Theme Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className={`fixed top-4 right-4 z-50 rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110 ${
              theme === "gaming" 
                ? "bg-green-500 hover:bg-green-600 animate-pulse shadow-green-500/50" 
                : theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-200"
            }`}
          >
            <Settings className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Choose Theme
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isSelected = theme === themeOption.id;
              
              return (
                <Card
                  key={themeOption.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                    isSelected 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleThemeSelect(themeOption.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{themeOption.name}</h3>
                        <p className="text-xs text-muted-foreground">{themeOption.description}</p>
                      </div>
                      <div className="flex gap-1">
                        {themeOption.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Click on any theme to apply it instantly
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}