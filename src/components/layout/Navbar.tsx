import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    toast({
      title: `Switched to ${newTheme} mode`,
      duration: 1500,
    });
  };

  const navLinks = [
    { path: '/', label: '-home' },
    { path: '/path', label: '/path' },
    { path: '/projects', label: '{projects}' },
    { path: '/skills', label: '$kills' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F3EE]/80 dark:bg-[#020817]/80 backdrop-blur-lg border-b border-[#F6F3EE] dark:border-[#020817] h-[60px] flex items-center">

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between md:justify-center">
          <Link to="/" className="text-xl font-semibold hover-lift md:hidden">
            {"{ed}"}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link text-lg">
                {link.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="theme-toggle-btn"
            >
              {/* Sun icon - visible in light mode */}
              <div className={`absolute transition-all duration-300 ${theme !== 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <Sun className="h-6 w-6" />
              </div>
              
              {/* Moon icon - visible in dark mode */}
              <div className={`absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <Moon className="h-6 w-6 text-[#f0c040]" />
              </div>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="theme-toggle-btn"
            >
              {/* Sun icon - visible in light mode */}
              <div className={`absolute transition-all duration-300 ${theme !== 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <Sun className="h-6 w-6" />
              </div>
              
              {/* Moon icon - visible in dark mode */}
              <div className={`absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <Moon className="h-6 w-6 text-[#f0c040]" />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}