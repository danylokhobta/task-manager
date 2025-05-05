const API_CONFIG = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    USERS: '/users',
    PRODUCTS: '/products',
    ORDERS: '/orders',
  },
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
  WITHCREDENTIALS: true,
};

export default API_CONFIG;