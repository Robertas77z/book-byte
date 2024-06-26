// src/api/commentService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getCommentsForBook = async (bookId) => {
    const response = await axios.get(`${BASE_URL}/books/${bookId}/comments`);
    return response.data;
};

export const addCommentToBook = async (bookId, content) => {
    const response = await axios.post(`${BASE_URL}/books/${bookId}/comments`, { content });
    return response.data;
};

export const getCommentById = async (commentId) => {
    const response = await axios.get(`${BASE_URL}/comments/${commentId}`);
    return response.data;
};

export const getAllComments = async () => {
    const response = await axios.get(`${BASE_URL}/comments`);
    return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}`);
    return response.data;
};
