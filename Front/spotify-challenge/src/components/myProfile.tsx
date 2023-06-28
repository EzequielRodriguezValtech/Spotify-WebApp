import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

interface User {
  spotifyId: string;
  email: string;
  name: string;
  accesToken: string;
  refreshToken: string;
  Songs: Song[];
}

interface Song {
  id: number;
  name: string;
  artist: string;
  duration: number;
  album: string;
  albumImage: string;
}

const MyProfile = () => {
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
    <div className="min-h-screen bg-gray-100">
      <nav className="py-8">
        <h1 className="text-3xl font-bold text-center">My profile</h1>
      </nav>
      <main className="max-w-4xl mx-auto px-4">
        {user && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Welcome again, {user.spotifyId}!
            </h2>
            <hr className="my-4" />
            <ul className="mb-4">
              <li>Email: {user.email}</li>
              <li>Name: {user.name}</li>
            </ul>
            <h4 className="text-xl font-semibold">
              <a href="/favorites" className="text-blue-500 hover:underline">
                Check your top 5 tracks
              </a>
            </h4>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyProfile;
