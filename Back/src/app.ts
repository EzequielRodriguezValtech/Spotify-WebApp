import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as SpotifyStrategy, Profile } from 'passport-spotify';
import session from 'express-session';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from './config/config';
import axios from 'axios';

// Configuración de Passport
passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOTIFY_CALLBACK_URL,
      scope: ['user-top-read']
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      const user = { profile, accessToken, refreshToken, expires_in: 500};
      return done(null, user);
    }
  )
);

// Serializar el usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializar el usuario de la sesión
passport.deserializeUser<any, any>((user, done) => {
  done(null, user);
});

// Configuración de Express
const app = express();
app.use(
  session({
    secret: SPOTIFY_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Ruta de inicio de sesión de Spotify
app.get('/auth/spotify', passport.authenticate('spotify'));

// Ruta de redireccionamiento de Spotify después de la autenticación
app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    res.redirect('/profile');
  }
);

// Ruta de perfil protegida
app.get('/profile', (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user as { profile: Profile; accessToken: string; refreshToken: string };
    const { profile, accessToken, refreshToken } = user;
    res.send(`Welcome, ${profile.displayName}!<br>Access Token: ${accessToken}<br>Refresh Token: ${refreshToken}`);
  } else {
    res.redirect('/login');
  }
});

// Ruta principal
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the server!');
});


// Ruta de canciones favoritas protegida
app.get('/favorites', async (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user as { accessToken: string };

    const accessToken = user.accessToken;

    try {
      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 5, // Obtén las 5 canciones principales
        },
      });

      const { items } = response.data;
      // Aquí puedes procesar los datos de las canciones y enviar la respuesta al cliente
      const songNames = items.map((item:any) => item.name)

      res.json(songNames);
    } catch (error) {
      console.error('Error al obtener las canciones principales:', error);
      res.status(500).json({ error: 'Error al obtener las canciones principales' });
    }
  } else {
    res.status(401).json({ error: 'No se ha proporcionado un token de acceso válido' });
  }
});

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});