
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BarChart2, Rocket, Gamepad2, Award } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof icons;
  techStack: string[];
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
}

const icons = {
  chart: BarChart2,
  rocket: Rocket,
  game: Gamepad2,
};

const projects: Project[] = [
  {
    id: 1,
    title: "Dune Wizard",
    subtitle: "Web3 Analytics Dashboard",
    description: "Advanced analytics platform for blockchain data visualization and insights",
    icon: "chart",
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
    }
  },
  {
    id: 2,
    title: "BatchSmarter",
    subtitle: "AI-Powered Logistics Automation",
    description: "Intelligent automation platform for logistics and supply chain operations",
    icon: "rocket",
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
    icon: "game",
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
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 fade-in">Case Studies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const IconComponent = icons[project.icon];
            const isExpanded = expandedId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`h-full hover:shadow-lg transition-all cursor-pointer ${
                    isExpanded ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-semibold">{project.title}</h2>
                        <p className="text-muted-foreground">{project.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 mt-4"
                      >
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold">The Challenge</h3>
                            <p className="text-muted-foreground">{project.problem}</p>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold">The Solution</h3>
                            <p className="text-muted-foreground">{project.solution}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-4">Impact & Results</h3>
                          <div className="h-[200px] mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={project.impact.metrics}>
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="before" fill="#94a3b8" name="Before" />
                                <Bar dataKey="after" fill="hsl(var(--primary))" name="After" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {project.impact.stats.map((stat, i) => (
                              <HoverCard key={i}>
                                <HoverCardTrigger>
                                  <div className="p-4 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
                                    <div className="text-2xl font-bold text-primary">
                                      {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {stat.label}
                                    </div>
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                  <div className="text-sm">
                                    Click to learn more about this metric
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
