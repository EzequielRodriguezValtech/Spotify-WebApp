import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { PrismaClient } from '@prisma/client';


import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from './config/config';
import { getFavoriteSongs } from './controllers/favouriteSongsController';

const prisma = new PrismaClient();
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
      const user = {
        id: profile.id,
        username: profile.username,
        accessToken: accessToken,
      };
      done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my application');
});


app.get('/auth/spotify', passport.authenticate('spotify'));

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    req.session.accessToken = (req.user as any).accessToken;
    req.session.save();
    res.redirect('/success');
  }
);



app.get('/success', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = req.user as any;
    const userAccessToken = user.accessToken;

    if (userAccessToken) {
      // Realiza acciones con el accessToken del usuario
      res.send('Authentication successful');
      console.log(userAccessToken)
    } else {
      res.send('Error: Access token not found');
    }
  } else {
    res.send('Error: Authentication failed');
  }
});

app.get('/favoriteSongs', getFavoriteSongs);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});