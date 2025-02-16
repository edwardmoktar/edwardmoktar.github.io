
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

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
        <div className="py-24 space-y-48">
          {/* First Mission Statement */}
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">Bridging Creativity and Functionality</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                I believe that great design exists at the intersection of creativity and functionality. 
                My work focuses on crafting innovative solutions that are not only visually compelling 
                but also user-centric and purposeful. From brainstorming to delivery, I strive to build 
                digital experiences that resonate with users and achieve meaningful results.
              </p>

              <div className="mt-12">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <CarouselContent>
                    {projectImages.slice(0, 2).map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
                        >
                          <img 
                            src={image} 
                            alt={`Project ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </motion.div>
          </div>

          {/* Second Mission Statement */}
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">Designing for Impact and Innovation</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                In a rapidly evolving digital landscape, I am dedicated to creating designs that 
                stand the test of time. My projects leverage the latest tools and trends to push 
                creative boundaries, delivering designs that are both innovative and impactful. 
                I am committed to continuous learning and experimenting with new ideas to elevate 
                every project I undertake.
              </p>

              <div className="mt-12">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <CarouselContent>
                    {projectImages.slice(2, 4).map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
                        >
                          <img 
                            src={image} 
                            alt={`Project ${index + 3}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 max-w-xl mx-auto"
          >
            <h2 className="text-3xl font-bold">Ready to Explore My Journey?</h2>
            <p className="text-base text-muted-foreground">
              Discover how I approach design challenges and create impactful solutions.
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
              <Link to="/path">
                <Button size="lg" className="relative">
                  View My Path
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
