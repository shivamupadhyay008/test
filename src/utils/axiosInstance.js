import axios from 'axios';

// Create an Axios instance with default configuration
export const axiosInstance = axios.create({
  baseURL: 'https://64f638832b07270f705e4c76.mockapi.io/', // Set your API base URL
  timeout: 5000, // Set a default timeout (optional)
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
  },
});