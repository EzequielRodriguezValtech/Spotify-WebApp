import { Request, Response } from "express";
import { User } from "@prisma/client";
import { getSongsFromSpotify } from "../Middlewares/spotifyApiCalls";
import {
  createUniqueSongs,
  extractSongDataToSave,
  filterUniqueSongs,
  getExistingSongs,
  getTopSongs,
} from "../Middlewares/songMiddlewares";

export async function GetFavoriteSongs(req: Request, res: Response) {
  if (req.user) {
    const user = req.user as User;
    const accessToken = user.accessToken;

    try {
      const response = await getSongsFromSpotify(
        accessToken,
        "https://api.spotify.com/v1/me/top/tracks",
        5
      );

      const { items } = response.data;

      const songData = extractSongDataToSave(items, user?.spotifyId);

      const existingSongs = getExistingSongs(songData);

      const uniqueSongs = filterUniqueSongs(songData, await existingSongs);

      createUniqueSongs(uniqueSongs);

      const topSongs = await getTopSongs();

      res.json(topSongs);
    } catch (error) {
      console.error("Error al obtener las canciones principales:", error);
      res
        .status(500)
        .json({ error: "Error al obtener las canciones principales" });
    }
  } else {
    res
      .status(401)
      .json({ error: "No se ha proporcionado un token de acceso válido" });
  }
}
