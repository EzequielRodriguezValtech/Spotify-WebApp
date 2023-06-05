"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_spotify_1 = require("passport-spotify");
const client_1 = require("@prisma/client");
const config_1 = require("./config/config");
const favouriteSongsController_1 = require("./controllers/favouriteSongsController");
const prisma = new client_1.PrismaClient();
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
    const user = {
        id: profile.id,
        username: profile.username,
        accessToken: accessToken,
    };
    done(null, user);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
app.get('/', (req, res) => {
    res.send('Welcome to my application');
});
app.get('/auth/spotify', passport_1.default.authenticate('spotify'));
app.get('/auth/spotify/callback', passport_1.default.authenticate('spotify', { failureRedirect: '/login' }), (req, res) => {
    req.session.accessToken = req.user.accessToken;
    req.session.save();
    res.redirect('/success');
});
app.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        const userAccessToken = user.accessToken;
        if (userAccessToken) {
            res.send('Authentication successful');
            console.log(userAccessToken);
        }
        else {
            res.send('Error: Access token not found');
        }
    }
    else {
        res.send('Error: Authentication failed');
    }
});
app.get('/favoriteSongs', favouriteSongsController_1.getFavoriteSongs);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
