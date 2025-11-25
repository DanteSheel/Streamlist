import React, { useState, useEffect } from 'react';

const API_KEY = '2ded77aaf1eed91875ef127812f6a2db';

export default function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch from TMDB');
        }
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  return (
    <section style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Trending Movies (TMDB)</h2>
      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
        Data retrieved in real time from The Movie Database (TMDB) API.
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}
      >
        {movies.map(movie => (
          <article
            key={movie.id}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', display: 'block' }}
              />
            )}
            <div style={{ padding: '0.6rem 0.8rem' }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{movie.title}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>
                ⭐ {movie.vote_average?.toFixed(1) || 'N/A'} · Votes: {movie.vote_count}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
