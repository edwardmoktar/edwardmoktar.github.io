import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Folder, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import FolderNavigation, { FolderSection } from '@/components/path/FolderNavigation';
import ExperienceSection, { ExperienceItem } from '@/components/path/ExperienceSection';
import EducationSection, { EducationItem } from '@/components/path/EducationSection';
import VolunteeringSection, { VolunteeringItem } from '@/components/path/VolunteeringSection';
import MiscSection, { MiscItem } from '@/components/path/MiscSection';

const Path = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is available on client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Make sure we scroll to top immediately
  useEffect(() => {
    window.history.pushState("", document.title, window.location.pathname); // Removes hash
    window.scrollTo(0, 0);
}, []);


  useEffect(() => {
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
    
    // Additional approach to ensure scrolling to top
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Professional experience data
  const experiences: ExperienceItem[] = [
    {
      title: "Senior Product Operations",
      company: "Telos Labs",
      period: "2022 - Present",
      description: "Leading product operations and automation initiatives for Web3 gaming platforms",
      metrics: [
        { value: "960+ hours", label: "Monthly workflow automation" },
        { value: "80,000+", label: "Active community members" }
      ],
      behindTheScenes: "Orchestrated the integration of multiple blockchain ecosystems, creating a seamless experience for users while maintaining robust security protocols.",
      keyLearnings: [
        "Scaling operations in high-growth Web3 environments requires both technical expertise and community-focused approaches",
        "Automation is essential but must be balanced with human oversight for optimal results",
        "Cross-functional collaboration is crucial for successful product development in decentralized spaces"
      ],
      relatedProjects: ["Automated Workflow System", "Community Dashboard", "Token Integration"]
    },
    {
      title: "Product Manager",
      company: "Fintech Startup",
      period: "2020 - 2022",
      description: "Led the development and launch of financial technology products focusing on accessibility and user experience",
      metrics: [
        { value: "300%", label: "User growth YoY" },
        { value: "$2.5M", label: "Revenue generated" }
      ],
      behindTheScenes: "Navigated the complex regulatory landscape of fintech while pushing for innovation in a traditionally conservative industry.",
      keyLearnings: [
        "User-centered design principles are essential for fintech adoption",
        "Regulatory compliance should be built into the product development process from day one",
        "Data-driven decision making leads to better product outcomes"
      ],
      relatedProjects: ["Mobile Banking App", "Payment Gateway", "Financial Dashboard"]
    },
    {
      title: "Technical Lead",
      company: "Enterprise Solutions",
      period: "2018 - 2020",
      description: "Managed a team of developers building enterprise-grade software solutions for Fortune 500 clients",
      metrics: [
        { value: "15+", label: "Enterprise clients" },
        { value: "99.9%", label: "System uptime" }
      ],
      behindTheScenes: "Balanced technical debt management with rapid feature development in a high-pressure enterprise environment.",
      keyLearnings: [
        "Technical leadership requires both deep technical knowledge and strong people management skills",
        "Enterprise solutions need to balance innovation with stability and security",
        "Clear communication between technical and non-technical stakeholders is crucial"
      ],
      relatedProjects: ["Cloud Migration", "Security Framework", "API Gateway"]
    }
  ];

  // Education data
  const educations: EducationItem[] = [
    {
      degree: "Computer Science",
      institution: "University of Technology",
      period: "2016 - 2020",
      description: "Specialized in AI and Machine Learning with a focus on practical applications",
      metrics: [
        { value: "3.9", label: "GPA" },
        { value: "15+", label: "Research Projects" },
        { value: "3", label: "Published Papers" }
      ],
      achievements: [
        "Dean's List for Academic Excellence (All semesters)",
        "Best Undergraduate Research Award for AI Ethics Project",
        "Graduate with Highest Honors"
      ],
      courses: [
        "Advanced Machine Learning",
        "Neural Networks",
        "Data Structures & Algorithms",
        "Distributed Systems",
        "Computer Vision",
        "Ethics in AI"
      ]
    },
    {
      degree: "MBA, Technology Management",
      institution: "Business School of Innovation",
      period: "2021 - 2022",
      description: "Focused on the intersection of technology and business strategy",
      metrics: [
        { value: "4.0", label: "GPA" },
        { value: "5", label: "Case Studies Published" },
        { value: "1", label: "Startup Founded" }
      ],
      achievements: [
        "Graduated with Distinction",
        "Technology Innovation Award",
        "Business Plan Competition Winner"
      ],
      courses: [
        "Strategic Management",
        "Technology Entrepreneurship",
        "Digital Transformation",
        "Innovation Management",
        "Venture Capital"
      ]
    }
  ];

  // Volunteering data
  const volunteering: VolunteeringItem[] = [
    {
      role: "Open Source Contributor",
      organization: "Various Projects",
      period: "2019 - Present",
      description: "Contributing to various open-source projects and mentoring new developers",
      impact: "Helped improve documentation and accessibility features across multiple open-source projects, making technology more accessible to developers worldwide.",
      metrics: [
        { value: "15+", label: "Projects contributed to" },
        { value: "120+", label: "Pull requests merged" },
        { value: "500+", label: "Issues resolved" }
      ],
      highlights: [
        "Maintained documentation for several key library repositories",
        "Developed accessibility plugins for popular frameworks",
        "Mentored junior developers through their first open-source contributions"
      ]
    },
    {
      role: "Tech Mentor",
      organization: "Youth Coding Initiative",
      period: "2018 - Present",
      description: "Teaching programming and computer science concepts to underprivileged youth",
      impact: "Introduced programming to students with limited access to technology education, with several mentees going on to pursue computer science degrees.",
      metrics: [
        { value: "50+", label: "Students mentored" },
        { value: "12", label: "Workshops organized" }
      ],
      highlights: [
        "Created a simplified curriculum for introducing web development concepts",
        "Organized weekend coding bootcamps in underserved communities",
        "Facilitated donations of computer equipment to program participants"
      ]
    }
  ];

  // Misc items data
  const miscItems: MiscItem[] = [
    {
      title: "Music Production",
      category: "Hobby",
      icon: "🎵",
      description: "Creating electronic music and sound design as a creative outlet",
      metrics: [
        { value: "30+", label: "Tracks produced" },
        { value: "5+", label: "Years experience" },
        { value: "3", label: "Music platforms" }
      ],
      details: [
        "Producing electronic music using Ableton Live and various VST instruments",
        "Sound design and foley recording for personal and collaborative projects",
        "Exploring the intersection of technology and music creation"
      ]
    },
    {
      title: "World Travel",
      category: "Interest",
      icon: "🌏",
      description: "Exploring diverse cultures and geographies around the world",
      metrics: [
        { value: "20+", label: "Countries visited" },
        { value: "4", label: "Continents explored" }
      ],
      details: [
        "Backpacking through Southeast Asia and experiencing local cultures",
        "Documenting travel experiences through photography",
        "Learning about sustainable tourism practices"
      ]
    }
  ];

  // Define the folder sections
  const folderSections: FolderSection[] = [
    {
      id: 'experience',
      title: 'Experience',
      icon: 'experience',
      content: <ExperienceSection experiences={experiences} />
    },
    {
      id: 'education',
      title: 'Education',
      icon: 'education',
      content: <EducationSection educations={educations} />
    },
    {
      id: 'volunteering',
      title: 'Volunteering',
      icon: 'volunteering',
      content: <VolunteeringSection volunteering={volunteering} />
    },
    {
      id: 'misc',
      title: 'Miscellaneous',
      icon: 'misc',
      content: <MiscSection miscItems={miscItems} />
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Folder 
              className="mr-3 folder-icon" 
              size={28}
            />
            <h1 className="text-4xl font-bold folder-title">/path</h1>
          </div>
          <p className="mb-12 text-lg text-muted-foreground max-w-3xl">
            Explore my professional journey, education, and other experiences that have shaped my path.
          </p>
          <FolderNavigation 
            sections={folderSections}
          />
          <div className="flex justify-center mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8 max-w-xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-[#594126] dark:text-white">Ready to Explore My Projects?</h2>
              <p className="text-base text-muted-foreground">
                Discover my portfolio of projects, from web applications to design systems and more.
              </p>
              <div className="relative inline-block">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-primary rounded-full blur-xl"
                />
                <Link to="/projects">
                  <Button size="lg" className="relative">
                    View My Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Path;
