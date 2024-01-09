import axios from 'axios';

const productApi = axios.create({
    baseURL: '  http://localhost:3100/products',
});

export { productApi };
