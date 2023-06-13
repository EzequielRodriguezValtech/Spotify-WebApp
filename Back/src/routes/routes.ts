import express, { NextFunction, Request, Response } from 'express';
import { GetFavoriteSongs } from '../controllers/favouriteSongsController';
import { GetProtectedProfile } from '../controllers/protectedProfile';
import { AuthProfile } from '../controllers/passportAuth';
import { Welcome } from '../controllers/serverWelcome';
import passport, { session } from 'passport';

const spotifyRouter = express.Router();

// Ruta principal
spotifyRouter.get('/', Welcome);

// Ruta de inicio de sesión de Spotify
spotifyRouter.get('/auth/spotify', passport.authenticate('spotify'));

// Ruta de redireccionamiento de Spotify después de la autenticación
spotifyRouter.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify'),
  AuthProfile
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
