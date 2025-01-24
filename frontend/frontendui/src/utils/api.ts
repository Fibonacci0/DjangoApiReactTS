// src/utils/api.ts
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/blog/api'; // Update with your Django backend URL

/**
 * Fetch all posts from the backend.
 * @returns Array of posts.
 */
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/posts/`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts.');
  }
};

/**
 * Fetch a specific post by its ID.
 * @param id Post ID.
 * @returns Post object.
 */
export const fetchPostById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch post with ID: ${id}`);
  }
};

/**
 * Create a new post.
 * @param data Post data (title and content).
 * @returns Created post object.
 */
export const createPost = async (data: { title: string; content: string }) => {
  try {
    const response = await axios.post(`${API_BASE}/posts/`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a new post.');
  }
};
