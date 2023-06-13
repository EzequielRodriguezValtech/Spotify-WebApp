import express from 'express';
<<<<<<< HEAD
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import session from 'express-session';
import * as path from 'path';
import  spotifyRouter  from "./routes/routes";
=======
import passport, { use } from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import session from 'express-session';
import * as path from 'path';
import spotifyRouter from './routes/routes';
import { PrismaClient } from '@prisma/client';
>>>>>>> main
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from './config/config';

<<<<<<< HEAD

// Configuración de Passport
=======
const prisma = new PrismaClient();

// Configuración de Passport1
>>>>>>> main
passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOTIFY_CALLBACK_URL,
<<<<<<< HEAD
      scope: ['user-top-read']
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      const user = { profile, accessToken, refreshToken, expires_in: 5000};
      return done(null, user);
=======
      scope: ['user-top-read', 'user-read-email', 'user-read-private'],
      showDialog: true,
    },
    async (accessToken: any, refreshToken: any, expires_in: any, profile: any, done: (arg0: null, arg1: { profile: any; accessToken: any; refreshToken: any; expires_in: any; }) => any) => {
      const user = { profile, accessToken, refreshToken, expires_in };
      return done(null, user);
      // try {
      //   const user = await prisma.user.findUnique({
      //     where: { spotifyId: profile.id },
      //   });
      //   const primaryEmail =
      //     profile.emails && profile.emails.length > 0
      //       ? profile.emails[0].value
      //       : '';
      //   const expirationDate = new Date();
      //   expirationDate.setSeconds(expirationDate.getSeconds() + expires_in);
      //   if (user) {
      //     return done(null, user);
      //   } else {
      //     const newUser = await prisma.user.create({
      //       data: {
      //         spotifyId: profile.id,
      //         name: profile.displayName,
      //         email: primaryEmail,
      //         expiresAt: expirationDate,
      //         accessToken: accessToken,
      //         refreshToken: refreshToken,
      //       },
      //     });
      //     return done(null, newUser);
      //   }
      // } catch (error) {
      //   // return done(error)
      // }
>>>>>>> main
    }
  )
);

passport.authenticate('spotify', { failureRedirect: '/auth/spotify' });

// Serializar el usuario en la sesión
<<<<<<< HEAD
passport.serializeUser((user, done) => {
=======
passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
>>>>>>> main
  done(null, user);
});

// Deserializar el usuario de la sesión
<<<<<<< HEAD
passport.deserializeUser<any, any>((user, done) => {
=======
passport.deserializeUser<any, any>((user: any, done: (arg0: null, arg1: any) => void) => {
>>>>>>> main
  done(null, user);
});

// Configuración de Express
const app = express();
app.use(
  session({
<<<<<<< HEAD
    secret: SPOTIFY_CLIENT_SECRET,
=======
    secret: 'secreto123',
>>>>>>> main
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
<<<<<<< HEAD
app.use('/auth/spotify', passport.authenticate('spotify'), spotifyRouter);
app.use('/auth/spotify/callback', spotifyRouter);
app.use('/profile', spotifyRouter);
app.use('/favorites', spotifyRouter);
=======
app.use('/auth/spotify', spotifyRouter);
app.use('/auth/spotify/callback', spotifyRouter);
app.use('/profile', spotifyRouter);
app.use('/favorites', spotifyRouter);
app.use('/logout', spotifyRouter);
>>>>>>> main

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> main
