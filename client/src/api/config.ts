const API_CONFIG = {
  BASE_URL: import.meta.env.API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    USER: '/user',
    TASK: '/task',
    AUTH: '/auth',
  },
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
  WITHCREDENTIALS: true,
};

export default API_CONFIG;