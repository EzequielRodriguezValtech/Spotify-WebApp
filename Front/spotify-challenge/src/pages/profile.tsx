import MyProfile from '../components/MyProfile';
import 'tailwindcss/tailwind.css';
import SpotifyHeader from '../components/spotifyHeader';
import SpotifyFooter from '../components/spotifyFooter';

const Profile = () => {
  return (
    <>
      <SpotifyHeader />
      <MyProfile />
      <SpotifyFooter />
    </>
  );
};

export default Profile;