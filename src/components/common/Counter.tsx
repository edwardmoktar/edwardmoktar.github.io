import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end: number | string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const Counter = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0 
}: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const endValue = typeof end === 'string' ? parseFloat(end.replace(/[^\d.-]/g, '')) : end;
  
  useEffect(() => {
    // Check if element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const startCounting = () => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = progress * endValue;
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };
    
    window.requestAnimationFrame(step);
  };
  
  const formatNumber = (num: number) => {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <span ref={countRef}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default Counter;
