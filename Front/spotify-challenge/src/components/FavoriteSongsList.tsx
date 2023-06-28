import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Song {
  id: number;
  name: string;
  artist: string;
  duration: number;
  album: string;
  albumImage: string;
}

const FavoriteSongsList = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getFavoriteSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/favorites', {
          withCredentials: true,
        });
        setFavoriteSongs(response.data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error ||
          'Error al obtener las canciones favoritas';
        setError(errorMessage);
      }
    };

    getFavoriteSongs();
  }, []);

  return (
    <div>
      <h1>My Favorite Songs</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {favoriteSongs.map((song: Song) => (
            <li key={song.id}>
              <h2>{song.name}</h2>
              <p>by {song.artist}</p>
              <p>Duration: {song.duration}</p>
              <p>Album: {song.album}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteSongsList;
