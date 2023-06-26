import { useEffect, useState } from 'react';
import axios from 'axios';

const FavoriteSongs = () => {
  // Definir el estado local para almacenar las canciones favoritas
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener las canciones favoritas
    const getFavoriteSongs = async () => {
      try {
        // Realizar la solicitud GET al endpoint '/favorites'
        const response = await axios.get('/favorites');

        // Actualizar el estado con los datos de las canciones favoritas recibidas en la respuesta
        setFavoriteSongs(response.data);
      } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al obtener las canciones favoritas:', error);
      }
    };

    // Llamar a la función para obtener las canciones favoritas cuando el componente se monta
    getFavoriteSongs();
  }, []); // El array vacío [] asegura que este efecto solo se ejecute una vez, al montar el componente

  return (
    <div>
      <h1>My Favorite Songs</h1>
      <ul>
        {/* Mapear las canciones favoritas y mostrar los detalles */}
        {favoriteSongs.map((song: any) => (
          <li key={song.name}>
            <h2>{song.name}</h2>
            <p>by {song.artist}</p>
            <p>Duration: {song.duration}</p>
            <p>Album: {song.album}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteSongs;