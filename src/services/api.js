// ─── API Service ───────────────────────────────────────
// Connects React frontend to the Express backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

class Api {
  constructor() {
    this.baseUrl = API_URL;
  }

  // Get auth token from localStorage
  getToken() {
    return localStorage.getItem('aylthra_token');
  }

  // Auth headers
  headers() {
    const h = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
  }

  // Generic request
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: this.headers(),
      ...options,
    };

    try {
      const res = await fetch(url, config);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, error.message);
      throw error;
    }
  }

  // Convenience methods
  get(endpoint) { return this.request(endpoint); }
  post(endpoint, body) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) }); }
  put(endpoint, body) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }); }
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); }
}

const api = new Api();

// ─── Auth API ──────────────────────────────────────────
export const authAPI = {
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  addAddress: (address) => api.put('/auth/address', address),
  changePassword: (currentPassword, newPassword) => api.put('/auth/password', { currentPassword, newPassword }),
};

// Helper to map MongoDB _id to standard frontend id
const mapProduct = (p) => {
  if (!p) return p;
  return {
    ...p,
    id: p._id || p.id,
    colors: p.colors || [],
    sizes: p.sizes || [],
    details: p.details || [],
    images: p.images || [],
  };
};

// ─── Products API ──────────────────────────────────────
export const productsAPI = {
  getAll: async (params = '') => {
    const data = await api.get(`/products${params ? '?' + params : ''}`);
    if (data && data.products) {
      data.products = data.products.map(mapProduct);
    }
    return data;
  },
  getOne: async (id) => {
    const data = await api.get(`/products/${id}`);
    if (data && data.product) {
      data.product = mapProduct(data.product);
    }
    if (data && data.related) {
      data.related = data.related.map(mapProduct);
    }
    return data;
  },
  getCategories: () => api.get('/products/categories/list'),
  create: async (data) => {
    const res = await api.post('/products', data);
    if (res && res.product) {
      res.product = mapProduct(res.product);
    }
    return res;
  },
  update: async (id, data) => {
    const res = await api.put(`/products/${id}`, data);
    if (res && res.product) {
      res.product = mapProduct(res.product);
    }
    return res;
  },
  delete: (id) => api.delete(`/products/${id}`),
};

// ─── Orders API ────────────────────────────────────────
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getOne: (id) => api.get(`/orders/${id}`),
  validateCoupon: (code, subtotal) => api.post('/orders/coupon/validate', { code, subtotal }),
  getAllAdmin: () => api.get('/orders/admin/list'),
  updateStatusAdmin: (id, status) => api.put(`/orders/admin/${id}/status`, { status }),
};

// ─── Traffic & Analytics API ───────────────────────────
export const trafficAPI = {
  log: (path, referrer) => api.post('/traffic/log', { path, referrer }),
  getStats: () => api.get('/traffic/stats'),
};

// ─── Reviews API ───────────────────────────────────────
export const reviewsAPI = {
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  create: (data) => api.post('/reviews', data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export default api;
