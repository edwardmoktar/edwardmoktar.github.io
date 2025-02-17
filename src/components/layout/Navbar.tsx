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
                <svg viewBox="0 0 100 100" className="h-6 w-6">
                  <circle cx="50" cy="50" r="50" fill="#1A1F35"/>
                  <path d="M50 0a50 50 0 0 1 0 100 50 50 0 0 1 0-100zm0 5a45 45 0 0 0 0 90 45 45 0 0 0 0-90z"/>
                  <path d="M25 15c10 5 30 25 25 35s-25 30-35 25c15 15 45 15 60 0s15-45 0-60c-5 10-25 30-35 25s-20-15-15-25z" fill="#D4D0C7"/>
                  <circle cx="75" cy="20" r="8" fill="#D4D0C7"/>
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="h-6 w-6">
                  <circle cx="50" cy="50" r="50" fill="#E6D5B8"/>
                  <path d="M20 30c15 0 40 20 35 35S25 95 10 85c20 15 50 10 65-10s10-50-10-65c0 15-20 40-35 35S15 30 20 30z" fill="#8B4513"/>
                  <path d="M70 20c10 5 20 25 15 35s-25 20-35 15c15 10 40 5 50-15s5-40-15-50c0 10-15 25-25 20s-15-10-10-20z" fill="#CD853F"/>
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
                <svg viewBox="0 0 100 100" className="h-6 w-6">
                  <circle cx="50" cy="50" r="50" fill="#1A1F35"/>
                  <path d="M50 0a50 50 0 0 1 0 100 50 50 0 0 1 0-100zm0 5a45 45 0 0 0 0 90 45 45 0 0 0 0-90z"/>
                  <path d="M25 15c10 5 30 25 25 35s-25 30-35 25c15 15 45 15 60 0s15-45 0-60c-5 10-25 30-35 25s-20-15-15-25z" fill="#D4D0C7"/>
                  <circle cx="75" cy="20" r="8" fill="#D4D0C7"/>
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="h-6 w-6">
                  <circle cx="50" cy="50" r="50" fill="#E6D5B8"/>
                  <path d="M20 30c15 0 40 20 35 35S25 95 10 85c20 15 50 10 65-10s10-50-10-65c0 15-20 40-35 35S15 30 20 30z" fill="#8B4513"/>
                  <path d="M70 20c10 5 20 25 15 35s-25 20-35 15c15 10 40 5 50-15s5-40-15-50c0 10-15 25-25 20s-15-10-10-20z" fill="#CD853F"/>
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