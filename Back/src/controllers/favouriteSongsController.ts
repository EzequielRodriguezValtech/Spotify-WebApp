import { Request, Response } from "express";
import { PrismaClient, Song, User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";

const prisma = new PrismaClient();

function formatDuration(duration: number): string {
  const formattedDuration = format(duration, 'HH:mm:ss');
  return formattedDuration;
}


export async function GetFavoriteSongs(req: Request, res: Response) {
  if (req.user) {
    const user = req.user as User;
    const accessToken = user.accessToken;

    

    try {
      const response = await axios.get<any>(
        'https://api.spotify.com/v1/me/top/tracks',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          userId: user.id,
          id: item.id
        };
      });

      // Filtra las canciones existentes en la base de datos
      const songIds = songData.map((song: { id: number }) => song.id);
      const existingSongs = await prisma.song.findMany({
        where: {
          id: { in: songIds },
        },
      });

      // Filtra las canciones que no existen en la base de datos
      const uniqueSongs = songData.filter((song: { name: string }) => {
        return !existingSongs.find(
          (existingSong: { name: string }) => existingSong.name === song.name
        );
      });

      // Guarda las canciones únicas en la base de datos
      const createdSongs = await prisma.song.createMany({
        data: uniqueSongs,
      });
      console.log('Canciones creadas:', createdSongs);

      // Obtén las 5 canciones principales
      const topSongs: Song[] = await prisma.song.findMany({
        take: 5,
      });

      res.json(topSongs);
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