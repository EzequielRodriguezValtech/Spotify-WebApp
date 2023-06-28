import React from 'react';
import SpotifyLogin from './SpotifyLogin';
import SpotifyHeader from './spotifyHeader';

const WelcomeMessage: React.FC = () => {
  return (
    <>
      <SpotifyHeader />
      <h1>Welcome to the server!</h1>
      <SpotifyLogin />
    </>
  );
};

export default WelcomeMessage;
