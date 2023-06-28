import express, {  Request, Response } from 'express';
import { GetFavoriteSongs } from '../controllers/favouriteSongsController';
import { GetProtectedProfile } from '../controllers/protectedProfile';
import { Welcome } from '../controllers/serverWelcome';
import passport, { session } from 'passport';
import { SPOTIFY_CALLBACK_URL, SPOTIFY_CLIENT_ID } from '../config/config';


const spotifyRouter = express.Router();

// Ruta principal
spotifyRouter.get('/', Welcome);

// Ruta de inicio de sesión de Spotify
// spotifyRouter.get('/auth/spotify', passport.authenticate('spotify'));        
spotifyRouter.get('/auth/spotify', async (req: Request, res: Response) => {
  const client_id = SPOTIFY_CLIENT_ID;
  const redirect_uri = 'http://localhost:8000/auth/spotify/callback';
  const scopes = 'user-read-private user-read-email';

  const authorizationUrl = `http://localhost:8000/auth/spotify/callback`;
  res.redirect(authorizationUrl);
});

// Ruta de redireccionamiento de Spotify después de la autenticación
spotifyRouter.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { successRedirect: 'http://localhost:3000/profile', failureRedirect: '/error' }),
);

// Ruta de perfil protegida
spotifyRouter.get('/profile', GetProtectedProfile);

// Ruta de canciones favoritas protegida
spotifyRouter.get('/favorites', GetFavoriteSongs);

//Ruta deslogeo
spotifyRouter.get('/logout', (req: Request, res: Response) => {
  req.session.destroy(session);
  res.redirect('/');
});

export default spotifyRouter;
function done(arg0: null, arg1: { authorizationUrl: string; }) {
  throw new Error('Function not implemented.');
}

