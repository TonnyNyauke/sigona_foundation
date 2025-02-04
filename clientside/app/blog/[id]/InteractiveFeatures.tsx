'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Reading progress bar component
interface ReadingProgressProps {
  target: React.RefObject<HTMLElement>;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ target }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!target.current) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [target]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-2 bg-gray-200 z-50">
      <div className="h-full bg-primary-color" style={{ width: `${progress}%` }} />
    </div>
  );
};

// Scroll-to-top button
const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 500);

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 bg-primary-color text-white rounded-full shadow-lg hover:bg-blue-700"
    >
      <ChevronUp size={24} />
    </Button>
  );
};

// Combined client-side features
interface InteractiveFeaturesProps {
  readingTime: number;
}

const InteractiveFeatures: React.FC<InteractiveFeaturesProps> = ({ readingTime }) => {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ReadingProgress target={articleRef} />
      <div ref={articleRef} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm shadow-lg z-50">
        {readingTime} min read
      </div>
      <ScrollToTop />
    </>
  );
};

export default InteractiveFeatures;