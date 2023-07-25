import express from "express";
import passport from "passport";
import session from "express-session";
import { spotifyStrategy } from "../../Middlewares/SpotifyStrategyMiddlewares/passportStrategy";
import { SPOTIFY_CLIENT_SECRET } from "../../config/config";
import { configureRoutes } from "../../routes/routes";


// Función que inicializa la aplicación y configura las rutas
// Función que inicializa la aplicación y configura las rutas
export function initializeApp(app: express.Express) {
  // Inicializar el middleware de express-session
  app.use(
    session({
      secret: SPOTIFY_CLIENT_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  // Inicializar el middleware de passport
  passport.use(spotifyStrategy);
  app.use(passport.initialize());
  app.use(passport.session());

  // Serializar el usuario en la sesión
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  // Deserializar el usuario de la sesión
  passport.deserializeUser<any, any>((user: any, done) => {
    done(null, user);
  });

  configureRoutes(app);
}

// Función que crea el servidor y lo pone a la escucha en el puerto especificado
export function createServer(app: express.Express, port: number) {
  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  return server;
}
