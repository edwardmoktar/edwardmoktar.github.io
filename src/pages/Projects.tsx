import React, { useState, useRef, useEffect, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, BarChart2, Rocket, Gamepad2, X, ExternalLink, CheckCircle2, Folder, Layers, CircleX, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Project type definition
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  media: {
    type: 'image' | 'video' | 'gif';
    url: string;
    caption: string;
  }[];
  icon: keyof typeof icons;
  techStack: string[];
  categories: string[];
  keyPoints: string[]; // Added key points for the three pointers
  problem: string;
  solution: string;
  impact: {
    metrics: {
      label: string;
      before: number;
      after: number;
    }[];
    stats: {
      value: string;
      label: string;
    }[];
  };
  url?: string;
  fullDescription?: string;
  contribution?: string;
  technologies?: string[];
  links?: {
    url: string;
    text: string;
  }[];
  timeline?: {
    duration: string;
    completed: string;
  };
}

const icons = {
  chart: BarChart2,
  rocket: Rocket,
  game: Gamepad2,
};

// Project data with added keyPoints
const projects: Project[] = [
  {
    id: 1,
    title: "Dune Wizard",
    subtitle: "Web3 Analytics Dashboard",
    description: "Advanced analytics platform for blockchain data visualization and insights",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Dashboard Overview'
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Analytics Interface'
      }
    ],
    icon: "chart",
    categories: ["Web3", "Development", "Data"],
    keyPoints: ["Brand strategy", "Web design", "Content marketing"],
    techStack: ["DuneSQL", "React", "TypeScript", "GraphQL", "Web3.js"],
    problem: "Complex blockchain data was difficult to analyze and visualize for non-technical users",
    solution: "Created an intuitive dashboard with AI-powered query generation and real-time visualizations",
    impact: {
      metrics: [
        { label: "Query Time", before: 120, after: 15 },
        { label: "User Adoption", before: 100, after: 850 },
        { label: "Data Points", before: 1000, after: 5000 }
      ],
      stats: [
        { value: "85%", label: "Reduction in analysis time" },
        { value: "8.5x", label: "Increase in user base" },
        { value: "5x", label: "More data coverage" }
      ]
    },
    url: "https://example.com/dune-wizard"
  },
  {
    id: 2,
    title: "BatchSmarter",
    subtitle: "AI-Powered Logistics Automation",
    description: "Intelligent automation platform for logistics and supply chain operations",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2960&auto=format&fit=crop",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Logistics Dashboard'
      },
      {
        type: 'video',
        url: '/placeholder.svg',
        caption: 'Route Optimization Demo'
      }
    ],
    icon: "rocket",
    categories: ["AI", "Development", "Enterprise"],
    keyPoints: ["AI Strategy", "Data Pipeline", "UX Optimization"],
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    problem: "Manual logistics processes were causing delays and errors in operations",
    solution: "Implemented AI-driven automation for route optimization and resource allocation",
    impact: {
      metrics: [
        { label: "Processing Time", before: 180, after: 30 },
        { label: "Error Rate", before: 15, after: 2 },
        { label: "Cost Savings", before: 1000, after: 4000 }
      ],
      stats: [
        { value: "83%", label: "Faster processing" },
        { value: "87%", label: "Fewer errors" },
        { value: "75%", label: "Cost reduction" }
      ]
    }
  },
  {
    id: 3,
    title: "Web3 GameFi Ops",
    subtitle: "Gaming Community Platform",
    description: "Comprehensive operations platform for Web3 gaming communities",
    image: "https://images.unsplash.com/photo-1511512578047-074b7f938ba0?q=80&w=2871&auto=format&fit=crop",
    media: [
      {
        type: 'gif',
        url: '/placeholder.svg',
        caption: 'Community Dashboard'
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Analytics Overview'
      }
    ],
    icon: "game",
    categories: ["Web3", "Gaming", "Design"],
    keyPoints: ["Community Engagement", "Smart Contracts", "Event Monitoring"],
    techStack: ["Solidity", "React", "Node.js", "MongoDB", "Web3.js"],
    problem: "Scaling gaming communities while maintaining engagement was challenging",
    solution: "Built automated tools for community management and player analytics",
    impact: {
      metrics: [
        { label: "Active Users", before: 10000, after: 80000 },
        { label: "Engagement", before: 20, after: 75 },
        { label: "Revenue", before: 10000, after: 50000 }
      ],
      stats: [
        { value: "8x", label: "Community growth" },
        { value: "275%", label: "Engagement increase" },
        { value: "400%", label: "Revenue growth" }
      ]
    }
  },
  {
    id: 4,
    title: "Art Synergy",
    subtitle: "Gallery Marketing Platform",
    description: "Identity and marketing strategy for an art gallery",
    image: "https://images.unsplash.com/photo-1594797113658-9b5286537d89?q=80&w=2940&auto=format&fit=crop",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Brand Identity'
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Marketing Materials'
      }
    ],
    icon: "chart",
    categories: ["Design", "Arts & Culture", "Marketing"],
    keyPoints: ["Brand strategy", "Web design", "Content marketing"],
    techStack: ["Figma", "Adobe Suite", "WordPress", "SEO", "Content Strategy"],
    problem: "Art gallery struggled with visitor acquisition and sales conversion",
    solution: "Developed comprehensive branding and digital marketing strategy",
    impact: {
      metrics: [
        { label: "Monthly Visitors", before: 500, after: 700 },
        { label: "Sales", before: 10, after: 15 },
        { label: "Online Engagement", before: 200, after: 1200 }
      ],
      stats: [
        { value: "40%", label: "Increased visitors in 6 months" },
        { value: "50%", label: "Increased sales in 1 year" },
        { value: "500%", label: "Increase in online engagement" }
      ]
    }
  },
  {
    id: 5,
    title: "Cine Craft",
    subtitle: "Film Studio Platform",
    description: "Branding and interactive site for film production studio to attract new talents and audiences",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2918&auto=format&fit=crop",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Website Design'
      },
      {
        type: 'video',
        url: '/placeholder.svg',
        caption: 'Interactive Elements'
      }
    ],
    icon: "rocket",
    categories: ["Design", "Arts & Culture", "Development"],
    keyPoints: ["Brand design", "Social media campaigns", "Talent acquisition"],
    techStack: ["React", "Three.js", "GSAP", "Tailwind CSS", "Adobe Suite"],
    problem: "Film studio needed to attract new talents and potential clients",
    solution: "Created immersive website with portfolio showcases and talent submission",
    impact: {
      metrics: [
        { label: "Portfolio Views", before: 300, after: 1200 },
        { label: "Talent Applications", before: 20, after: 85 },
        { label: "Client Inquiries", before: 5, after: 15 }
      ],
      stats: [
        { value: "300%", label: "Increase in portfolio exposure" },
        { value: "325%", label: "More talent applications" },
        { value: "200%", label: "Growth in client inquiries" }
      ]
    }
  },
  {
    id: 6,
    title: "FinTech Dashboard",
    subtitle: "Financial Analytics Platform",
    description: "Comprehensive financial analytics and reporting dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab8277c52f?q=80&w=2815&auto=format&fit=crop",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Dashboard Overview'
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Mobile View'
      }
    ],
    icon: "chart",
    categories: ["Finance", "Development", "Data"],
    keyPoints: ["Data Visualization", "Real-time Analytics", "Custom Reporting"],
    techStack: ["React", "D3.js", "Node.js", "PostgreSQL", "AWS"],
    problem: "Financial institutions struggled with data visualization and client reporting",
    solution: "Built intuitive dashboard with real-time analytics and customizable reports",
    impact: {
      metrics: [
        { label: "Report Generation", before: 60, after: 10 },
        { label: "Data Processing", before: 120, after: 15 },
        { label: "Client Satisfaction", before: 65, after: 92 }
      ],
      stats: [
        { value: "83%", label: "Faster reporting" },
        { value: "87%", label: "Reduction in processing time" },
        { value: "42%", label: "Increase in client satisfaction" }
      ]
    }
  }
];

