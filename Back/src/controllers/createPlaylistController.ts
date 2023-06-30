import { Request, Response } from "express";
import { User } from "@prisma/client";
import { fetchWebApi } from "../Middlewares/spotifyApiCalls";

export async function createPlaylist(req: Request, res: Response) {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "No se ha proporcionado un token de acceso válido" });
  }

  const user = req.user as User;
  const accessToken = user.accessToken;
  const { tracksUri } = req.body;

  try {
    // Obtener ID del usuario
    const userResponse = await fetchWebApi("v1/me", "GET", accessToken);
    const userId = userResponse.id;

    // Crear playlist
    const playlistResponse = await fetchWebApi(
      `v1/users/${userId}/playlists`,
      "POST",
      accessToken,
      {
        name: "Recomendation Playlist",
        description: "Playlist created by the recommendation system",
        public: false,
      }
    );
    const playlistId = playlistResponse.id;

    // Agregar canciones a la playlist
    await fetchWebApi(
      `v1/playlists/${playlistId}/tracks`,
      "POST",
      accessToken,
      {
        uris: tracksUri,
      }
    );

    res.json({ message: "Playlist creada y canciones agregadas" });
  } catch (error) {
    console.error("Error al crear la playlist y agregar las canciones:", error);
    res
      .status(500)
      .json({ error: "Error al crear la playlist y agregar las canciones" });
  }
}
