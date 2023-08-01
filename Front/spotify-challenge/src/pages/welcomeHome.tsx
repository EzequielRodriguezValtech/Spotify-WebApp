import WelcomeMessage from '../components/WelcomeMessage';
import SpotifyLogin from '../components/SpotifyLogin';
import SpotifyHeader from '../components/SpotifyHeader';
import SpotifyFooter from '../components/SpotifyFooter';
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
