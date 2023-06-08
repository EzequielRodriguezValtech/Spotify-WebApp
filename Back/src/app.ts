import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as SpotifyStrategy, Profile } from 'passport-spotify';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from './config/config';
import axios from 'axios';
import { Song } from '@prisma/client';
import ejs from 'ejs';



const prisma = new PrismaClient();

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


// Configurar la carpeta estática
app.use(express.static(path.join(__dirname, '..', 'front', 'public')));

// Configurar la ubicación de las vistas
app.set('views', path.join(__dirname, 'front/views'));

// Configurar el motor de plantillas
app.set('view engine', 'ejs');

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


// function formatDuration(durationMs: number): string {
//   const totalSeconds = Math.floor(durationMs / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   let formattedDuration = '';
//   if (hours > 0) {
//     formattedDuration += `${hours}:`;
//   }
//   formattedDuration += `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

//   return formattedDuration;
// }


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
      const songData = items.map((item: any) => {
        return {
          name: item.name,
          artist: item.artists[0]?.name || '',
          duration: item.duration_ms || 0,
          album: item.album.name,
          albumImage: item.album.images[0]?.url || ''
        };
      });

      // Filtra las canciones existentes en la base de datos
      const existingSongs = await prisma.song.findMany({
        where: {
          name: { in: songData.map((song: { name: any; }) => song.name) },
        },
      });

      // Filtra las canciones que no existen en la base de datos
      const uniqueSongs = songData.filter((song: { name: string; }) => {
        return !existingSongs.find((existingSong) => existingSong.name === song.name);
      });

      // Guarda las canciones únicas en la base de datos
      const createdSongs = await prisma.song.createMany({
        data: uniqueSongs,
      });

      console.log('Canciones creadas:', createdSongs);

      // Obtén las 5 canciones principales para enviar en la respuesta
      const topSongs: Song[] = songData.slice(0, 5);

      ejs.renderFile(__dirname + '/../front/views/favorites.ejs', {songs: topSongs}, (err, html) => {
        if(err){
          console.error('Error al renderizar el archivo favorites.ejs', err)
        } else {
          res.send(html);
        }
      });
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