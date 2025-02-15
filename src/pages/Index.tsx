import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const companies = [
    { name: "Discord", logo: "/placeholder.svg" },
    { name: "Alumet Education", logo: "/placeholder.svg" },
    { name: "Tranga", logo: "/placeholder.svg" },
    { name: "Real", logo: "/placeholder.svg" },
  ];

  const projectImages = [
    "/lovable-uploads/5bd040f4-29e5-4fe1-b200-9548588a8dc3.png",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
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

        {/* Mission Statements Section */}
        <div className="py-24 space-y-32">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center space-y-6 z-10 relative"
            >
              <h2 className="text-4xl font-bold">Bridging Creativity and Functionality</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe that great design exists at the intersection of creativity and functionality. 
                My work focuses on crafting innovative solutions that are not only visually compelling 
                but also user-centric and purposeful. From brainstorming to delivery, I strive to build 
                digital experiences that resonate with users and achieve meaningful results.
              </p>
            </motion.div>

            <motion.div 
              style={{ y: y1 }}
              className="absolute -left-20 top-0 w-72 h-72 -rotate-6 z-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: -3 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src={projectImages[0]} 
                  alt="Project Preview" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              className="absolute -right-20 bottom-0 w-64 h-64 rotate-6 z-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src={projectImages[1]} 
                  alt="Project Preview" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="relative mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center space-y-6 z-10 relative"
            >
              <h2 className="text-4xl font-bold">Designing for Impact and Innovation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In a rapidly evolving digital landscape, I am dedicated to creating designs that 
                stand the test of time. My projects leverage the latest tools and trends to push 
                creative boundaries, delivering designs that are both innovative and impactful. 
                I am committed to continuous learning and experimenting with new ideas to elevate 
                every project I undertake.
              </p>
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              className="absolute -left-20 bottom-0 w-64 h-64 -rotate-6 z-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: -3 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src={projectImages[2]} 
                  alt="Project Preview" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div 
              style={{ y: y1 }}
              className="absolute -right-20 top-0 w-72 h-72 rotate-6 z-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src={projectImages[3]} 
                  alt="Project Preview" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
