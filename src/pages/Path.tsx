
import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun } from 'lucide-react';

interface TimelineNode {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  x: number;
  y: number;
}

export default function Path() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const timelineNodes: TimelineNode[] = [
    {
      id: 1,
      title: "Alumet Edu Conference",
      subtitle: "Clemenceau",
      year: "2023",
      image: "/lovable-uploads/36c94fc0-25f4-43e4-b565-9d1854d60b81.png",
      x: 20,
      y: 30
    },
    {
      id: 2,
      title: "Product Design Lead",
      subtitle: "Discord",
      year: "2022",
      image: "/placeholder.svg",
      x: 50,
      y: 60
    },
    {
      id: 3,
      title: "UI/UX Designer",
      subtitle: "Tranga",
      year: "2021",
      image: "/placeholder.svg",
      x: 80,
      y: 30
    },
  ];

  const pathAnimation = {
    strokeDasharray: 1000,
    strokeDashoffset: useTransform(scrollYProgress, [0, 1], [1000, 0])
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
      <div className="min-h-screen bg-[#FEF7CD]/20">
        {/* Desert-like pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        
        <div className="container mx-auto px-6 pt-12">
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

          {/* Timeline Section */}
          <div 
            ref={pathRef}
            className="relative mt-24 h-[600px] overflow-hidden"
          >
            {/* Curve Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,30 Q25,60 50,60 T100,30"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                style={pathAnimation}
                whileHover={{
                  d: "M0,30 Q25,65 50,60 T100,30",
                  transition: { duration: 0.8 }
                }}
              />
            </svg>

            {/* Timeline Nodes */}
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
                  <div className="w-4 h-4 rounded-full bg-primary cursor-pointer relative z-10">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  </div>

                  {/* Node Content */}
                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 bg-card p-4 rounded-lg shadow-lg w-64"
                    >
                      <img
                        src={node.image}
                        alt={node.title}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h3 className="font-semibold text-lg">{node.title}</h3>
                      <p className="text-sm text-muted-foreground">{node.subtitle} - {node.year}</p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}

            {/* Cursor Sun Effect */}
            <motion.div
              className="pointer-events-none absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ type: "spring", damping: 30 }}
            >
              <Sun className="w-full h-full text-primary opacity-50" />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
