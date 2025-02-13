
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';

export default function Index() {
  const [count, setCount] = useState(0);
  const targetCount = 960; // Hours automated per month
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (count < targetCount) {
      const timer = setTimeout(() => {
        setCount(prev => {
          const increment = Math.floor((targetCount - prev) / 10) + 1;
          return Math.min(prev + increment, targetCount);
        });
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className={`space-y-4 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
            <h2 className="text-sm md:text-base uppercase tracking-wider text-muted-foreground">
              Hi, I'm Edward
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Data-Driven
              <br />
              Product Guy
            </h1>
          </div>

          <p className={`text-lg md:text-xl text-muted-foreground mt-6 ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            A product & operations enthusiast with extensive experience in data analytics and Web3. 
            I specialize in building data-driven products and system optimisation.
          </p>

          <div className={`flex flex-col items-center space-y-8 mt-12 ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <div className="glass p-6 rounded-lg max-w-sm mx-auto">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {count}+
              </div>
              <div className="text-sm text-muted-foreground">
                Hours Automated Monthly
              </div>
            </div>

            <Button
              size="lg"
              className="hover-lift group"
            >
              Let's Chat
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
