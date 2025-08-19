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

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      const averageRenderTime =
        totalRenderTimeRef.current / renderCountRef.current;

      console.log(`🚀 ${componentName} Performance:`, {
        renderCount: renderCountRef.current,
        lastRenderTime: `${renderTime.toFixed(2)}ms`,
        averageRenderTime: `${averageRenderTime.toFixed(2)}ms`,
        timestamp: new Date().toISOString(),
      });
    }
  });

  const getMetrics = (): PerformanceMetrics => ({
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current,
    averageRenderTime: totalRenderTimeRef.current / renderCountRef.current,
  });

  return { getMetrics };
};
