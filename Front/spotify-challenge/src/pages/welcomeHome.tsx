import WelcomeMessage from '../components/WelcomeMessage';
import SpotifyLogin from '../components/SpotifyLogin';
import SpotifyHeader from '../components/spotifyHeader';
import SpotifyFooter from '../components/spotifyFooter';
import 'tailwindcss/tailwind.css';

const WelcomeHome = () => {
  return (
    <div className="flex flex-col h-screen">
      <SpotifyHeader />
      <WelcomeMessage />
      <SpotifyLogin />
      <SpotifyFooter />
    </div>
  );
};

export default WelcomeHome;
