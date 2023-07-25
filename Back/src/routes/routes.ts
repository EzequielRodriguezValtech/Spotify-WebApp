import express from "express";
import spotifyRouter from "./spotifyRouter";

// Función para configurar las rutas de la aplicación
export function configureRoutes(app: express.Express) {
  app.use("/", spotifyRouter);
  app.use("/auth/spotify", spotifyRouter);
  app.use("/auth/spotify/callback", spotifyRouter);
  app.use("/profile", spotifyRouter);
  app.use("/favorites", spotifyRouter);
  app.use("/recommendations", spotifyRouter);
  app.use("/playlist/create", spotifyRouter);
  app.use("/logout", spotifyRouter);
}