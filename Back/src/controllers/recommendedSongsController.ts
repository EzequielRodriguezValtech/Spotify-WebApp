import { getUserFromRequest } from "../Middlewares/authMiddleware";
import { Request, Response } from "express";
import { getRecommendedSongsTracks } from "../Middlewares/spotifyApiCalls";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function sendRecommendationsToClient(req: Request, res: Response) {
  try {
    const recommendedTracks = await getRecomendedSongs(req, res);

    res.json(recommendedTracks);
  } catch (error) {
    console.error("Error al obtener las canciones recomendadas:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las canciones recomendadas" });
  }
}

async function getRecomendedSongs(req: Request, res: Response) {
  try {
    const user = getUserFromRequest(req);
    const accessToken = user?.accessToken;
    if (!user) {
      throw new Error("No se ha proporcionado un token de acceso válido");
    }
    const idSongs = await getIdSongsFromUser(user?.spotifyId);

    const response = await getRecommendedSongsTracks(idSongs, 10, accessToken);

    const recommendedTracks = response.tracks.map((track: any) => ({
      name: track.name,
      artist: track.artists[0]?.name || "",
      duration: track.duration_ms || 0,
      album: track.album.name,
      uri: track.uri, // Agregar el track URI
    }));

    return recommendedTracks;
  } catch (error) {
    console.error("Error al obtener las canciones recomendadas:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las canciones recomendadas" });
  }
}

async function getIdSongsFromUser(spotifyId: string | undefined) {
  const songs = await prisma.song.findMany({
    where: {
      spotifyUserId: spotifyId,
    },
    select: {
      id: true,
    },
  });

  const idSongs = songs.map((song) => song.id);

  return idSongs;
}
