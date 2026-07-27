import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateItinerary = async (data) => {
  const response = await api.post('/planner/generate', data);
  return response.data;
};

export const sendChatMessage = async (data) => {
  const response = await api.post('/chat', data);
  return response.data;
};

export const uploadRAGDocument = async (formData) => {
  const response = await api.post('/rag/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchRAGDocuments = async () => {
  const response = await api.get('/rag/documents');
  return response.data;
};

export const fetchDestinationInfo = async (destination) => {
  const response = await api.get(`/destination/${encodeURIComponent(destination)}`);
  return response.data;
};

export default api;
