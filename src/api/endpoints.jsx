// src/api/endpoints.js

// Keep BASE_URL empty so it uses the current origin (localhost or domain)
export const BASE_URL = ""; 

export const API = {

  CATEGORY: {
    LIST: `/api/category/`,
    DETAIL: (id) => `/api/category/${id}/`,
  },

  COURSES: {
    LIST: `/api/course/`,
    DETAIL: (id) => `/api/course/${id}/`,
  },

  FAQS: {
    LIST: `/api/faqs/`,
    DETAIL: (id) => `/api/faqs/${id}/`,
  },

  MODULES: {
    LIST: `/api/modules/`,
    DETAIL: (id) => `/api/modules/${id}/`,
  },

  TOPICS: {
    LIST: `/api/topics/`,
    DETAIL: (id) => `/api/topics/${id}/`,
  },

  BANNERS: {
    LIST: `/api/banners/`,
    DETAIL: (id) => `/api/banners/${id}/`,
  },

  TESTIMONIALS: {
    LIST: `/api/testimonials/`,
    DETAIL: (id) => `/api/testimonials/${id}/`,
  },

  REGISTER_MSG: {
    LIST: `/api/register_msg/`,
    DELETE: (id) => `/api/register_msg/${id}/`,
  },

  // ✅ NEW ADDITION: Articles Endpoint
  ARTICLES: {
    LIST: `/api/articles/`,
    DETAIL: (id) => `/api/articles/${id}/`,
  },
};