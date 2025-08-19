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

  console.log('📦 Bundle Analysis:', {
    totalSize: `${sizeInKB.toFixed(2)}KB`,
    chunkCount: chunks.length,
    lazyChunks: chunks.filter((chunk: any) =>
      bundleAnalyzerConfig.lazyChunks.some(name => chunk.name?.includes(name))
    ),
  });

  // Warn if bundle is too large
  if (sizeInKB > bundleAnalyzerConfig.thresholds.error) {
    console.error('❌ Bundle size exceeds error threshold!');
  } else if (sizeInKB > bundleAnalyzerConfig.thresholds.warning) {
    console.warn('⚠️ Bundle size exceeds warning threshold!');
  } else {
    console.log('✅ Bundle size is within acceptable limits');
  }
};

// Webpack bundle analyzer plugin configuration
export const webpackBundleAnalyzer = {
  analyzerMode: process.env.NODE_ENV === 'development' ? 'server' : 'disabled',
  analyzerPort: 8888,
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: 'bundle-stats.json',
};
