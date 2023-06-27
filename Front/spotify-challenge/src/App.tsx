import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FavoriteSongs from './components/FavoriteSongs';
import Profile from './pages/profile';
import SpotifyLogin from './pages/spotifyLogin';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/auth/spotify">Login</Link>
            </li>
            <li>
              <Link to="/favorites">Favorite Songs</Link>
            </li>
            <li>
              <Link to="/profile">My profile </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/auth/spotify" element={<SpotifyLogin />} />
          <Route path="/favorites" element={<FavoriteSongs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
