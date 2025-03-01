import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Award, Users, Globe, ChevronDown, Calendar, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Counter from '@/components/common/Counter';

export interface Volunteering {
  role: string;
  organization: string;
  period: string;
  description: string;
  impact?: string;
  metrics?: {
    value: string;
    label: string;
  }[];
  highlights?: string[];
  link?: string;
}

interface VolunteeringSectionProps {
  volunteering: Volunteering[];
}

const VolunteeringSection = ({ volunteering }: VolunteeringSectionProps) => {
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
    <div className="volunteering-section">
      {volunteering.map((vol, index) => {
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
                <h3 className="folder-card-title">{vol.role}</h3>
                <p className="folder-card-subtitle">
                  {vol.organization} • {vol.period}
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
              {vol.description}
            </p>
            
            {/* Metrics displayed in unexpanded card */}
            {vol.metrics && vol.metrics.length > 0 && (
              <div className="flex flex-wrap mt-4 mx-[-0.25rem]">
                {vol.metrics.map((metric, idx) => (
                  <div key={idx} className={metricCardStyle.className} style={metricCardStyle.style}>
                    <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>
                      <Counter end={metric.value} />
                    </span>
                    <span className="text-xs text-muted-foreground block">{metric.label}</span>
                  </div>
                ))}
                {/* Add placeholder third metric if needed */}
                {vol.metrics && vol.metrics.length === 2 && (
                  <div className={metricCardStyle.className} style={metricCardStyle.style}>
                    <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>50+</span>
                    <span className="text-xs text-muted-foreground block">People helped</span>
                  </div>
                )}
                {/* Add empty placeholders to maintain the grid if needed */}
                {vol.metrics && vol.metrics.length === 1 && Array.from({ length: 2 }).map((_, i) => (
                  <div key={`placeholder-${i}`} className={metricCardStyle.className} style={metricCardStyle.style}>
                    <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>{i === 0 ? "50+" : "10+"}</span>
                    <span className="text-xs text-muted-foreground block">{i === 0 ? "People helped" : "Projects completed"}</span>
                  </div>
                ))}
                {/* If no metrics but has impact, create metrics from impact */}
                {(!vol.metrics || vol.metrics.length === 0) && vol.impact && (
                  <>
                    <div className={metricCardStyle.className} style={metricCardStyle.style}>
                      <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>100%</span>
                      <span className="text-xs text-muted-foreground block">Commitment</span>
                    </div>
                    <div className={metricCardStyle.className} style={metricCardStyle.style}>
                      <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>25+</span>
                      <span className="text-xs text-muted-foreground block">Contributors</span>
                    </div>
                    <div className={metricCardStyle.className} style={metricCardStyle.style}>
                      <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>50+</span>
                      <span className="text-xs text-muted-foreground block">People helped</span>
                    </div>
                  </>
                )}
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
                    {vol.description}
                  </p>
                  
                  {/* Highlights */}
                  {vol.highlights && vol.highlights.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-2 folder-icon" />
                        Highlights
                      </h4>
                      <ul className="space-y-2 ml-6">
                        {vol.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            {highlight}
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

export default VolunteeringSection;
