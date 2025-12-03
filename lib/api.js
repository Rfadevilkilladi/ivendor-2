import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Handle responses
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error.response?.data || error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  verify: () => api.post('/auth/verify'),
  logout: () => {
    localStorage.removeItem('auth_token')
    return Promise.resolve()
  }
}

// Users API
export const usersAPI = {
  getCurrentUser: () => api.get('/users/me'),
  getUser: (id) => api.get(`/users/${id}`),
  listUsers: (params) => api.get('/users', { params }),
  updateProfile: (data) => api.patch('/users/me', data)
}

// Projects API
export const projectsAPI = {
  create: (data) => api.post('/projects', data),
  list: (params) => api.get('/projects', { params }),
  get: (id) => api.get(`/projects/${id}`),
  update: (id, data) => api.patch(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`)
}

// Ideas API
export const ideasAPI = {
  create: (data) => api.post('/ideas', data),
  list: (params) => api.get('/ideas', { params }),
  get: (id) => api.get(`/ideas/${id}`),
  vote: (id) => api.post(`/ideas/${id}/vote`),
  update: (id, data) => api.patch(`/ideas/${id}`, data)
}

// Mentor Sessions API
export const mentorAPI = {
  bookSession: (data) => api.post('/mentor-sessions', data),
  getSessions: (params) => api.get('/mentor-sessions', { params }),
  getSession: (id) => api.get(`/mentor-sessions/${id}`),
  updateSession: (id, data) => api.patch(`/mentor-sessions/${id}`, data),
  cancelSession: (id) => api.delete(`/mentor-sessions/${id}`)
}

// Loyalty Points API
export const loyaltyAPI = {
  getPoints: () => api.get('/loyalty/points'),
  redeemPoints: (data) => api.post('/loyalty/redeem', data)
}

// Attendance API
export const attendanceAPI = {
  record: (data) => api.post('/attendance', data),
  getAttendance: (params) => api.get('/attendance', { params })
}

// Parts Store API
export const partsAPI = {
  createOrder: (data) => api.post('/parts/orders', data),
  getOrders: (params) => api.get('/parts/orders', { params }),
  getOrder: (id) => api.get(`/parts/orders/${id}`)
}

export default api
