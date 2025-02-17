import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, Book, Heart, Briefcase } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface TimelineNode {
  id: number;
  title: string;
  content: string;
  x: number;
  y: number;
  sectionId: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
}

export default function Path() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pathRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  const timelineNodes: TimelineNode[] = [
    {
      id: 1,
      title: "???",
      content: "Coming soon",
      x: 15,
      y: 30,
      sectionId: "education"
    },
    {
      id: 2,
      title: "???",
      content: "Coming soon",
      x: 50,
      y: 70,
      sectionId: "volunteering"
    },
    {
      id: 3,
      title: "???",
      content: "Coming soon",
      x: 85,
      y: 30,
      sectionId: "professional"
    },
  ];

  const experiences: Experience[] = [
    {
      title: "Senior Product Operations",
      company: "Web3 Gaming Studio",
      period: "2022 - Present",
      description: "Leading product operations and automation initiatives for Web3 gaming platforms",
      metrics: [
        {
          value: "960+ hours",
          label: "Monthly workflow automation"
        },
        {
          value: "80,000+",
          label: "Active community members"
        },
        {
          value: "$1.7+",
          label: "NFT Assets Managed"
        }
      ]
    },
    {
      title: "Project Manager",
      company: "Tech Consultancy",
      period: "2020 - 2022",
      description: "Developed and implemented AI-powered solutions for enterprise clients",
      metrics: [
        {
          value: "500+",
          label: "Process automations deployed"
        },
        {
          value: "25+",
          label: "Enterprise clients served"
        }
      ]
    },
    {
      title: "Digital Marketing Associate",
      company: "Marketing Agency",
      period: "2018 - 2020",
      description: "Led data-driven marketing campaigns and automation initiatives",
      metrics: [
        {
          value: "300%",
          label: "Increase in campaign ROI"
        },
        {
          value: "1M+",
          label: "Audience reach"
        }
      ]
    }
  ];

  const generatePath = () => {
    return "M 0,30 C 50,30 50,70 100,70 S 150,30 200,30";
  };

  const pathAnimation = {
    strokeDasharray: 1000,
    strokeDashoffset: useTransform(scrollYProgress, [0, 0.5], [1000, 0])
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
        "min-h-screen transition-all duration-1000",
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[#1A1F2C] to-[#221F26]' 
          : 'bg-gradient-to-b from-[#FEF7CD] to-[#FEC6A1]'
      )}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={cn(
              "absolute w-64 h-64 rounded-full blur-3xl",
              theme === 'dark' 
                ? 'bg-white opacity-20' 
                : 'bg-[#F97316] opacity-30'
            )}
            style={{
              top: '10%',
              right: '10%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: theme === 'dark' ? [0.2, 0.3, 0.2] : [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {theme === 'dark' && (
            <div className="absolute inset-0">
              <div className="stars opacity-40" />
            </div>
          )}
        </div>

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

          <div 
            ref={containerRef}
            className="relative mt-24 overflow-x-auto"
            style={{ width: '100%', height: '600px' }}
          >
            <div
              ref={pathRef}
              className="relative h-full"
              style={{ width: '200%' }}
            >
              <svg
                className="absolute inset-0 h-full"
                style={{ width: '200%' }}
                preserveAspectRatio="none"
              >
                <motion.path
                  d={generatePath()}
                  fill="none"
                  stroke={theme === 'dark' ? "#8E9196" : "hsl(var(--primary))"}
                  strokeWidth="2"
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
                    onClick={() => scrollToSection(node.sectionId)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary cursor-pointer relative z-10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>

                    {hoveredNode === node.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg w-64",
                          theme === 'dark' 
                            ? 'bg-[#2A2D3A]/90 backdrop-blur-md border border-[#8E9196]/20' 
                            : 'bg-white/80 backdrop-blur-md'
                        )}
                      >
                        <h3 className="font-semibold text-lg mb-2">{node.title}</h3>
                        <p className="text-sm text-muted-foreground">{node.content}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-32 space-y-24">
            <section id="education" className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Education</h2>
              <div className={cn(
                "p-6 rounded-lg",
                theme === 'dark' 
                  ? 'bg-[#2A2D3A] border border-[#3A3F4B]' 
                  : 'bg-white/80 backdrop-blur-md'
              )}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Computer Science</h3>
                    <p className="text-muted-foreground">University of Technology</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2016 - 2020</span>
                </div>
                <p className="text-muted-foreground">Specialized in AI and Machine Learning</p>
              </div>
            </section>

            <section id="volunteering" className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Volunteering</h2>
              <div className={cn(
                "p-6 rounded-lg",
                theme === 'dark' 
                  ? 'bg-[#2A2D3A] border border-[#3A3F4B]' 
                  : 'bg-white/80 backdrop-blur-md'
              )}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Open Source Contributor</h3>
                    <p className="text-muted-foreground">Various Projects</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2019 - Present</span>
                </div>
                <p className="text-muted-foreground">Contributing to various open-source projects and mentoring new developers</p>
              </div>
            </section>

            <section id="professional" className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Professional Experience</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-6 rounded-lg",
                      theme === 'dark' 
                        ? 'bg-[#2A2D3A] border border-[#3A3F4B]' 
                        : 'bg-white/80 backdrop-blur-md'
                    )}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{exp.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {exp.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "p-4 rounded-md",
                            theme === 'dark'
                              ? 'bg-[#1A1F2C]'
                              : 'bg-white/50'
                          )}
                        >
                          <div className="font-semibold text-lg">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
