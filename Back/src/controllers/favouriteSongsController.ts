import axios from 'axios';
import { Request, Response } from 'express';
import { PrismaClient, Song, User } from '@prisma/client';
import ejs from 'ejs';


const prisma = new PrismaClient();

export async function GetFavoriteSongs(req: Request, res: Response) {
  if (req.user) {
    const user = req.user as User;

    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks',
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          params: {
            limit: 5, // Obtén las 5 canciones principales
          },
        }
      );

      const { items } = response.data;
      const songData = items.map((item: any) => {
        return {
          name: item.name,
          artist: item.artists[0]?.name || '',
          duration: item.duration_ms || 0,
          album: item.album.name,
          userId: user.id, // Asignar el ID del usuario actual a cada canción
        };
      });

      // Filtra las canciones existentes en la base de datos
      const existingSongs = await prisma.song.findMany({
        where: {
          name: { in: songData.map((song: { name: string }) => song.name) },
        },
      });

      // Filtra las canciones que no existen en la base de datos
      const uniqueSongs = songData.filter((song: { name: string }) => {
        return !existingSongs.find(
          (existingSong: { name: string; }) => existingSong.name === song.name
        );
      });

      // Guarda las canciones únicas en la base de datos
      const createdSongs = await prisma.song.createMany({
        data: uniqueSongs,
      });

      console.log('Canciones creadas:', createdSongs);

      // Obtén las 5 canciones principales del usuario para enviar en la respuesta
      const topSongs: Song[] = await prisma.song.findMany({
        where: {
          userId: user.id,
        },
        take: 5,
      });

      if (topSongs.length !== 0) {
        const renderedHtml = await ejs.renderFile(
          __dirname + '/../../front/views/favorites.ejs',
          { songs: topSongs }
        );
        res.send(renderedHtml);
      } else {
        res.redirect('/favorites');
      }
    } catch (error) {
      console.error('Error al obtener las canciones principales:', error);
      res
        .status(500)
        .json({ error: 'Error al obtener las canciones principales' });
    }
  } else {
    res
      .status(401)
      .json({ error: 'No se ha proporcionado un token de acceso válido' });
  }
}