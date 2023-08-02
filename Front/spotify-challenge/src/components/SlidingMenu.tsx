import 'tailwindcss/tailwind.css';
import '../index.css';
import HeaderLinks from './HeaderLinks';

interface User {
  spotifyId: string;
  email: string;
  name: string;
  accesToken: string;
  refreshToken: string;
}

const NavBar = ({ open, user }: { open: boolean; user: User | undefined }) => {
  return (
    <nav
      data-open={open}
      className={`slide-menu ${open ? '' : 'slide-menu--closed'}`}
    >
      <HeaderLinks user={user} />
    </nav>
  );
};

export default NavBar;
