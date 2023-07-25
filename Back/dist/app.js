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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const path = __importStar(require("path"));
const cors_1 = __importDefault(require("cors"));
const passportStrategy_1 = require("./Middlewares/SpotifyStrategyMiddlewares/passportStrategy");
const corsOptions_1 = require("./Middlewares/corsOptions");
const appConfig_1 = require("./helpers/apphelpers/appConfig");
passport_1.default.use(passportStrategy_1.spotifyStrategy);
passport_1.default.authenticate("spotify", { failureRedirect: "/auth/spotify" });
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, "..", "front", "public")));
app.set("views", path.join(__dirname, "front/views"));
app.set("view engine", "ejs");
(0, appConfig_1.initializeApp)(app);
const port = 8000;
(0, appConfig_1.createServer)(app, port);
