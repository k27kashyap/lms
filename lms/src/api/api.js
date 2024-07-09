import axios from 'axios';

const api = axios.create({
    baseURL: 'https://deloy-mern-api.vercel.app',
    headers: {
        'Access-Control-Allow-Origin': '*', // Not recommended for production
    },
});

export default api;
