import 'tailwindcss/tailwind.css';
import SpotifyHeader from '../components/SpotifyHeader';

import SpotifyFooter from '../components/SpotifyFooter';
import RecommendedSongs from '../components/RecommendedSongs';

const FavoriteSongs = () => {
  return (
    <>
      <SpotifyHeader />
      <RecommendedSongs />
      <SpotifyFooter />
    </>
  );
};

export default FavoriteSongs;
