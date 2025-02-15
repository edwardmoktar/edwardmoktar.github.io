
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const companies = [
    { name: "Discord", logo: "/placeholder.svg" },
    { name: "Alumet Education", logo: "/placeholder.svg" },
    { name: "Tranga", logo: "/placeholder.svg" },
    { name: "Real", logo: "/placeholder.svg" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground">👋 Hi, I'm Edward</p>
              
              <div className="space-y-2">
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Product Designer
                </motion.h1>
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold text-muted-foreground/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  UI/UX Designer
                </motion.h1>
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold text-muted-foreground/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Developer
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>15 UX/UI Projects Done</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🏆</span>
                  <span>Awwwards Jury</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src="/lovable-uploads/ca0a1d3b-eb60-4a67-bb11-b6b74c5210f7.png"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Companies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-24 space-y-8"
        >
          <h3 className="text-center text-lg text-muted-foreground">COMPANY I WORKED WITH</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="w-32 h-12 relative grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
