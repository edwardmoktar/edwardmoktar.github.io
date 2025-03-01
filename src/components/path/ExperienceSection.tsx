import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronRight, Award, Lightbulb, Link, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Counter from '@/components/common/Counter';

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  metrics?: {
    value: string;
    label: string;
  }[];
  behindTheScenes?: string;
  keyLearnings?: string[];
  relatedProjects?: string[];
  link?: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const { theme } = useTheme();
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Dark mode metric card styles
  const getMetricCardStyle = () => {
    if (theme === 'dark') {
      return {
        className: "card-highlight dark-mode-metric",
        style: {
          backgroundColor: '#F8FAFC1A',
          boxShadow: 'none',
          filter: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(240, 192, 64, 0.3)'
        },
        valueClassName: "text-lg font-bold text-gold",
        valueStyle: { color: '#f0c040' }
      };
    }
    
    return {
      className: "card-highlight",
      style: {},
      valueClassName: "text-lg font-bold text-primary",
      valueStyle: {}
    };
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => {
        const isExpanded = expandedCards[index] || false;
        const metricCardStyle = getMetricCardStyle();
        
        return (
          <motion.div 
            key={index}
            className="folder-card expandable-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            onClick={() => toggleCard(index)}
            whileHover={{ 
              y: -4,
              boxShadow: theme === 'dark' 
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            transition={{ 
              y: { type: "spring", stiffness: 300, damping: 20 },
              boxShadow: { duration: 0.2 }
            }}
          >
            <div className="folder-card-header">
              <div>
                <h3 className="folder-card-title">{exp.title}</h3>
                <p className="folder-card-subtitle">
                  {exp.company} • {exp.period}
                </p>
              </div>
              <div className="flex items-center">
                {exp.link && (
                  <a 
                    href={exp.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mr-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <ChevronDown 
                  className="transition-transform duration-300" 
                  style={{ 
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    width: '18px',
                    height: '18px',
                    opacity: 0.7
                  }} 
                />
              </div>
            </div>
            
            {/* Brief description always visible */}
            <p className="folder-card-content line-clamp-2 mb-3">
              {exp.description}
            </p>
            
            {/* Metrics displayed in unexpanded card */}
            {exp.metrics && exp.metrics.length > 0 && (
              <div className="flex flex-wrap mt-4 mx-[-0.25rem]">
                {exp.metrics.map((metric, idx) => (
                  <div 
                    key={idx} 
                    className={metricCardStyle.className}
                    style={metricCardStyle.style}
                  >
                    <span 
                      className={metricCardStyle.valueClassName}
                      style={metricCardStyle.valueStyle}
                    >
                      <Counter end={metric.value} />
                    </span>
                    <span className="text-xs text-muted-foreground block">{metric.label}</span>
                  </div>
                ))}
                {/* Add placeholder third metric if needed */}
                {exp.metrics.length === 2 && (
                  <div 
                    className={metricCardStyle.className}
                    style={metricCardStyle.style}
                  >
                    <span 
                      className={metricCardStyle.valueClassName}
                      style={metricCardStyle.valueStyle}
                    >
                      100%
                    </span>
                    <span className="text-xs text-muted-foreground block">Satisfaction rate</span>
                  </div>
                )}
                {/* Add empty placeholders to maintain the grid if needed after adding third placeholder */}
                {exp.metrics.length === 1 && Array.from({ length: 2 }).map((_, i) => (
                  <div 
                    key={`placeholder-${i}`} 
                    className={metricCardStyle.className}
                    style={metricCardStyle.style}
                  >
                    <span 
                      className={metricCardStyle.valueClassName}
                      style={metricCardStyle.valueStyle}
                    >
                      {i === 0 ? "100%" : "5+"}
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      {i === 0 ? "Satisfaction rate" : "Years experience"}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Expandable content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="expandable-card-content mt-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Full description */}
                  <p className="folder-card-content mb-4">
                    {exp.description}
                  </p>
                  
                  {/* Behind the Scenes */}
                  {exp.behindTheScenes && (
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <Award className="h-5 w-5 folder-icon" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 section-title">Behind the Scenes</h4>
                        <p className="text-muted-foreground">{exp.behindTheScenes}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Key Learnings */}
                  {exp.keyLearnings && (
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <Lightbulb className="h-5 w-5 folder-icon" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 section-title">Key Learnings</h4>
                        <ul className="space-y-2">
                          {exp.keyLearnings.map((learning, idx) => (
                            <li key={idx} className="text-muted-foreground flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 folder-icon" />
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Related Projects */}
                  {exp.relatedProjects && (
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <Link className="h-5 w-5 folder-icon" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 section-title">Related Projects</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.relatedProjects.map((project, idx) => (
                            <a
                              key={idx}
                              href={`/projects#${project.toLowerCase().replace(/\s+/g, '-')}`}
                              className={cn(
                                "px-3 py-1 rounded-full text-sm transition-all duration-300 flex items-center",
                                theme === 'dark'
                                  ? 'bg-slate-700 border border-slate-600 hover:border-slate-500 text-muted-foreground hover:text-foreground'
                                  : 'bg-slate-100 border border-slate-200 hover:border-slate-300 text-muted-foreground hover:text-foreground'
                              )}
                            >
                              <span className="mr-1">#</span>{project}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ExperienceSection;
