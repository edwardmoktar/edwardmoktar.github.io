import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark');

    toast({
      title: `Switched to ${newMode ? 'dark' : 'light'} mode`,
      duration: 1500,
    });
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/path', label: 'Path' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-center">
          <Link to="/" className="text-xl font-semibold hover-lift md:hidden">
            Edward M.
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
              className="hover-lift"
            >
              {isDark ? (
                <svg viewBox="0 0 100 100" className="h-6 w-6 text-yellow-500">
                  <circle cx="50" cy="50" r="40" fill="currentColor"/>
                  <path
                    d="M30 60 Q50 40 70 60 Q60 70 50 65 Q40 70 30 60"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-orange-600"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="h-6 w-6 text-purple-500">
                  <circle cx="50" cy="50" r="40" fill="currentColor"/>
                  <path
                    d="M30 60 Q50 40 70 60 Q60 70 50 65 Q40 70 30 60"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-purple-800"
                  />
                </svg>
              )}
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
            >
              {isDark ? (
                <svg viewBox="0 0 100 100" className="h-6 w-6 text-yellow-500">
                  <circle cx="50" cy="50" r="40" fill="currentColor"/>
                  <path
                    d="M30 60 Q50 40 70 60 Q60 70 50 65 Q40 70 30 60"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-orange-600"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="h-6 w-6 text-purple-500">
                  <circle cx="50" cy="50" r="40" fill="currentColor"/>
                  <path
                    d="M30 60 Q50 40 70 60 Q60 70 50 65 Q40 70 30 60"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-purple-800"
                  />
                </svg>
              )}
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