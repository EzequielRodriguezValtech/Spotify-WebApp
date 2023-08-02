import React from 'react';
import SpotifyHeader from '../components/spotifyHeader';
import SpotifyFooter from '../components/spotifyFooter';

const SpotifyLogin: React.FC = () => {
  const handleLogin = () => {
    const authorizationUrl = `http://localhost:8000/auth/spotify`;

    window.location.href = authorizationUrl;
  };

  return (
    <>
      <SpotifyHeader />
      <div>
        <h1>Spotify Login</h1>
        <button onClick={handleLogin}>Login with Spotify</button>
      </div>
      <SpotifyFooter />
    </>
  );
};

export default SpotifyLogin;
