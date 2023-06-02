import axios from 'axios';
import { Request, Response } from 'express';

declare module 'express-session' {
    interface SessionData {
      accessToken: string;
    }
  }

export async function getFavoriteSongs(req: Request, res: Response) {
  if (req.isAuthenticated()) {
    const accessToken = req.session.accessToken;

    try {
      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const favoriteSongs = response.data.items;

      // Aquí puedes realizar acciones adicionales con las canciones favoritas, como almacenarlas en la base de datos

      res.json(favoriteSongs);
    } catch (error) {
      console.error('Error al obtener las canciones favoritas:', error);
      res.status(500).json({ error: 'Error al obtener las canciones favoritas' });
    }
  } else {
    res.status(401).json({ error: 'No autenticado' });
  }
}