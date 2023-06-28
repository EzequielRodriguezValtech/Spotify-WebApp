import 'tailwindcss/tailwind.css';
import SpotifyHeader from '../components/spotifyHeader';
import FavoriteSongsList from '../components/FavoriteSongsList';

const FavoriteSongs = () => {
  return (
      <>
      <SpotifyHeader />
      <FavoriteSongsList />
      </>
  );
};

export default FavoriteSongs;