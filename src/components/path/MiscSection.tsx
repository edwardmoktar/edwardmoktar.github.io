import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Music, Camera, Book, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Counter from '@/components/common/Counter';

export interface MiscItem {
  title: string;
  category: string;
  icon: string;
  description: string;
  details?: string[];
  metrics?: {
    value: string;
    label: string;
  }[];
}

interface MiscSectionProps {
  miscItems: MiscItem[];
}

const MiscSection = ({ miscItems }: MiscSectionProps) => {
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
    <div className="misc-section">
      {miscItems.map((item, index) => {
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
                <h3 className="folder-card-title">{item.title}</h3>
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
              {item.description}
            </p>
            
            {/* Metrics displayed in unexpanded card */}
            <div className="flex flex-wrap mt-4 mx-[-0.25rem]">
              {item.metrics ? (
                // Display actual metrics if they exist
                <>
                  {item.metrics.map((metric, idx) => (
                    <div key={idx} className={metricCardStyle.className} style={metricCardStyle.style}>
                      <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>
                        <Counter end={metric.value} />
                      </span>
                      <span className="text-xs text-muted-foreground block">{metric.label}</span>
                    </div>
                  ))}
                  {/* Add placeholder metrics if needed */}
                  {item.metrics.length === 2 && (
                    <div className={metricCardStyle.className} style={metricCardStyle.style}>
                      <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>5+</span>
                      <span className="text-xs text-muted-foreground block">Years experience</span>
                    </div>
                  )}
                  {item.metrics.length === 1 && (
                    <>
                      <div className={metricCardStyle.className} style={metricCardStyle.style}>
                        <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>100+</span>
                        <span className="text-xs text-muted-foreground block">Hours invested</span>
                      </div>
                      <div className={metricCardStyle.className} style={metricCardStyle.style}>
                        <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>5+</span>
                        <span className="text-xs text-muted-foreground block">Years experience</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                // Default placeholder metrics if none exist
                <>
                  <div className={metricCardStyle.className} style={metricCardStyle.style}>
                    <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>100+</span>
                    <span className="text-xs text-muted-foreground block">Hours invested</span>
                  </div>
                  <div className={metricCardStyle.className} style={metricCardStyle.style}>
                    <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>25+</span>
                    <span className="text-xs text-muted-foreground block">Projects completed</span>
                  </div>
                  <div className={metricCardStyle.className} style={metricCardStyle.style}>
                    <span className={metricCardStyle.valueClassName} style={metricCardStyle.valueStyle}>5+</span>
                    <span className="text-xs text-muted-foreground block">Years experience</span>
                  </div>
                </>
              )}
            </div>
            
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
                    {item.description}
                  </p>
                  
                  {/* Details */}
                  {item.details && item.details.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Details</h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <Sparkles className="h-4 w-4 mr-2 mt-1 flex-shrink-0 folder-icon" />
                            <span className="text-muted-foreground">{detail}</span>
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

export default MiscSection;
