import 'tailwindcss/tailwind.css';
import SpotifyHeader from '../components/SpotifyHeader';
import FavoriteSongsList from '../components/FavoriteSongsList';
import SpotifyFooter from '../components/SpotifyFooter';

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
