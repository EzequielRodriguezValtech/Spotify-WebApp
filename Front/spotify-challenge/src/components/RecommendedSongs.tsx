import React, { useEffect, useState } from "react";
import axios from "axios";

interface Song {
  uri: string;
  name: string;
  artist: string;
  duration: number;
  album: string;
  id: string;
  isSelected: boolean;
}

const RecommendedSongs: React.FC = () => {
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);

  useEffect(() => {
    const getRecommendedSongs = async () => {
      try {
        const response = await axios.get<Song[]>("http://localhost:8000/recommendations", {
          withCredentials: true,
        });
        const songsWithSelection = response.data.map((song: Song) => ({
          ...song,
          isSelected: false,
        }));
        setRecommendedSongs(songsWithSelection);
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Error al obtener las canciones favoritas";
        setError(errorMessage);
      }
    };

    getRecommendedSongs();
  }, []);

  const handleSelectSong = (song: Song) => {
    setSelectedSongs((prevSelectedSongs) => {
      const isSongSelected = prevSelectedSongs.some((selectedSong) => selectedSong.id === song.id);

      if (isSongSelected) {
        const updatedSongs = prevSelectedSongs.filter((selectedSong) => selectedSong.id !== song.id);
        return updatedSongs;
      } else {
        const updatedSongs = [...prevSelectedSongs, song];
        return updatedSongs;
      }
    });
  };

  const handleCreatePlaylist = () => {
    // Lógica para crear una playlist con las canciones seleccionadas
    console.log("Creando playlist con las siguientes canciones:", selectedSongs);
  };

  function formatDuration(milliseconds: number): string {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minuts = Math.floor((milliseconds / 1000) / 60);
    return `${minuts}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return (
    <div className="flex flex-col items-center bg-gray-900 text-white py-8">
      <h1 className="text-3xl md:text-4xl mt-4 mb-8 font-bold text-center">
        We recommend you to hear this!
      </h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="w-full md:w-2/3">
          <ul>
            {recommendedSongs.map((song, index) => (
              <li key={`id-${index+1}`} className="mb-8">
                <h2 className="text-xl font-bold">{song.name}</h2>
                <p className="text-gray-400">by {song.artist}</p>
                <p className="text-gray-400">Duration: {formatDuration(song.duration)}</p>
                <p className="text-gray-400">Album: {song.album}</p>
                {selectedSongs.some((selectedSong) => selectedSong.id === song.id) ? (
                  <button
                    disabled
                    className="mt-4 bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed"
                  >
                    Selected
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectSong(song)}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Select Song
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCreatePlaylist}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Playlist
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedSongs;