import React, { useEffect, useState } from 'react';
import spotifyLogo from '../images/Spotify_Logo_RGB_White.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import '../index.css';
import axios from 'axios';
import Navbar from './SlidingMenu';
import HeaderLinks from './HeaderLinks';

interface User {
  spotifyId: string;
  email: string;
  name: string;
  accesToken: string;
  refreshToken: string;
}

const SpotifyHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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

      {!open ? (
        <menu onClick={handleClick} className="slideMenuButton">
          <FontAwesomeIcon icon={faChevronDown} style={{ color: '#f1f5f9' }} />
        </menu>
      ) : (
        <menu onClick={handleClick} className="slideMenuButton">
          <FontAwesomeIcon icon={faChevronUp} style={{ color: '#f1f5f9' }} />
        </menu>
      )}

      <Navbar open={open} user={user || undefined} />

      <div className="visibleLinks">
        <HeaderLinks user={user || undefined} />
      </div>
    </header>
  );
};

export default SpotifyHeader;
