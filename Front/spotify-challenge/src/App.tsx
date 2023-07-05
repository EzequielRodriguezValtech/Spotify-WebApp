import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeHome from './pages/WelcomeHome';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyCallback from './components/SpotifyCallback';
import Profile from './pages/Profile';
import FavoriteSongs from './pages/FavoriteSongs';
import RecommendedSongsPage from './pages/RecommendedSongsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeHome />} />
        <Route path="/auth/spotify" element={<SpotifyLogin />} />
        <Route path="/auth/spotify/callback" element={<SpotifyCallback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<FavoriteSongs />} />
        <Route path="/recommendations" element={<RecommendedSongsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
