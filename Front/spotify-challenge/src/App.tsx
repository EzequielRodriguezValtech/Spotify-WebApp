import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FavoriteSongs from './components/FavoriteSongs';
import WelcomeMessage from './components/WelcomeMessage';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyCallback from './components/SpotifyCallback';
import Profile from './pages/profile';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<WelcomeMessage /> } />
          <Route path="/auth/spotify" element={<SpotifyLogin />} />
          <Route path="/auth/spotify/callback" element={<SpotifyCallback />} />
          <Route path="/profile" element={ <Profile />} />
          <Route path="/favorites" element={<FavoriteSongs />} />
        </Routes>
    </Router>
  );
};

export default App;
