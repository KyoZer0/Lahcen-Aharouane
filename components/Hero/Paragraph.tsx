"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, motion, useTransform, useSpring } from "framer-motion";



const AnimatedAboutSection = () => {
  const containerRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > window.innerHeight) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="bg-primary-col relative h-[300vh]"
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`sticky top-0 h-screen overflow-hidden flex items-center justify-center`}
        style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
      >
        <Paragraph progress={smoothProgress} />
      </div>
    </section>
  );
};

interface ParagraphProps {
  progress: any;
}

const Paragraph = ({ progress }: ParagraphProps) => {
  const paragraphRef = useRef(null);

  const value = `Hi, I'm Lahcen Aharouane, a front-end developer and software engineering student at Holberton School. I specialize in creating responsive, user-friendly websites using CSS, Tailwind, React.js, and Figma. Over the years, I've developed various websites across sectors like e-commerce and education. Currently, I'm the Graphic Designer & Communications Lead at Association Initiative Al Amal, where I'm enhancing my skills in design and communication and contributing to the success of the association. My goal is to become a full-stack developer and create impactful solutions.`;
  const words = value.split(" ");

  return (
    <p ref={paragraphRef} className="max-w-4xl text-2xl mt-6 p-8">
      {words.map((word, index) => {
        const start = index / words.length;
        const end = Math.min((index + 1) / words.length, 1);
        return (
          <Word key={index} range={[start, end]} progress={progress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

interface WordProps {
  children: any;
  range: any;
  progress: any;
}

const Word = ({ children, range, progress }: WordProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const scale = useTransform(progress, range, [0.9, 1]);
  const y = useTransform(progress, range, [20, 0]);
  
  return (
    <motion.span 
      style={{ 
        opacity, 
        scale,
        y,
        display: 'inline-block',
        marginRight: '0.25em',
      }}
    >
      {children}
    </motion.span>
  );
};

export default AnimatedAboutSection;