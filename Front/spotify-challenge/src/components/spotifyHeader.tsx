import React, { useEffect, useState } from 'react';
import spotifyLogo from '../images/Spotify_Logo_RGB_White.png';
import 'tailwindcss/tailwind.css';
import '../index.css';
import axios from 'axios';
import SpotifyLogin from './SpotifyLogin';

interface User {
  spotifyId: string;
  email: string;
  name: string;
  accesToken: string;
  refreshToken: string;
}

const SpotifyHeader: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ user: User }>(
          'http://localhost:8000/profile',
          {
            withCredentials: true,
          }
        );
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="px-2 p-8 h-40 bg-black text-slate-100 flex items-center">
      <div className="spotifyLogo p-5 sm:flex justify-center">
        <a href="/">
          <img src={spotifyLogo} alt="Spotify" className="h-16" />
        </a>
      </div>

      <div className="hiddenLinks">
        <a
          href="https://github.com/EzequielRodriguezValtech/Spotify-WebApp"
          className="mx-5 hover:text-emerald-600 transition duration-700"
        >
          Documentation
        </a>

        {user ? (
          <a href="/profile" className="mx-5 hover:text-emerald-600 transition duration-700">
            {' '}
            {user.name}{' '}
          </a>
        ) : (
          <SpotifyLogin />
        )}
        
      </div>
    </header>
  );
};

export default SpotifyHeader;
