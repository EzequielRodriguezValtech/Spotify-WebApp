import { Request, Response } from "express";
import { User } from "@prisma/client";

async function fetchWebApiForPlaylist(
  endpoint: string,
  method: string,
  accessToken: string,
  body?: any
): Promise<any> {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(body),
  });

  return await res.json();
}

export const createPlaylist = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "No se ha proporcionado un token de acceso válido" });
    }

    const user = req.user as User;
    const accessToken = user.accessToken;
    const { tracksUri } = req.body;

    // Obtener información del usuario
    const userResponse = await fetchWebApiForPlaylist(
      "v1/me",
      "GET",
      accessToken
    );
    const userId = userResponse.id;

    // Crear una nueva playlist
    const playlistResponse = await fetchWebApiForPlaylist(
      `v1/users/${userId}/playlists`,
      "POST",
      accessToken,
      {
        name: "My recommendation playlist",
        description:
          "Playlist created by the tutorial on developer.spotify.com",
        public: false,
      }
    );

    const playlistId = playlistResponse.id;

    // Agregar canciones a la playlist
    await fetchWebApiForPlaylist(
      `v1/playlists/${playlistId}/tracks?uris=${tracksUri.join(",")}`,
      "POST",
      accessToken
    );

    res.json({ playlistId, playlistName: playlistResponse.name });
  } catch (error) {
    console.error("Error al crear la playlist y agregar las canciones:", error);
    res
      .status(500)
      .json({ error: "Error al crear la playlist y agregar las canciones" });
  }
};
