import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, Book, Heart, Briefcase, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  behindTheScenes?: string;
  keyLearnings?: string[];
  relatedProjects?: string[];
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
      title: "Professional Journey",
      content: "A decade of innovation and leadership in tech",
      x: 15,
      y: 30,
      sectionId: "professional"
    },
    {
      id: 2,
      title: "Academic Foundation",
      content: "Where curiosity meets technology",
      x: 50,
      y: 70,
      sectionId: "education"
    },
    {
      id: 3,
      title: "Community Impact",
      content: "Giving back through meaningful contributions",
      x: 85,
      y: 30,
      sectionId: "volunteering"
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
      ],
      behindTheScenes: "Scaling Web3 gaming communities requires a delicate balance between automation and personal touch",
      keyLearnings: [
        "Blockchain data analysis for player behavior",
        "Community-driven product development",
        "Smart contract optimization"
      ],
      relatedProjects: ["Web3 GameFi Ops"]
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
    const width = 300;
    const amplitude = 20;
    const points = [];
    
    for (let x = 0; x <= width; x++) {
      const progress = x / width;
      const y = amplitude * Math.sin(progress * Math.PI * 2) + 50;
      points.push(`${x},${y}`);
    }
    
    return `M 0,50 ${points.map((point, i) => `L ${point}`).join(' ')}`;
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
      <div className="min-h-screen bg-background transition-all duration-1000">
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

          <div className="flex gap-4 justify-center mt-12 mb-24 flex-wrap">
            {timelineNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => scrollToSection(node.sectionId)}
                className={cn(
                  "px-6 py-3 rounded-lg transition-all",
                  theme === 'dark' 
                    ? 'bg-[#2A2D3A] hover:bg-[#3A3F4B]' 
                    : 'bg-white/80 hover:bg-white/90',
                  "flex flex-col items-center gap-2"
                )}
              >
                <span className="font-semibold">{node.title}</span>
                <span className="text-sm text-muted-foreground">{node.content}</span>
              </button>
            ))}
          </div>

          <div className="mt-32 space-y-24">
            <section id="professional" className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Professional Experience</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Collapsible key={index}>
                    <div
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                      
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-center mt-4 text-muted-foreground hover:text-foreground transition-colors">
                          <span className="mr-2">Show more</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="mt-6 space-y-6 pt-4 border-t border-border">
                          {exp.behindTheScenes && (
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Behind the Scenes</h4>
                              <p className="text-muted-foreground">{exp.behindTheScenes}</p>
                            </div>
                          )}

                          {exp.keyLearnings && (
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Key Learnings</h4>
                              <ul className="space-y-2">
                                {exp.keyLearnings.map((learning, idx) => (
                                  <li key={idx} className="text-muted-foreground flex items-start">
                                    <span className="text-primary mr-2">›</span>
                                    {learning}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {exp.relatedProjects && (
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Related Projects</h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.relatedProjects.map((project, idx) => (
                                  <span
                                    key={idx}
                                    className={cn(
                                      "px-3 py-1 rounded-full text-sm",
                                      theme === 'dark'
                                        ? 'bg-[#1A1F2C] text-muted-foreground'
                                        : 'bg-white/50 text-muted-foreground'
                                    )}
                                  >
                                    {project}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}
              </div>
            </section>

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
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={cn(
                    "p-4 rounded-md",
                    theme === 'dark' ? 'bg-[#1A1F2C]' : 'bg-white/50'
                  )}>
                    <div className="font-semibold text-lg">3.9</div>
                    <div className="text-sm text-muted-foreground">GPA</div>
                  </div>
                  <div className={cn(
                    "p-4 rounded-md",
                    theme === 'dark' ? 'bg-[#1A1F2C]' : 'bg-white/50'
                  )}>
                    <div className="font-semibold text-lg">15+</div>
                    <div className="text-sm text-muted-foreground">Research Projects</div>
                  </div>
                  <div className={cn(
                    "p-4 rounded-md",
                    theme === 'dark' ? 'bg-[#1A1F2C]' : 'bg-white/50'
                  )}>
                    <div className="font-semibold text-lg">3</div>
                    <div className="text-sm text-muted-foreground">Published Papers</div>
                  </div>
                </div>
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
                <p className="text-muted-foreground mb-6">Contributing to various open-source projects and mentoring new developers</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={cn(
                    "p-4 rounded-md",
                    theme === 'dark' ? 'bg-[#1A1F2C]' : 'bg-white/50'
                  )}>
                    <div className="font-semibold text-lg">50+</div>
                    <div className="text-sm text-muted-foreground">Projects Contributed</div>
                  </div>
                  <div className={cn(
                    "p-4 rounded-md",
                    theme === 'dark' ? 'bg-[#1A1F2C]' : 'bg-white/50'
                  )}>
                    <div className="font-semibold text-lg">100+</div>
                    <div className="text-sm text-muted-foreground">Pull Requests</div>
                  </div>
                  <div className={cn(
                    "p-4 rounded-md",
                    theme === 'dark' ? 'bg-[#1A1F2C]' : 'bg-white/50'
                  )}>
                    <div className="font-semibold text-lg">25+</div>
                    <div className="text-sm text-muted-foreground">Mentees Guided</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
