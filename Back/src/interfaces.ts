
interface User {
  spotifyId: string;
  email: string;
  name: string;
  accesToken: string;
  refreshToken: string;
  Songs: Song[]
}


interface Song {
id: string;
name: string;
artist: string;
duration: number;
album: string;
spotifyUserId: string;
}