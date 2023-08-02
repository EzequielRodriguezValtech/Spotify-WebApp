import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes realizar cualquier lógica necesaria después de la autenticación de Spotify
    // Por ejemplo, almacenar el token de acceso en el estado global o en el almacenamiento local

    // Después de realizar cualquier lógica necesaria, puedes redirigir a la ruta deseada
    navigate('/profile');
  }, [navigate]);

  return (
    <div>
      <h1>Spotify Callback</h1>
      {/* Aquí puedes mostrar cualquier contenido adicional si es necesario */}
    </div>
  );
};

export default SpotifyCallback;