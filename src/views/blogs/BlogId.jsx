import { useParams, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import { useEffect, useState } from 'react';

function BlogId() {
  const { id } = useParams();
  const location = useLocation();
  const blogData = location.state || null; // Asegúrate de manejar si es null
  const token = localStorage.getItem('token');
  const [post, setPost] = useState([]);

  const getBlogId = async () => {
    try {
      const response = await api.get(`/blogs/get_blog/${blogData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        setPost(response.data.data);
      }
    } catch (error) {
      console.error('Error al obtener las categorías', error);
    }
  };

  useEffect(() => {
    if (blogData) {
      getBlogId();
    }
  }, [blogData]);

  return (
    <div>
      <h1>Blog Post</h1>
      <p>Post ID: {id}</p>
      <p>{post.content}</p>
      {blogData ? (
        <div>
          <h2>{blogData.id}</h2>
          <p>{post.title}</p>
        </div>
      ) : (
        <p>No additional data was passed.</p>
      )}
    </div>
  );
}

export default BlogId;
