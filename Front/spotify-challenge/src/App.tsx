import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FavoriteSongs from './components/FavoriteSongs';
import MyProfile from './pages/profile';
import WelcomeMessage from './components/WelcomeMessage';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyCallback from './components/SpotifyCallback';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<WelcomeMessage /> } />
          <Route path="/auth/spotify" element={<SpotifyLogin />} />
          <Route path="/auth/spotify/callback" element={<SpotifyCallback />} />
          <Route path="/profile" element={ <MyProfile />} />
          <Route path="/favorites" element={<FavoriteSongs />} />
        </Routes>
    </Router>
  );
};

export default App;
