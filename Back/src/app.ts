import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { PrismaClient } from '@prisma/client'
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from './config/config'; // Archivo de configuración

export const prisma = new PrismaClient()

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

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOTIFY_CALLBACK_URL,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // Realiza acciones con el token de acceso y el perfil del usuario
      // Por ejemplo, puedes guardar la información en una base de datos o realizar redirecciones
      done(null, profile);
    }
  )
);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi aplicación!');
});


app.get('/auth/spotify', passport.authenticate('spotify'));

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // Realiza acciones después de la autenticación
    res.redirect('/success');
  }
);

app.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    // El usuario se autenticó correctamente
    // Realiza acciones adicionales aquí
    res.send('¡Autenticación exitosa!');
  } else {
    // El usuario no se autenticó correctamente
    res.send('Error de autenticación');
  }
});


app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
