
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Award, Users, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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
  {
    id: 2,
    title: "Project Manager",
    company: "Tech Consultancy",
    period: "2020 - 2022",
    description: "Developed and implemented AI-powered solutions for enterprise clients",
    achievements: [
      {
        icon: "clock",
        metric: "500+",
        description: "Process automations deployed"
      },
      {
        icon: "users",
        metric: "25+",
        description: "Enterprise clients served"
      }
    ],
    insights: "AI adoption requires both technical excellence and change management",
    learnings: [
      "Large-scale system integration",
      "AI/ML implementation strategies",
      "Cross-functional team leadership"
    ],
    relatedProjects: [
      {
        name: "BatchSmarter",
        link: "/projects/batchsmarter"
      }
    ]
  },
  {
    id: 3,
    title: "Digital Marketing Associate",
    company: "Marketing Agency",
    period: "2018 - 2020",
    description: "Led data-driven marketing campaigns and automation initiatives",
    achievements: [
      {
        icon: "award",
        metric: "300%",
        description: "Increase in campaign ROI"
      },
      {
        icon: "users",
        metric: "1M+",
        description: "Audience reach"
      }
    ],
    insights: "Data-driven decision making is crucial for marketing success",
    learnings: [
      "Analytics and data visualization",
      "Marketing automation",
      "SQL and database management"
    ]
  }
];

export default function Experience() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 fade-in">Career Journey</h1>
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
    </Layout>
  );
}
