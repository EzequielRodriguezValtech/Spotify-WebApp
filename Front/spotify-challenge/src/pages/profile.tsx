import MyProfile from '../components/MyProfile';
import 'tailwindcss/tailwind.css';
import SpotifyHeader from '../components/SpotifyHeader';
import SpotifyFooter from '../components/SpotifyFooter';

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
