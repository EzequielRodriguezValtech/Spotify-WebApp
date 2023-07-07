import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';


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

  // Función auxiliar para convertir segundos a formato de minutos y segundos
  function formatDuration(milliseconds: number): string {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minuts = Math.floor((milliseconds / 1000) / 60);
    return `${minuts}:${seconds.toString().padStart(2, '0')}`;
  }


  return (
    <div className="flex flex-col items-center bg-black text-white py-8">
      <h1 className="text-3xl md:text-4xl mt-4 mb-8 font-bold text-center">
        My Favorite Songs
      </h1>
      {error ? (
        <p className="text-red-500">{`Error: ${error}`}</p>
      ) : (
        <ul className="w-full md:w-2/3">
          {favoriteSongs.map((song: Song) => (
            <li
              key={song.id}
              className="mb-4 bg-gray-800 rounded-lg p-4"
            >
              <h2 className="text-xl font-bold">{song.name}</h2>
              <p className="text-gray-400">by {song.artist}</p>
              <p className="text-gray-400">Duration: {formatDuration(song.duration)}</p>
              <p className="text-gray-400">Album: {song.album}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteSongsList;
