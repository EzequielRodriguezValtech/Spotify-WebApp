import WelcomeMessage from '../components/WelcomeMessage';
import SpotifyLogin from '../components/SpotifyLogin';
import SpotifyHeader from '../components/spotifyHeader';
import SpotifyFooter from '../components/spotifyFooter';
import 'tailwindcss/tailwind.css';

const WelcomeHome = () => {
  return (
    <>
      <SpotifyHeader />
      <WelcomeMessage />
      <SpotifyLogin />
      <SpotifyFooter />
    </>
  );
};

export default WelcomeHome;
