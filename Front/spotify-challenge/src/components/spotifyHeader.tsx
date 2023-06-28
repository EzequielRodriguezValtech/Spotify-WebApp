import React from 'react';
import spotifyLogo from '../images/Spotify_Logo_RGB_White.png';
import 'tailwindcss/tailwind.css';
import '../index.css';

const SpotifyHeader: React.FC = () => {
  return (
    <header className="px-2 p-8 h-30 bg-black text-slate-100 flex flex-row items-center flex-wrap ">
      <div className="basis-8/12 p-5 basis-24 flex items-center">
        <a href="/">
          <img src={spotifyLogo} alt="Spotify" className="h-16" />
        </a>
      </div>

      <div className="basis-2/12 flex justify-center items-center text-2xl font-bold h-14 hover:text-emerald-600">
        <a href="https://github.com/EzequielRodriguezValtech/Spotify-WebApp">
          Documentation
        </a>
      </div>
      <hr className="my-2 bg-#0a0a0a" />

      <div className="basis-2/12 flex justify-center items-center text-2xl font-bold h-14 hover:text-emerald-600">
        <a href="/profile">Login</a>
      </div>
    </header>
  );
};

export default SpotifyHeader;
