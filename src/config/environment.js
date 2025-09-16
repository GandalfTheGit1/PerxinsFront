const getEnvironment = () => {
  // Vite exposes env vars starting with VITE_
  const mode = import.meta.env.VITE_APP_MODE || 'production';

  const isDemo = mode === 'demo';
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  const apiBaseUrl = (() => {
    if (isDemo) {
      return ''; // Mock services won't use real API
    }
    if (isDevelopment) {
      return 'http://localhost:3001';
    }
    return import.meta.env.VITE_API_BASE_URL || 'https://api.perxins.com';
  })();

  return {
    mode,
    isDemo,
    isDevelopment,
    isProduction,
    apiBaseUrl,
  };
};

export default getEnvironment;