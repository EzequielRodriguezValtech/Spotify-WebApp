"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_SECRET = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var passport_spotify_1 = require("passport-spotify");
var crypto_1 = require("crypto");
var config_1 = require("./config/config");
var favouriteSongsController_1 = require("./controllers/favouriteSongsController");
var generateSecret = function () {
    var secretBytes = (0, crypto_1.randomBytes)(32);
    var secretKey = (0, crypto_1.createSecretKey)(secretBytes);
    return secretKey.export().toString('hex');
};
exports.SESSION_SECRET = generateSecret();
var app = (0, express_1.default)();
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: exports.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new passport_spotify_1.Strategy({
    clientID: config_1.SPOTIFY_CLIENT_ID,
    clientSecret: config_1.SPOTIFY_CLIENT_SECRET,
    callbackURL: config_1.SPOTIFY_CALLBACK_URL,
}, function (accessToken, refreshToken, expiresIn, profile, done) {
    var user = {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
    };
    console.log(accessToken);
    done(null, user);
}));
app.get('/', function (req, res) {
    var user = req.user;
    if (user) {
        res.send("\u00A1Bienvenido de nuevo, ".concat(user.profile.displayName, "!"));
    }
    else {
        res.send('¡Bienvenido a mi aplicación!');
    }
});
app.get('/login', passport_1.default.authenticate('spotify', {
    scope: ['user-read-private', 'user-read-email'],
}));
app.get('/auth/spotify/callback', passport_1.default.authenticate('spotify', {
    failureRedirect: '/login',
}), function (_req, res) {
    res.redirect('/');
});
app.get('/favorites', favouriteSongsController_1.getFavoriteSongs);
console.log('Listening on 3000');
app.listen(3000);
