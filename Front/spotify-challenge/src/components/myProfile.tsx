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
    <div className="min-h-screen bg-gray-100 flex flex-col  items-center">
      <nav className="py-8 flex justify-center p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center">My Profile</h1>
      </nav>
      <main className="flex justify-center items-center max-w-4xl mx-auto px-4">
        {user ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome again, {user.spotifyId}!
            </h2>
            <hr className="my-4" />
            <ul className="mb-4">
              <li className="mb-2">
                <span className="font-semibold">Email:</span> {user.email}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Name:</span> {user.name}
              </li>
            </ul>
            <div className="flex flex-col space-y-2">
              <a
                href="/recommendations"
                className="bg-blue-500 text-white font-bold hover:bg-blue-600 py-2 px-4 rounded transition duration-300"
              >
                Check Some Recommended Tracks
              </a>
              <a
                href="/favorites"
                className="bg-blue-500 text-white font-bold hover:bg-blue-600 py-2 px-4 rounded transition duration-300"
              >
                Check Your Favorite Songs
              </a>
            </div>
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
      </main>
    </div>
  );
};

export default MyProfile;
