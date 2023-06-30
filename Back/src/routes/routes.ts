import express, { Request, Response } from "express";
import { GetFavoriteSongs } from "../controllers/favouriteSongsController";
import { GetProtectedProfile } from "../controllers/protectedProfile";
import { Welcome } from "../controllers/serverWelcome";
import passport, { session } from "passport";
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

//Ruta deslogeo
spotifyRouter.get("/logout", (req: Request, res: Response) => {
  req.session.destroy(session);
  res.redirect("/");
});

// spotifyRouter.post("/playlist/add", createPlaylist)

export default spotifyRouter;
function done(arg0: null, arg1: { authorizationUrl: string }) {
  throw new Error("Function not implemented.");
}
