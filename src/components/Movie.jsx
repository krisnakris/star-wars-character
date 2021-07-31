import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Movie({ url }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchMovie() {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          setMovie(res);
          setLoading(false);
        });
    };
    fetchMovie();
  }, []);
  
  return (
    <div>
      <p>{movie.title}</p>
    </div>
  )
}
