import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const BlogContext = createContext();

function BlogProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getPost = async () => {
    try {
      const response = await api.get('/blogs/get_blogs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 401) {
        console.log('No se encontró ningún token.');
        return; // Salir si el token es inválido en esta etapa
      }

      const fetchedPosts = response.data.data.map(post => ({
          ...post
        }));

      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      const response = await api.get('/categories/get_categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 401) {
        console.log('No se encontró ningún token.');
        return; // Salir si el token es inválido en esta etapa
      }
      setCategories(response.data.data);
    }
    catch (error) {
      console.error('Error al obtener las categorías', error);
    }
  }


  useEffect(() => {
    getPost();
    getCategory();
  }, []);

  return (
    <BlogContext.Provider value={{ posts, categories, getPost, getCategory, loading }}>
      {children}
    </BlogContext.Provider>
  );
}

export { BlogContext, BlogProvider };
