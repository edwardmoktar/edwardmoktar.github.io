import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen, FileText, Briefcase, GraduationCap, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export interface FolderSection {
  id: string;
  title: string;
  icon: 'experience' | 'education' | 'volunteering' | 'misc';
  content: React.ReactNode;
}

interface FolderNavigationProps {
  sections: FolderSection[];
  initialActiveSection?: string;
}

const FolderNavigation = ({ sections, initialActiveSection }: FolderNavigationProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(initialActiveSection || null);
  const [previousSection, setPreviousSection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'experience':
        return <Briefcase className="h-5 w-5 folder-icon" />;
      case 'education':
        return <GraduationCap className="h-5 w-5 folder-icon" />;
      case 'volunteering':
        return <Heart className="h-5 w-5 folder-icon" />;
      case 'misc':
        return <Sparkles className="h-5 w-5 folder-icon" />;
      default:
        return <FileText className="h-5 w-5 folder-icon" />;
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (activeSection === sectionId) {
      // If clicking the active section, close it
      setPreviousSection(activeSection);
      setActiveSection(null);
    } else {
      // If clicking a different section, switch to it
      setPreviousSection(activeSection);
      setActiveSection(sectionId);
    }
    setIsAnimating(true);
  };

  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  // Scroll to the active content when it changes
  useEffect(() => {
    if (activeSection && containerRef.current) {
      const contentElement = document.getElementById(`folder-content-${activeSection}`);
      if (contentElement) {
        setTimeout(() => {
          // Prevent scrolling on initial page load
          if (performance.navigation.type !== 1) {
            contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300); // Wait for animation to complete
      }
    }
  }, [activeSection]);

  // Neumorphic styles for light and dark mode
  const getTabColors = (isActive: boolean) => {
    if (theme === 'dark') {
      return {
        bg: 'transparent', // Match background color
        text: '#f0c040',
        border: isActive ? '#f0c040' : 'rgba(240, 192, 64, 0.5)',
        shadow: 'none',
        glow: 'none',
        backdropFilter: 'blur(8px)',
        webkitBackdropFilter: 'blur(8px)',
        animation: 'none'
      };
    }
    return {
      bg: isActive ? '#F6F3EE' : '#f8f7f5',
      text: '#594126',
      border: isActive ? '#8c6d4f' : 'rgba(140, 109, 79, 0.5)',
      shadow: isActive 
        ? '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)' 
        : '4px 4px 8px rgba(0, 0, 0, 0.05), -4px -4px 8px rgba(255, 255, 255, 0.5)',
      glow: 'none',
      backdropFilter: 'none',
      webkitBackdropFilter: 'none'
    };
  };

  const getContentColors = () => {
    if (theme === 'dark') {
      return {
        bg: '#020817CC', // Dark blue background
        border: 'rgba(240, 192, 64, 0.5)',
        headerText: '#f0c040',
        shadow: 'none',
        glow: 'none',
        innerShadow: 'none',
        iconBg: 'rgba(240, 192, 64, 0.1)'
      };
    }
    return {
      bg: '#F6F3EE',
      border: 'rgba(140, 109, 79, 0.5)',
      headerText: '#594126',
      shadow: '10px 10px 20px rgba(0, 0, 0, 0.1), -10px -10px 20px rgba(255, 255, 255, 0.8)',
      innerShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.05), inset -3px -3px 6px rgba(255, 255, 255, 0.7)',
      iconBg: 'rgba(140, 109, 79, 0.1)'
    };
  };

  return (
    <div ref={containerRef} className="folder-navigation-container">
      {/* Folder tabs */}
      <div className="flex flex-wrap relative z-10 mb-1 gap-2">
        {sections.map((section) => {
          const colors = getTabColors(activeSection === section.id);
          return (
            <motion.button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "folder-tab relative px-4 py-2 sm:px-5 sm:py-3 flex items-center font-medium",
                "rounded-xl border-2 transition-all duration-300 mb-2 sm:mb-0 flex-grow sm:flex-grow-0",
                "max-w-[calc(50%-0.5rem)] sm:max-w-none"
              )}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                transition: { duration: 0.2, ease: "easeOut" } 
              }}
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                borderColor: colors.border,
                boxShadow: colors.shadow,
                filter: 'none',
                transform: activeSection === section.id ? 'translateY(-2px)' : 'translateY(0)',
                zIndex: activeSection === section.id ? 3 : 1,
                backdropFilter: theme === 'dark' ? 'blur(8px)' : 'none',
                WebkitBackdropFilter: theme === 'dark' ? 'blur(8px)' : 'none',
                animation: colors.animation
              }}
            >
              <span className="mr-3 p-2 bg-opacity-30 rounded-lg">
                {activeSection === section.id ? (
                  <FolderOpen className="h-5 w-5 folder-icon" />
                ) : (
                  <Folder className="h-5 w-5 folder-icon" />
                )}
              </span>
              <span className="font-bold folder-title">{section.title}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Folder content area */}
      <div 
        className="folder-content-area relative overflow-hidden rounded-2xl border-2"
        style={{
          backgroundColor: getContentColors().bg,
          borderColor: getContentColors().border,
          boxShadow: 'none',
          filter: 'none',
          minHeight: '400px',
          backdropFilter: theme === 'dark' ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: theme === 'dark' ? 'blur(8px)' : 'none',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Folder header */}
        <div 
          className="folder-header p-4 flex items-center"
          style={{
            backgroundColor: getContentColors().bg,
            color: getContentColors().headerText,
            borderBottom: `2px solid ${getContentColors().border}`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: getContentColors().innerShadow,
          }}
        >
          {activeSection ? (
            <>
              <div className="p-2 rounded-lg mr-2" style={{ backgroundColor: getContentColors().iconBg }}>
                {getIconComponent(sections.find(s => s.id === activeSection)?.icon || 'misc')}
              </div>
              <span className="ml-2 font-bold text-lg">
                {sections.find(s => s.id === activeSection)?.title || 'Folder'}
              </span>
            </>
          ) : (
            <>
              <div className="p-2 rounded-lg mr-2" style={{ backgroundColor: getContentColors().iconBg }}>
                <FileText className="h-5 w-5 folder-icon" />
              </div>
              <span className="ml-2 font-bold text-lg">Select a folder</span>
            </>
          )}
        </div>

        {/* Folder content */}
        <div className="folder-content p-6" style={{ boxShadow: getContentColors().innerShadow }}>
          <AnimatePresence mode="wait">
            {activeSection ? (
              <motion.div
                key={activeSection}
                id={`folder-content-${activeSection}`}
                initial={{ 
                  opacity: 0, 
                  y: 20,
                  rotateX: 10,
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20,
                  rotateX: -10,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.4 
                }}
                onAnimationComplete={onAnimationComplete}
                className="folder-content-inner"
                style={{ 
                  transformOrigin: "top center",
                  perspective: "1000px",
                }}
              >
                {sections.find(s => s.id === activeSection)?.content}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-6 rounded-full mb-4"
                  style={{ 
                    backgroundColor: getContentColors().iconBg,
                    boxShadow: theme === 'dark' 
                      ? '4px 4px 8px rgba(0, 0, 0, 0.5), -2px -2px 6px rgba(0, 0, 0, 0.3)' 
                      : '6px 6px 12px rgba(0, 0, 0, 0.05), -6px -6px 12px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <Folder className="h-16 w-16 opacity-80 folder-icon" />
                </motion.div>
                <p className="text-muted-foreground font-medium">Select a folder to view its contents</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FolderNavigation;
