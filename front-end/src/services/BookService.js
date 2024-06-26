// BookService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

export const createBookAPICall = (book) => {
    return axios.post(`${API_URL}/books`, book);
};

export const updateBookAPICall = (id, book) => {
    return axios.put(`${API_URL}/books/${id}`, book);
};

export const deleteBookAPICall = (id) => {
    return axios.delete(`${API_URL}/books/${id}`);
};

export const getBooksAPICall = () => {
    return axios.get(`${API_URL}/books`);
};
export const getBooksByCategoryAPICall = (categoryId) => {
    return axios.get(`/api/category/${categoryId}`);
  };
  
  export const getAllBooksAPICall = () => {
    return axios.get(`/api/books`);
  };
  export const getBookById = (id) => {
    return axios.get(`${API_URL}/books/${id}`);
  };