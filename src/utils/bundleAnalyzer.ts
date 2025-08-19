// Bundle Analyzer Configuration
// This utility helps monitor bundle size and lazy loading effectiveness

export const bundleAnalyzerConfig = {
  // Enable bundle analysis in development
  enabled:
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_ANALYZE_BUNDLE === 'true',

  // Bundle size thresholds (in KB)
  thresholds: {
    warning: 500, // 500KB
    error: 1000, // 1MB
  },

  // Lazy loaded chunks to monitor
  lazyChunks: ['LoginForm', 'SignupForm', 'ForgotPassword', 'AppLayout'],
};

export const analyzeBundleSize = (bundleInfo: any) => {
  if (!bundleAnalyzerConfig.enabled) return;

  const { size, chunks } = bundleInfo;
  const sizeInKB = size / 1024;

  // Bundle analysis completed silently
};

// Webpack bundle analyzer plugin configuration
export const webpackBundleAnalyzer = {
  analyzerMode: process.env.NODE_ENV === 'development' ? 'server' : 'disabled',
  analyzerPort: 8888,
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: 'bundle-stats.json',
};
