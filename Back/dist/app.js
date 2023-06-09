"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var passport_spotify_1 = require("passport-spotify");
var express_session_1 = __importDefault(require("express-session"));
var client_1 = require("@prisma/client");
var path = __importStar(require("path"));
var config_1 = require("./config/config");
var axios_1 = __importDefault(require("axios"));
var ejs_1 = __importDefault(require("ejs"));
var prisma = new client_1.PrismaClient();
passport_1.default.use(new passport_spotify_1.Strategy({
    clientID: config_1.SPOTIFY_CLIENT_ID,
    clientSecret: config_1.SPOTIFY_CLIENT_SECRET,
    callbackURL: config_1.SPOTIFY_CALLBACK_URL,
    scope: ['user-top-read']
}, function (accessToken, refreshToken, expires_in, profile, done) {
    var user = { profile: profile, accessToken: accessToken, refreshToken: refreshToken, expires_in: 500 };
    return done(null, user);
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
var app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: config_1.SPOTIFY_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(express_1.default.static(path.join(__dirname, '..', 'front', 'public')));
app.set('views', path.join(__dirname, 'front/views'));
app.set('view engine', 'ejs');
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/auth/spotify', passport_1.default.authenticate('spotify'));
app.get('/auth/spotify/callback', passport_1.default.authenticate('spotify', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/profile');
});
app.get('/profile', function (req, res) {
    if (req.user) {
        var user = req.user;
        var profile = user.profile, accessToken = user.accessToken, refreshToken = user.refreshToken;
        res.send("Welcome, ".concat(profile.displayName, "!<br>Access Token: ").concat(accessToken, "<br>Refresh Token: ").concat(refreshToken));
    }
    else {
        res.redirect('/login');
    }
});
app.get('/', function (req, res) {
    res.send('Welcome to the server!');
});
app.get('/favorites', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessToken, response, items, songData, existingSongs_1, uniqueSongs, createdSongs, topSongs, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.user) return [3, 7];
                user = req.user;
                accessToken = user.accessToken;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4, axios_1.default.get('https://api.spotify.com/v1/me/top/tracks', {
                        headers: {
                            Authorization: "Bearer ".concat(accessToken),
                        },
                        params: {
                            limit: 5,
                        },
                    })];
            case 2:
                response = _a.sent();
                items = response.data.items;
                songData = items.map(function (item) {
                    var _a, _b;
                    return {
                        name: item.name,
                        artist: ((_a = item.artists[0]) === null || _a === void 0 ? void 0 : _a.name) || '',
                        duration: item.duration_ms || 0,
                        album: item.album.name,
                        albumImage: ((_b = item.album.images[0]) === null || _b === void 0 ? void 0 : _b.url) || ''
                    };
                });
                return [4, prisma.song.findMany({
                        where: {
                            name: { in: songData.map(function (song) { return song.name; }) },
                        },
                    })];
            case 3:
                existingSongs_1 = _a.sent();
                uniqueSongs = songData.filter(function (song) {
                    return !existingSongs_1.find(function (existingSong) { return existingSong.name === song.name; });
                });
                return [4, prisma.song.createMany({
                        data: uniqueSongs,
                    })];
            case 4:
                createdSongs = _a.sent();
                console.log('Canciones creadas:', createdSongs);
                topSongs = songData.slice(0, 5);
                ejs_1.default.renderFile(__dirname + '/../front/views/favorites.ejs', { songs: topSongs }, function (err, html) {
                    if (err) {
                        console.error('Error al renderizar el archivo favorites.ejs', err);
                    }
                    else {
                        res.send(html);
                    }
                });
                return [3, 6];
            case 5:
                error_1 = _a.sent();
                console.error('Error al obtener las canciones principales:', error_1);
                res.status(500).json({ error: 'Error al obtener las canciones principales' });
                return [3, 6];
            case 6: return [3, 8];
            case 7:
                res.status(401).json({ error: 'No se ha proporcionado un token de acceso válido' });
                _a.label = 8;
            case 8: return [2];
        }
    });
}); });
var port = 3000;
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
