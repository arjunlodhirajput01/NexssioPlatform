import { Moon, Sun, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getNextTheme = () => {
    if (theme === "light") return "dark";
    if (theme === "dark") return "gaming";
    return "light";
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />;
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />;
      case "gaming":
        return <Gamepad2 className="h-[1.2rem] w-[1.2rem] transition-all duration-300 text-primary" />;
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />;
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(getNextTheme())}
      className={`fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border-border hover:bg-accent/50 transition-all duration-300 ${
        theme === "gaming" ? "animate-pulse shadow-lg shadow-primary/50" : ""
      }`}
    >
      {getThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}