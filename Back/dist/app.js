"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_spotify_1 = require("passport-spotify");
const client_1 = require("@prisma/client");
const config_1 = require("./config/config");
const favouriteSongsController_1 = require("./controllers/favouriteSongsController");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: config_1.SPOTIFY_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_spotify_1.Strategy({
    clientID: config_1.SPOTIFY_CLIENT_ID,
    clientSecret: config_1.SPOTIFY_CLIENT_SECRET,
    callbackURL: config_1.SPOTIFY_CALLBACK_URL,
}, (accessToken, refreshToken, expires_in, profile, done) => {
    done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
app.get('/auth/spotify', passport_1.default.authenticate('spotify'));
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
});
app.get('/auth/spotify/callback', passport_1.default.authenticate('spotify', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/success');
});
app.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('¡Autenticación exitosa!');
    }
    else {
        res.send('Error de autenticación');
    }
});
app.get('/favorites', favouriteSongsController_1.getFavoriteSongs);
app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000/auth/Spotify');
});
