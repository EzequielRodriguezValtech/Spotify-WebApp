import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface User {
    spotifyId: string;
    email: string;
    name: string;
    accesToken: string;
    refreshToken: string;
    Songs: Song[]
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
        const response = await axios.get<{ user: User }>('http://localhost:8000/profile', {
          withCredentials: true,
        });
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <header>
        <h1>My profile</h1>
      </header>
      <main>
        {user && (
          <>
            <h2>Welcome again, {user.spotifyId}!</h2>
            <hr />
            <ul>
              <li>Email: {user.email}</li>
              <li>Name: {user.name}</li>
            </ul>
            <h4>
              <a href="/favorites">Check your top 5 tracks</a>
            </h4>
          </>
        )}
      </main>
    </>
  );
};

export default MyProfile;