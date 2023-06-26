import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FavoriteSongs from './components/FavoriteSongs';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {/* <li>
              <Link to="/profile"> Iniciar sesión </Link>
            </li> */}
            <li>
              <Link to="/favorites">Favorite Songs</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/favorites" element={<FavoriteSongs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;