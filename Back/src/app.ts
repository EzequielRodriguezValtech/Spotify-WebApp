import express from 'express';
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import session from 'express-session';
import * as path from 'path';
import  spotifyRouter  from "./routes/routes";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from './config/config';


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
      const user = { profile, accessToken, refreshToken, expires_in: 5000};
      return done(null, user);
    }
  )
);

passport.authenticate('spotify', { failureRedirect: '/auth/spotify' });

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

// Configurar la carpeta estática
app.use(express.static(path.join(__dirname, '..', 'front', 'public')));

// Configurar la ubicación de las vistas
app.set('views', path.join(__dirname, 'front/views'));

// Configurar el motor de plantillas
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', spotifyRouter);
app.use('/auth/spotify', passport.authenticate('spotify'), spotifyRouter);
app.use('/auth/spotify/callback', spotifyRouter);
app.use('/profile', spotifyRouter);
app.use('/favorites', spotifyRouter);

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});