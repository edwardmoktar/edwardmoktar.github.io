
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Database, 
  Award, 
  TrendingUp,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface SkillPhase {
  id: number;
  title: string;
  period: string;
  icon: keyof typeof icons;
  technologies: string[];
  applications: string[];
  description: string;
}

interface SkillBadge {
  id: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: keyof typeof icons;
  description: string;
  projects: string;
  certification?: string;
}

const icons = {
  brain: Brain,
  code: Code,
  database: Database,
  award: Award,
  trending: TrendingUp,
  graduation: GraduationCap,
};

const skillPhases: SkillPhase[] = [
  {
    id: 1,
    title: "Early Career: Marketing & Data",
    period: "2018-2020",
    icon: "trending",
    technologies: ["Google Analytics", "Meta Ads", "ClickUp", "SQL (Basic)"],
    applications: ["Data-driven influencer marketing", "Ad campaign automation", "Performance tracking"],
    description: "Started with digital marketing, focusing on data-driven decision making and basic automation"
  },
  {
    id: 2,
    title: "Innovation & AI",
    period: "2020-2022",
    icon: "brain",
    technologies: ["Python", "SQL (Advanced)", "DuneSQL", "GraphQL", "AI Prompt Engineering"],
    applications: ["Workflow automation", "Data pipeline construction", "AI model implementation"],
    description: "Evolved into AI and automation, building sophisticated data processing systems"
  },
  {
    id: 3,
    title: "Web3 & Blockchain",
    period: "2022-Present",
    icon: "code",
    technologies: ["Smart Contracts", "Web3.js", "Supabase", "API Integrations"],
    applications: ["Web3 analytics dashboards", "GameFi tools", "Blockchain data analysis"],
    description: "Specialized in Web3 technologies, focusing on GameFi and blockchain analytics"
  }
];

const skillBadges: SkillBadge[] = [
  {
    id: 1,
    title: "Python Development",
    level: "Advanced",
    icon: "code",
    description: "Used for automation, data processing, and AI-driven workflows",
    projects: "BatchSmarter, Data Pipeline Automation",
    certification: "HackerRank Python (Advanced)"
  },
  {
    id: 2,
    title: "Blockchain Analytics",
    level: "Expert",
    icon: "database",
    description: "Created Web3 analytics dashboards for DeFi, GameFi, and NFT projects",
    projects: "Dune Wizard, GameFi Analytics",
    certification: "Dune Analytics Expert"
  },
  {
    id: 3,
    title: "Process Optimization",
    level: "Advanced",
    icon: "award",
    description: "Led projects that saved 960+ hours/month in workflow automation",
    projects: "Operations Automation, Workflow Optimization",
    certification: "Lean Six Sigma Greenbelt"
  }
];

const levelColors = {
  Beginner: "bg-blue-500",
  Intermediate: "bg-green-500",
  Advanced: "bg-purple-500",
  Expert: "bg-orange-500"
};

export default function Skills() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 fade-in">Skills & Expertise</h1>
          
          <div className="mb-12">
            <Card className="bg-accent/5 p-6">
              <p className="text-lg text-muted-foreground italic">
                "I believe AI & blockchain will fundamentally change how we interact with digital systems. 
                My goal is to build scalable, interoperable solutions that enhance efficiency and user experience."
              </p>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Tech Stack Journey</h2>
          <div className="space-y-6">
            {skillPhases.map((phase, index) => {
              const IconComponent = icons[phase.icon];
              const isSelected = selectedPhase === phase.id;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-lg ${
                    isSelected ? 'bg-accent/10' : 'hover:bg-accent/5'
                  } transition-colors cursor-pointer`}
                  onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{phase.title}</h3>
                        <span className="text-sm text-muted-foreground">{phase.period}</span>
                      </div>
                      <p className="mt-2 text-muted-foreground">{phase.description}</p>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-4"
                        >
                          <div>
                            <h4 className="font-semibold mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Applications</h4>
                            <ul className="space-y-2">
                              {phase.applications.map((app, i) => (
                                <li key={i} className="flex items-center">
                                  <ChevronRight className="w-4 h-4 text-primary mr-2" />
                                  {app}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-6 mt-12">Skill Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillBadges.map((badge, index) => {
              const IconComponent = icons[badge.icon];
              
              return (
                <HoverCard key={badge.id}>
                  <HoverCardTrigger>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{badge.title}</h3>
                              <Badge variant="outline" className={`mt-1`}>
                                {badge.level}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <p className="text-sm">{badge.description}</p>
                      <div className="pt-2">
                        <div className="text-sm text-muted-foreground">
                          <strong>Projects:</strong> {badge.projects}
                        </div>
                        {badge.certification && (
                          <div className="text-sm text-muted-foreground">
                            <strong>Certification:</strong> {badge.certification}
                          </div>
                        )}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
