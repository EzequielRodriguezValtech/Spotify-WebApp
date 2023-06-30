import express from "express";
import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import session from "express-session";
import * as path from "path";
import spotifyRouter from "./routes/routes";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_URL,
} from "./config/config";

const prisma = new PrismaClient();

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOTIFY_CALLBACK_URL,
      scope: ["user-top-read", "user-read-email", "user-read-private"],
      showDialog: true,
    },
    async (
      accessToken: string,
      refreshToken: string,
      expires_in: number,
      profile: any,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const user = await prisma.user.findUnique({
          where: { spotifyId: profile.id },
        });

        const primaryEmail =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : "";

        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + expires_in);

        if (user) {
          // Actualizar el token de acceso y la fecha de vencimiento en la base de datos
          await prisma.user.update({
            where: { id: user.id },
            data: {
              accessToken: accessToken,
              expiresAt: expirationDate,
            },
          });

          done(null, user);
        } else {
          const newUser = await prisma.user.create({
            data: {
              spotifyId: profile.id,
              name: profile.displayName,
              email: primaryEmail,
              expiresAt: expirationDate,
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          });

          const client_id = SPOTIFY_CLIENT_ID;
          const redirect_uri = encodeURIComponent(SPOTIFY_CALLBACK_URL);
          const scopes = 'user-read-private user-read-email';

          const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;

          done(null, { user: newUser, authorizationUrl });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

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
app.use("/recommendations", spotifyRouter)
app.post("/playlist/add", spotifyRouter)
app.post("/playlist/create", spotifyRouter)
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
