"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_spotify_1 = require("passport-spotify");
exports.passportConfig = passport_1.default.use(new passport_spotify_1.Strategy({
    clientID: '275757ca22294854a37031b1e2d240eb',
    clientSecret: 'a00a6788c45c451ca8142a12cf986b6b',
    callbackURL: 'http://localhost:3000/auth/spotify/callback',
    scope: ['user-top-read']
}, function (accessToken, refreshToken, expires_in, profile, done) {
    const user = { profile, accessToken, refreshToken, expires_in: 500 };
    return done(null, user);
}));
