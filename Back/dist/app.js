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
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var path = __importStar(require("path"));
var routes_1 = __importDefault(require("./routes/routes"));
var cors_1 = __importDefault(require("cors"));
var passportStrategy_1 = require("./Middlewares/SpotifyStrategyMiddlewares/passportStrategy");
var config_1 = require("./config/config");
passport_1.default.use(passportStrategy_1.spotifyStrategy);
passport_1.default.authenticate("spotify", { failureRedirect: "/auth/spotify" });
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
var app = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type, Authorization"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, express_session_1.default)({
    secret: config_1.SPOTIFY_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
}), express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, "..", "front", "public")));
app.set("views", path.join(__dirname, "front/views"));
app.set("view engine", "ejs");
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", routes_1.default);
app.use("/auth/spotify", routes_1.default);
app.use("/auth/spotify/callback", routes_1.default);
app.use("/profile", routes_1.default);
app.use("/favorites", routes_1.default);
app.use("/recommendations", routes_1.default);
app.post("/playlist/create", routes_1.default);
app.use("/logout", routes_1.default);
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
var port = 8000;
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
