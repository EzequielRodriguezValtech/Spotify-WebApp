import express, { Request, Response } from 'express';
import session, { SessionData } from 'express-session';
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { randomBytes, createSecretKey } from 'crypto';

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from './config/config';
import { getFavoriteSongs } from './controllers/favouriteSongsController';

// Define una interfaz personalizada para extender el tipo de sesión
interface CustomSessionData extends SessionData {
  user?: any; // Cambia 'any' por el tipo adecuado de usuario
}

const generateSecret = (): string => {
  const secretBytes = randomBytes(32);
  const secretKey = createSecretKey(secretBytes);
  return secretKey.export().toString('hex');
};

export const SESSION_SECRET = generateSecret();

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser<any, any>((user, done) => {
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOTIFY_CALLBACK_URL,
    },
    (accessToken, refreshToken, expiresIn, profile, done) => {
      // Aquí puedes realizar las acciones necesarias con los datos del usuario,
      // como almacenarlos en la base de datos, etc.
      const user = {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
        
      };
      console.log(accessToken);
      done(null, user);
    }
  )
);

app.get('/', (req: Request, res: Response) => {
  const user = req.user as any;
  if (user) {
    res.send(`¡Bienvenido de nuevo, ${user.profile.displayName}!`);
  } else {
    res.send('¡Bienvenido a mi aplicación!');
  }
});

app.get(
  '/login',
  passport.authenticate('spotify', {
    scope: ['user-read-private', 'user-read-email'],
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/login',
  }),
  (_req: Request, res: Response) => {
    res.redirect('/');
  }
);

app.get(
  '/favorites', getFavoriteSongs
);

console.log('Listening on 3000');
app.listen(3000);