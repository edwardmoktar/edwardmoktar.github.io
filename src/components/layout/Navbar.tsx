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
              <div className={`transform transition-transform duration-300 ${isDark ? 'scale-100' : 'scale-0'} absolute`}>
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M12 3a6 6 0 0 0-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 0 0-6-6m0-2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"
                    fill="currentColor"
                    className="transform origin-center transition-all duration-500"
                  />
                  <path
                    d="M12 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                    fill="currentColor"
                    className="transform origin-center transition-all duration-500"
                  />
                </svg>
              </div>
              <div className={`transform transition-transform duration-300 ${!isDark ? 'scale-100' : 'scale-0'} ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    fill="currentColor"
                    className="transform origin-center transition-all duration-500"
                  />
                  <path
                    d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.828-7.172l-1.414 1.414M6.242 17.758l-1.414 1.414m0-12.344l1.414 1.414m11.102 9.516l1.414 1.414"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transform origin-center transition-all duration-500"
                  />
                </svg>
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
            >
              <div className={`transform transition-transform duration-300 ${isDark ? 'scale-100' : 'scale-0'} absolute`}>
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M12 3a6 6 0 0 0-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 0 0-6-6m0-2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"
                    fill="currentColor"
                    className="transform origin-center transition-all duration-500"
                  />
                  <path
                    d="M12 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                    fill="currentColor"
                    className="transform origin-center transition-all duration-500"
                  />
                </svg>
              </div>
              <div className={`transform transition-transform duration-300 ${!isDark ? 'scale-100' : 'scale-0'} ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    fill="currentColor"
                    className="transform origin-center transition-all duration-500"
                  />
                  <path
                    d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.828-7.172l-1.414 1.414M6.242 17.758l-1.414 1.414m0-12.344l1.414 1.414m11.102 9.516l1.414 1.414"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transform origin-center transition-all duration-500"
                  />
                </svg>
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