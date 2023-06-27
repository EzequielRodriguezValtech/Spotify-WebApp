import React from 'react';

const SpotifyLogin: React.FC = () => {
  const handleLogin = () => {
    const authorizationUrl = `http://localhost:8000/auth/spotify`;

    window.location.href = authorizationUrl;
  };

  return (
    <div>
      <h1>Spotify Login</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyLogin;
