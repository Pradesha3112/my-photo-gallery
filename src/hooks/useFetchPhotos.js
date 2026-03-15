import { useState, useEffect } from 'react';

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://picsum.photos/v2/list?limit=30');
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        setPhotos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Set fallback data
        const fallbackData = Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          author: `Sample User ${i + 1}`,
        }));
        setPhotos(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};

export default useFetchPhotos;