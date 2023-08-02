import express, { Request, Response } from "express";
import { GetFavoriteSongs } from "../controllers/favouriteSongsController";
import { GetProtectedProfile } from "../controllers/protectedProfile";
import { Welcome } from "../controllers/serverWelcome";
import passport, { LogOutOptions } from "passport";
import { sendRecommendationsToClient } from "../controllers/recommendedSongsController";
import { createPlaylist } from "../controllers/createPlaylistController";

const spotifyRouter = express.Router();

// Ruta principal
spotifyRouter.get("/", Welcome);

// Ruta de inicio de sesión de Spotify
spotifyRouter.get("/auth/spotify", passport.authenticate("spotify"));

// Ruta de redireccionamiento de Spotify después de la autenticación
spotifyRouter.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", {
    successRedirect: "http://localhost:3000/profile",
    failureRedirect: "/error",
  })
);

// Ruta de perfil protegida
spotifyRouter.get("/profile", GetProtectedProfile);

// Ruta de canciones favoritas protegida
spotifyRouter.get("/favorites", GetFavoriteSongs);

// Ruta de canciones recomendadas protegida
spotifyRouter.get("/recommendations", sendRecommendationsToClient);

// Ruta para crear una nueva playlist y agregar canciones
spotifyRouter.post("/playlist/create", createPlaylist);

//Ruta de deslogue
spotifyRouter.get('/logout', function(req: Request, res: Response) {
  const logoutOptions: LogOutOptions = {
    keepSessionInfo: true // Mantener información de sesión, si es necesario
  };

  req.logout(function(err: any) {
    if (err) {
      console.log(err);
    }
    // Realizar cualquier limpieza o acciones adicionales necesarias con logoutOptions
    if (logoutOptions.keepSessionInfo) {
      // Realizar acciones específicas si se mantiene la información de sesión
      res.redirect('http://localhost:3000')
    }
  });
});


export default spotifyRouter;
