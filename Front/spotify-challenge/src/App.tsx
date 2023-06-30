import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeMessage from './components/WelcomeMessage';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyCallback from './components/SpotifyCallback';
import Profile from './pages/profile';
import RecommendedSongs from './components/RecommendedSongs';
import './styles/styles.css';
import FavoriteSongsPage from './pages/Favorites';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<WelcomeMessage /> } />
          <Route path="/auth/spotify" element={<SpotifyLogin />} />
          <Route path="/auth/spotify/callback" element={<SpotifyCallback />} />
          <Route path="/profile" element={ <Profile />} />
          <Route path="/favorites" element={<FavoriteSongsPage />} />
          <Route path="/recommendations" element={< RecommendedSongs />} />
        </Routes>
    </Router>
  );
};

export default App;
