import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());
  const totalRenderTimeRef = useRef(0);

  useEffect(() => {
    const currentTime = performance.now();
    const renderTime = currentTime - lastRenderTimeRef.current;

    renderCountRef.current += 1;
    totalRenderTimeRef.current += renderTime;
    lastRenderTimeRef.current = currentTime;

    // Performance metrics collected silently for production
  });

  const getMetrics = (): PerformanceMetrics => ({
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current,
    averageRenderTime: totalRenderTimeRef.current / renderCountRef.current,
  });

  return { getMetrics };
};
