import { Request, Response } from "express";
import { User } from "@prisma/client";
import { fetchWebApi } from "../Middlewares/spotifyApiCalls";

export async function createPlaylist(
  req: Request,
  res: Response,
  tracksUri: any
) {
  if (req.user) {
    const user = req.user as User;
    const accessToken = user.accessToken;

    try {
      const { id: user_id } = await fetchWebApi("v1/me", "GET", accessToken);

      const playlistResponse = await fetchWebApi(
        `v1/users/${user_id}/playlists`,
        "POST",
        accessToken,
        {
          name: "Recomendation Playlist",
          description: "Playlist created by the recommendation system",
          public: false,
        }
      );
      const playlistId = playlistResponse.id;

      await fetchWebApi(
        `v1/playlists/${playlistId}/tracks`,
        "POST",
        accessToken,
        {
          uris: tracksUri,
        }
      );
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
