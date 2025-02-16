import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, Book, Heart, Briefcase } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface TimelineNode {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  icon: any;
  image: string;
  x: number;
  y: number;
}

export default function Path() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  const timelineNodes: TimelineNode[] = [
    {
      id: 1,
      title: "Education",
      subtitle: "Computer Science",
      year: "2019",
      description: "Started my journey in technology and design",
      icon: Book,
      image: "/lovable-uploads/36c94fc0-25f4-43e4-b565-9d1854d60b81.png",
      x: 20,
      y: 30
    },
    {
      id: 2,
      title: "Volunteering",
      subtitle: "Community Projects",
      year: "2021",
      description: "Contributing to open source and local initiatives",
      icon: Heart,
      image: "/placeholder.svg",
      x: 50,
      y: 70
    },
    {
      id: 3,
      title: "Professional Experience",
      subtitle: "Product Design",
      year: "2023",
      description: "Leading design projects and teams",
      icon: Briefcase,
      image: "/placeholder.svg",
      x: 80,
      y: 30
    },
  ];

  const pathPoints = Array.from({ length: 100 }, (_, i) => {
    const x = i;
    const y = Math.sin((i / 100) * Math.PI * 2) * 20 + 50;
    return `${x},${y}`;
  }).join(' L ');

  const pathAnimation = {
    strokeDasharray: 1000,
    strokeDashoffset: useTransform(scrollYProgress, [0, 0.5], [1000, 0])
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pathRef.current) {
        const rect = pathRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout>
      <div className={cn(
        "min-h-screen transition-colors duration-1000",
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[#1A1F2C] to-[#221F26]' 
          : 'bg-gradient-to-b from-[#FEF7CD] to-[#FEC6A1]'
      )}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={cn(
              "absolute w-64 h-64 rounded-full blur-3xl opacity-20",
              theme === 'dark' ? 'bg-white' : 'bg-[#F97316]'
            )}
            style={{
              top: '10%',
              right: '10%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 Q25,20 50,10 T100,10' stroke='%23000' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 20px',
              backgroundRepeat: 'repeat'
            }}
          />
        </div>

        <div className="container mx-auto px-6 pt-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-2xl space-y-4"
          >
            <h1 className="text-5xl font-bold">My Path</h1>
            <p className="text-lg text-muted-foreground">
              Discover my professional path and experiences.
            </p>
          </motion.div>

          <div 
            ref={pathRef}
            className="relative mt-24 h-[600px] overflow-hidden"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d={`M 0,50 L ${pathPoints}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                style={pathAnimation}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {timelineNodes.map((node) => (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: node.id * 0.2 }}
              >
                <motion.div
                  className="relative"
                  onHoverStart={() => setHoveredNode(node.id)}
                  onHoverEnd={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-primary cursor-pointer relative z-10">
                      <AnimatePresence>
                        {hoveredNode === node.id && (
                          <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full"
                            initial={{ scale: 1 }}
                            animate={{ scale: 4 }}
                            exit={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 bg-primary/20 rounded-full"
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>

                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg w-64",
                        theme === 'dark' 
                          ? 'bg-[#403E43]/80 backdrop-blur-md' 
                          : 'bg-white/80 backdrop-blur-md'
                      )}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <node.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">{node.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{node.subtitle} - {node.year}</p>
                      <p className="text-sm">{node.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              className="pointer-events-none absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
                rotate: theme === 'dark' ? 0 : 360,
              }}
              transition={{
                x: { type: "spring", damping: 30 },
                y: { type: "spring", damping: 30 },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            >
              {theme === 'dark' ? (
                <Moon className="w-full h-full text-white opacity-50" />
              ) : (
                <Sun className="w-full h-full text-primary opacity-50" />
              )}
              <div className={cn(
                "absolute inset-0 rounded-full blur-xl",
                theme === 'dark' ? 'bg-white/10' : 'bg-primary/10'
              )} />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
