import express from "express";
import passport from "passport";
import * as path from "path";
import cors from "cors";
import { spotifyStrategy } from "./Middlewares/SpotifyStrategyMiddlewares/passportStrategy";
import { corsOptions } from "./Middlewares/corsOptions";
import { initializeApp, createServer } from "./helpers/apphelpers/appConfig";

passport.use(spotifyStrategy);

passport.authenticate("spotify", { failureRedirect: "/auth/spotify" });

// Configuración de Express
const app = express();

app.use(cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.json());

// Configurar la carpeta estática
app.use(express.static(path.join(__dirname, "..", "front", "public")));

// Configurar la ubicación de las vistas
app.set("views", path.join(__dirname, "front/views"));

// Configurar el motor de plantillas
app.set("view engine", "ejs");

// Llamamos a la función initializeApp para configurar las rutas
initializeApp(app);

// Puerto de escucha
const port = 8000;
createServer(app, port);
