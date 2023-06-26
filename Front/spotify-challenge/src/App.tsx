import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FavoriteSongs from './components/FavoriteSongs';
import Profile from './pages/profile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/profile"> Iniciar sesión </Link>
            </li>
            <li>
              <Link to="/favorites">Favorite Songs</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/favorites" element={<FavoriteSongs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
