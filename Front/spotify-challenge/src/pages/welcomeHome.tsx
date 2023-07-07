import WelcomeMessage from '../components/WelcomeMessage';
import SpotifyLogin from '../components/SpotifyLogin';
import SpotifyHeader from '../components/SpotifyHeader';
import SpotifyFooter from '../components/SpotifyFooter';
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
