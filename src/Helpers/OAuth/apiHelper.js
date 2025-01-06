import axios from 'axios';
import { userManager } from './userManager';

// Create an Axios instance
const apiClient = axios.create({
    // commenting this out since using a relative path for the apis in this prototype
    //baseURL: 'https://api.example.com', // Your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Authorization header
apiClient.interceptors.request.use(async config => {
    const user = await userManager.getUser();
    console.log("axios intercept request with user", user)
    if (user && user.access_token) {
        config.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
    return config;
});

// Add a response interceptor to handle 401 responses and token refresh
apiClient.interceptors.response.use(
    response => response, // Pass through successful responses
    async error => {
        if (error.response && error.response.status === 401) {
            try {
                console.log('401 Unauthorized - attempting to refresh token...');
                const user = await userManager.signinSilent();
                // NOTE: userManager.signinSilent() will fall into the catch handler if unsuccessful AND you might see the /callout route being called 
                if (user && user.access_token) {
                    console.log('Token refreshed successfully:', user.access_token);
                    error.config.headers['Authorization'] = `Bearer ${user.access_token}`;
                    return axios.request(error.config); // Retry the failed request
                }
            } catch (refreshError) {
                console.log('Failed to refresh token:', refreshError);
                //await userManager.signoutRedirect(); // Redirect to login on failure
                alert("we need to redirect to login")
            }
        }
        return Promise.reject(error); // Propagate other errors
    }
);

// Extend apiClient with helper methods
const apiHelper = {
    get: async (url, params = {}, config = {}) => {
        return apiClient.get(url, { ...config, params });
    },
    post: async (url, data = {}, config = {}) => {
        return apiClient.post(url, data, config);
    },
    put: async (url, data = {}, config = {}) => {
        return apiClient.put(url, data, config);
    },
    patch: async (url, data = {}, config = {}) => {
        return apiClient.patch(url, data, config);
    },
    delete: async (url, config = {}) => {
        return apiClient.delete(url, config);
    },
};

export default apiHelper;
