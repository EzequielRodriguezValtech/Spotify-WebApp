import 'tailwindcss/tailwind.css';
import '../index.css';
import LogoutButton from './LogoutButton';
import SpotifyLogin from './SpotifyLogin';

interface User {
  spotifyId: string;
  email: string;
  name: string;
  accesToken: string;
  refreshToken: string;
}

const HeaderLinks = ({ user }: { user: User | undefined }) => {
  return (
    <div className='headerLinks'>
      <a
        href="https://github.com/EzequielRodriguezValtech/Spotify-WebApp"
        className="mx-5 hover:text-emerald-600 transition duration-700"
      >
        Documentation
      </a>

      {user ? (
        <>
          <a
            href="/profile"
            className="mx-5 hover:text-emerald-600 transition duration-700"
          >
            {' '}
            {user.name}{' '}
          </a>
          <LogoutButton />
        </>
      ) : (
        <SpotifyLogin />
      )}
    </div>
  );
};

export default HeaderLinks;
