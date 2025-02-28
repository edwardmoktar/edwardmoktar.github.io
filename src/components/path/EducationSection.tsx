import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Medal, ChevronDown, Calendar, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Counter from '@/components/common/Counter';

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
  achievements?: string[];
  courses?: string[];
}

interface EducationSectionProps {
  educations: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const { theme } = useTheme();

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
    <div className="education-section">
      {educations.map((edu, index) => {
        const isExpanded = expandedCards[index] || false;
        
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
                <h3 className="folder-card-title">{edu.degree}</h3>
                <p className="folder-card-subtitle">
                  {edu.institution} • {edu.period}
                </p>
              </div>
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
            
            {/* Brief description always visible */}
            <p className="folder-card-content line-clamp-2 mb-3">
              {edu.description}
            </p>
            
            {/* Metrics displayed in unexpanded card */}
            {edu.metrics && edu.metrics.length > 0 && (
              <div className="flex flex-wrap mt-4 mx-[-0.25rem]">
                {edu.metrics.map((metric, idx) => (
                  <div 
                    key={idx} 
                    className={getMetricCardStyle().className}
                    style={getMetricCardStyle().style}
                  >
                    <span 
                      className={getMetricCardStyle().valueClassName}
                      style={getMetricCardStyle().valueStyle}
                    >
                      <Counter end={metric.value} />
                    </span>
                    <span className="text-xs text-muted-foreground block">{metric.label}</span>
                  </div>
                ))}
                {/* Add placeholder third metric if needed */}
                {edu.metrics.length === 2 && (
                  <div 
                    className={getMetricCardStyle().className}
                    style={getMetricCardStyle().style}
                  >
                    <span 
                      className={getMetricCardStyle().valueClassName}
                      style={getMetricCardStyle().valueStyle}
                    >4.0</span>
                    <span className="text-xs text-muted-foreground block">Average GPA</span>
                  </div>
                )}
                {/* Add empty placeholders to maintain the grid if needed after adding third placeholder */}
                {edu.metrics.length === 1 && Array.from({ length: 2 }).map((_, i) => (
                  <div 
                    key={`placeholder-${i}`} 
                    className={getMetricCardStyle().className}
                    style={getMetricCardStyle().style}
                  >
                    <span 
                      className={getMetricCardStyle().valueClassName}
                      style={getMetricCardStyle().valueStyle}
                    >{i === 0 ? "4.0" : "3+"}</span>
                    <span className="text-xs text-muted-foreground block">{i === 0 ? "Average GPA" : "Awards received"}</span>
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
                    {edu.description}
                  </p>
                  
                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Achievements</h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <Award className="h-4 w-4 mr-2 mt-1 flex-shrink-0 folder-icon" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Courses */}
                  {edu.courses && edu.courses.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Key Courses</h4>
                      <ul className="space-y-2">
                        {edu.courses.map((course, idx) => (
                          <li key={idx} className="flex items-start">
                            <BookOpen className="h-4 w-4 mr-2 mt-1 flex-shrink-0 folder-icon" />
                            <span className="text-muted-foreground">{course}</span>
                          </li>
                        ))}
                      </ul>
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

export default EducationSection;
