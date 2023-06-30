import express from "express";
import passport from "passport";
import session from "express-session";
import * as path from "path";
import spotifyRouter from "./routes/routes";
import cors from "cors";
import { spotifyStrategy } from "./Middlewares/SpotifyStrategyMiddlewares/passportStrategy";
import { SPOTIFY_CLIENT_SECRET } from "./config/config";


passport.use(spotifyStrategy);

passport.authenticate("spotify", { failureRedirect: "/auth/spotify" });

// Serializar el usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializar el usuario de la sesión
passport.deserializeUser<any, any>(
  (user: any, done: (arg0: null, arg1: any) => void) => {
    done(null, user);
  }
);

// Configuración de Express
const app = express();

// Configurar CORS con opciones personalizadas
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000", // Especifica el origen permitido
  methods: "GET, POST, PUT, DELETE", // Especifica los métodos permitidos
  allowedHeaders: ["Content-Type, Authorization"], // Especifica los encabezados permitidos
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: SPOTIFY_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
  express.json()
);

// Configurar la carpeta estática
app.use(express.static(path.join(__dirname, "..", "front", "public")));

// Configurar la ubicación de las vistas
app.set("views", path.join(__dirname, "front/views"));

// Configurar el motor de plantillas
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", spotifyRouter);
app.use("/auth/spotify", spotifyRouter);
app.use("/auth/spotify/callback", spotifyRouter);
app.use("/profile", spotifyRouter);
app.use("/favorites", spotifyRouter);
app.use("/recommendations", spotifyRouter);
app.post("/playlist/add", spotifyRouter);
app.post("/playlist/create", spotifyRouter);
app.use("/logout", spotifyRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Puerto de escucha
const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
