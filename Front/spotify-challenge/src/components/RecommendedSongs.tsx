import React, { useEffect, useState } from "react";
import axios from "axios";

interface Song {
  uri: any;
  name: string;
  artist: string;
  duration: number;
  album: string;
  id: string;
}

// const RecommendedSongs = () => {
//   const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const getRecommendedSongs = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/recommendations", {
//           withCredentials: true,
//         });
//         setRecommendedSongs(response.data);
//       } catch (error: any) {
//         const errorMessage = error.response?.data?.error || "Error al obtener las canciones favoritas";
//         setError(errorMessage);
//       }
//     };

//     getRecommendedSongs();
//   }, []);
  
 
const RecommendedSongs = () => {
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRecommendedSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recommendations", {
          withCredentials: true,
        });
        setRecommendedSongs(response.data);
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Error al obtener las canciones favoritas";
        setError(errorMessage);
      }
    };

    getRecommendedSongs();
  }, []);

  const getSelectedSongsUris = (): string[] => {
    return selectedSongs.map((song) => song.uri);
  };

  const handleCreatePlaylist = async () => {
    setIsLoading(true);
  
    try {
      const tracksUri = getSelectedSongsUris();
      await axios.post(
        "http://localhost:8000/playlist/create",
        { tracksUri },
        {
          withCredentials: true,
        }
      );
      alert("Playlist creada y canciones agregadas");
  
      // Restablecer el estado de las canciones seleccionadas
      setSelectedSongs([]);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Error al crear la playlist y agregar las canciones";
      alert(errorMessage);
    }
  
    setIsLoading(false);
  };

  const handleSelectSong = (song: Song) => {
    setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, song]);
  };
  

  return (
    <div>
      <h1>We recommend you to hear this!</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <ul>
            {recommendedSongs.map((song) => (
              <li key={song.id}>
                <h2>{song.name}</h2>
                <p>by {song.artist}</p>
                <p>Duration: {song.duration}</p>
                <p>Album: {song.album}</p>
                {selectedSongs.includes(song) ? (
                  <button disabled>Seleccionada</button>
                ) : (
                  <button onClick={() => handleSelectSong(song)}>
                    Seleccionar canción
                  </button>
                )}
              </li>
            ))}
          </ul>
          {selectedSongs.length > 0 && (
            <div>
              <h2>Selected Songs:</h2>
              <ul>
                {selectedSongs.map((song) => (
                  <li key={song.id}>{song.name}</li>
                ))}
              </ul>
              <button onClick={handleCreatePlaylist}>Create Playlist</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default RecommendedSongs;