// Extract unique categories from all projects
const allCategories = Array.from(
  new Set(projects.flatMap(project => project.categories))
).sort();

// Add this new component for the counter animation
const CountUpNumber = ({ end, duration = 500 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4); // Smooth easing function
    
    const animate = timestamp => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      countRef.current = easedProgress * end;
      setCount(countRef.current);
      
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        countRef.current = end;
        setCount(end);
      }
    };
    
    // Reset and start animation
    countRef.current = 0;
    setCount(0);
    animRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [end, duration]);

  // Format the number to match the reference - with decimal point if needed
  const formattedNumber = typeof end === 'number' && end % 1 !== 0
    ? count.toFixed(1)
    : Math.floor(count).toString();
    
  return <span>{formattedNumber}</span>;
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory 
    ? projects.filter(project => project.categories.includes(selectedCategory))
    : projects.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category
    );
  };

  // Scroll carousel functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    
    // Swipe threshold of 50px
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left to right
        scrollRight();
      } else {
        // Swipe right to left
        scrollLeft();
      }
    }
    
    setTouchStartX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollLeft();
      } else if (e.key === 'ArrowRight') {
        scrollRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Layers className="mr-3 folder-icon" size={28} />
            <h1 className="text-4xl font-bold folder-title">/projects</h1>
          </div>
          <p className="mb-12 text-lg text-muted-foreground max-w-3xl">
            Explore my featured projects across various domains, from web development and design to AI and blockchain applications.
          </p>

          {/* Categories Filter */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={`text-sm font-medium transition-all ${selectedCategory === null ? 'shadow-md' : 'border-primary/40 hover:border-primary hover:bg-primary/10'}`}
              >
                All
              </Button>
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category)}
                  className={`text-sm font-medium transition-all ${selectedCategory === category ? 'shadow-md' : 'border-primary/40 hover:border-primary hover:bg-primary/10'}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="relative py-6">
            <div className="absolute left-4 sm:left-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-muted focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            {/* Project Carousel */}
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto pb-8 pt-4 snap-x snap-mandatory hide-scrollbar gap-6 px-4 sm:px-0"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label="Project carousel"
              tabIndex={0}
            >
              {filteredProjects.map((project, index) => {
                const IconComponent = icons[project.icon];

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
                    className="flex-shrink-0 w-[340px] snap-start"
                  >
                    {/* Portrait Card Design inspired by reference image */}
                    <div 
                      className="relative h-[500px] overflow-hidden cursor-pointer group project-card-new hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card dark:bg-[#0c0c14] rounded-xl border border-border/20"
                      onClick={() => setSelectedProject(project)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProject(project);
                        }
                      }}
                      onMouseEnter={() => setHoveredProjectId(project.id)}
                      onMouseLeave={() => setHoveredProjectId(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${project.title}`}
                      style={{
                        willChange: 'transform, box-shadow'
                      }}
                    >
                      {/* Card Content */}
                      <div className="absolute inset-0 p-6 h-full flex flex-col transition-all duration-300">
                        {/* Top Section: Title and Description */}
                        <div className="space-y-2 group-hover:-translate-y-1 transition-transform duration-300">
                          <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h2>
                          <p className="text-muted-foreground text-sm">{project.subtitle}</p>
                          <p className="text-sm text-muted-foreground/90 line-clamp-2 mt-2">{project.description}</p>
                        </div>
                        
                        {/* Middle Section: Background Image Container */}
                        <div className="relative flex-grow my-8">
                          <div className="absolute inset-x-0 h-[240px] top-1/2 -translate-y-1/2 rounded-lg overflow-hidden bg-transparent">
                            {/* Background image with better blending inspired by the reference */}
                            <div 
                              className="absolute inset-0 transition-all duration-500 ease-in-out"
                              style={{
                                backgroundImage: `url(${project.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: hoveredProjectId === project.id ? 0 : 1
                              }}
                            />
                            
                            {/* Dark overlay for better contrast with text in dark mode */}
                            <div 
                              className={`absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity duration-500 ease-in-out ${
                                hoveredProjectId === project.id ? 'opacity-0' : 'opacity-100'
                              }`}
                            />

                            {/* Background match when image disappears */}
                            <div 
                              className={`absolute inset-0 bg-card dark:bg-[#0c0c14] transition-opacity duration-500 ease-in-out ${
                                hoveredProjectId === project.id ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          </div>
                          
                          {/* Key Metrics with absolutely no background */}
                          <div 
                            className="absolute inset-0 flex flex-col justify-center items-center gap-8 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-10"
                            style={{
                              background: 'transparent',
                              backdropFilter: 'none',
                              backgroundColor: 'transparent'
                            }}
                          >
                            {/* First Stat */}
                            <div className="flex flex-col items-center w-full max-w-[280px] text-center">
                              <div className="flex items-baseline justify-center w-full">
                                <span className="text-6xl md:text-7xl font-bold text-[#6d4f32] dark:text-[#d4a76a] tabular-nums">
                                  {hoveredProjectId === project.id && (
                                    <CountUpNumber 
                                      key={`${project.id}-counter1-${hoveredProjectId === project.id}`} 
                                      end={parseInt(project.impact.stats[0].value.replace('%', ''))} 
                                    />
                                  )}
                                  {hoveredProjectId !== project.id && "0"}
                                </span>
                                <span className="text-3xl font-bold text-[#6d4f32] dark:text-[#d4a76a] ml-1">%</span>
                              </div>
                              <span className="text-sm text-center font-medium text-[#6d4f32] dark:text-[#d4a76a] mt-1">{project.impact.stats[0].label}</span>
                            </div>
                            
                            {/* Second Stat */}
                            <div className="flex flex-col items-center w-full max-w-[280px] text-center">
                              <div className="flex items-baseline justify-center w-full">
                                <span className="text-6xl md:text-7xl font-bold text-[#6d4f32] dark:text-[#d4a76a] tabular-nums">
                                  {hoveredProjectId === project.id && (
                                    <CountUpNumber 
                                      key={`${project.id}-counter2-${hoveredProjectId === project.id}`} 
                                      end={parseFloat(project.impact.stats[1].value.replace('x', ''))} 
                                    />
                                  )}
                                  {hoveredProjectId !== project.id && "0"}
                                </span>
                                <span className="text-3xl font-bold text-[#6d4f32] dark:text-[#d4a76a] ml-1">x</span>
                              </div>
                              <span className="text-sm text-center font-medium text-[#6d4f32] dark:text-[#d4a76a] mt-1">{project.impact.stats[1].label}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Section: Categories */}
                        <div className="flex flex-wrap gap-2 mt-auto group-hover:opacity-90 transition-opacity duration-300">
                          {project.categories.slice(0, 2).map((category, i) => (
                            <Badge key={`cat-${i}`} variant="secondary" className="text-xs bg-secondary/80 hover:bg-secondary">
                              {category}
                            </Badge>
                          ))}
                          {project.categories.length > 2 && (
                            <Badge variant="outline" className="text-xs hover:bg-muted transition-colors">+{project.categories.length - 2} more</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="absolute right-4 sm:right-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-muted focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project Details Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
            {selectedProject && (
              <ScrollArea className="h-[90vh] w-full">
                <div className="flex flex-col">
                  {/* Top Media Section */}
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-black/5 dark:bg-black/30">
                    {/* Main Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${selectedProject.image})` }}
                    />
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                      {/* Title Area */}
                      <div className="text-white w-full">
                        <div className="flex justify-between items-start w-full">
                          <div>
                            <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                            <p className="text-white/80">{selectedProject.subtitle}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
                            onClick={() => setSelectedProject(null)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedProject.categories.map((category, i) => (
                            <Badge key={`detail-cat-${i}`} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Media Gallery Thumbnails if available */}
                  {selectedProject.media && selectedProject.media.length > 0 && (
                    <div className="p-4 border-b border-border/30 bg-card/50">
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        {selectedProject.media.map((media, i) => (
                          <div 
                            key={i} 
                            className="w-24 h-16 flex-shrink-0 rounded-md overflow-hidden border border-border/30 cursor-pointer hover:border-primary/60 transition-all"
                          >
                            <img src={media.url} alt={media.caption} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 space-y-8 bg-card">
                    {/* Overview */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">Overview</h3>
                        <div className="h-px flex-grow bg-border"></div>
                      </div>
                      <p className="text-muted-foreground">{selectedProject.description}</p>
                      {selectedProject.fullDescription && (
                        <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
                      )}
                    </div>
                    
                    {/* Problem & Solution */}
                    {(selectedProject.problem || selectedProject.solution) && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">Challenge & Approach</h3>
                          <div className="h-px flex-grow bg-border"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedProject.problem && (
                            <div className="space-y-2">
                              <h4 className="text-base font-medium">The Challenge</h4>
                              <p className="text-muted-foreground">{selectedProject.problem}</p>
                            </div>
                          )}
                          
                          {selectedProject.solution && (
                            <div className="space-y-2">
                              <h4 className="text-base font-medium">My Approach</h4>
                              <p className="text-muted-foreground">{selectedProject.solution}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Key Features */}
                    {selectedProject.keyPoints && selectedProject.keyPoints.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">Key Features</h3>
                          <div className="h-px flex-grow bg-border"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedProject.keyPoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="mt-1 text-primary">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <p className="text-sm">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Impact & Results */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">Impact & Results</h3>
                        <div className="h-px flex-grow bg-border"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.impact.stats.map((stat, i) => (
                          <div key={`stat-${i}`} className="bg-muted/30 p-4 rounded-lg border border-border/50">
                            <div className="text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground">{selectedProject.impact.description}</p>
                    </div>
                    
                    {/* My Contribution */}
                    {selectedProject.contribution && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">My Contribution</h3>
                          <div className="h-px flex-grow bg-border"></div>
                        </div>
                        <p className="text-muted-foreground">{selectedProject.contribution}</p>
                      </div>
                    )}
                    
                    {/* Technologies */}
                    {(selectedProject.technologies || selectedProject.techStack) && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">Technologies Used</h3>
                          <div className="h-px flex-grow bg-border"></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject.technologies || selectedProject.techStack || []).map((tech, i) => (
                            <Badge key={`tech-${i}`} variant="outline" className="bg-muted/30">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Links & Resources */}
                    {(selectedProject.links || selectedProject.url) && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">Links & Resources</h3>
                          <div className="h-px flex-grow bg-border"></div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.url && (
                            <Button variant="default" asChild>
                              <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                Visit Project
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          
                          {selectedProject.links && selectedProject.links.map((link, i) => (
                            <Button key={`link-${i}`} variant="outline" asChild>
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                {link.text}
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Project Timeline */}
                    {selectedProject.timeline && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">Project Timeline</h3>
                          <div className="h-px flex-grow bg-border"></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Duration:</span> {selectedProject.timeline.duration}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Completed:</span> {selectedProject.timeline.completed}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
