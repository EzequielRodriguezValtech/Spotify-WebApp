import 'tailwindcss/tailwind.css';
import SpotifyHeader from '../components/spotifyHeader';

import SpotifyFooter from '../components/spotifyFooter';
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
