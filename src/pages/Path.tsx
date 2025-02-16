import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Briefcase, ChevronRight, Award, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface TimelineNode {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  x: number;
  y: number;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: {
    icon: keyof typeof icons;
    metric: string;
    description: string;
  }[];
  insights: string;
  learnings: string[];
  relatedProjects?: {
    name: string;
    link: string;
  }[];
}

const icons = {
  clock: Clock,
  award: Award,
  users: Users,
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Product Operations",
    company: "Web3 Gaming Studio",
    period: "2022 - Present",
    description: "Leading product operations and automation initiatives for Web3 gaming platforms",
    achievements: [
      {
        icon: "clock",
        metric: "960+ hours",
        description: "Monthly workflow automation"
      },
      {
        icon: "users",
        metric: "80,000+",
        description: "Active community members"
      },
      {
        icon: "award",
        metric: "$1.7+",
        description: "NFT Assets Managed"
      }
    ],
    insights: "Scaling Web3 gaming communities requires a delicate balance between automation and personal touch",
    learnings: [
      "Blockchain data analysis for player behavior",
      "Community-driven product development",
      "Smart contract optimization"
    ],
    relatedProjects: [
      {
        name: "Web3 GameFi Ops",
        link: "/projects/gamefi-ops"
      }
    ]
  },
  // ... keep existing code (other experience objects)
];

export default function Path() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<number | null>(null);
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
      <div className="min-h-screen">
        {/* Timeline Section */}
        <div className="min-h-screen bg-[#FEF7CD]/20">
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

        {/* Experience Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const isSelected = selectedId === exp.id;
                const IconComponent = Briefcase;

                return (
                  <motion.div
                    key={exp.id}
                    className={`relative p-6 rounded-lg ${
                      isSelected ? 'bg-accent/10' : 'hover:bg-accent/5'
                    } transition-colors cursor-pointer`}
                    onClick={() => setSelectedId(isSelected ? null : exp.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <span className="text-sm text-muted-foreground">{exp.period}</span>
                        </div>
                        <p className="text-muted-foreground mt-1">{exp.company}</p>
                        <p className="mt-2">{exp.description}</p>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {exp.achievements.map((achievement, i) => {
                            const AchievementIcon = icons[achievement.icon];
                            return (
                              <HoverCard key={i}>
                                <HoverCardTrigger>
                                  <div className="flex items-center space-x-2 p-3 rounded-md bg-background hover:bg-accent/5 transition-colors">
                                    <AchievementIcon className="w-5 h-5 text-primary" />
                                    <div>
                                      <div className="font-semibold">{achievement.metric}</div>
                                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                                    </div>
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                  <div className="text-sm">
                                    Learn more about this achievement and its impact
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            );
                          })}
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 space-y-4"
                          >
                            <div>
                              <h4 className="font-semibold mb-2">Behind the Scenes</h4>
                              <p className="text-muted-foreground">{exp.insights}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Key Learnings</h4>
                              <ul className="space-y-2">
                                {exp.learnings.map((learning, i) => (
                                  <li key={i} className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-primary mr-2" />
                                    {learning}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {exp.relatedProjects && (
                              <div>
                                <h4 className="font-semibold mb-2">Related Projects</h4>
                                <div className="flex gap-2">
                                  {exp.relatedProjects.map((project, i) => (
                                    <Link key={i} to={project.link}>
                                      <Badge variant="secondary" className="hover-lift">
                                        {project.name}
                                      </Badge>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
