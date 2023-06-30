import 'tailwindcss/tailwind.css';
import SpotifyHeader from '../components/spotifyHeader';
import FavoriteSongsList from '../components/FavoriteSongsList';
import SpotifyFooter from '../components/spotifyFooter';

const FavoriteSongs = () => {
  return (
    <>
      <SpotifyHeader />
      <FavoriteSongsList />
      <SpotifyFooter />
    </>
  );
};

export default FavoriteSongs;
