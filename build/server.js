"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const routes_1 = __importDefault(require("./routes"));
const models_1 = __importDefault(require("./models"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:5000",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
}));
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.error(error);
    res.send({
        status: false,
        message: config_1.default.app.ENV === "dev" ? error.message : "server error",
        error: config_1.default.app.ENV === "dev" ? error : "",
    });
    return;
});
models_1.default.on("error", console.error.bind(console, "MongoDB connection error."));
models_1.default.on("close", function () {
    console.log("DB connection is close");
});
models_1.default.once("open", function () {
    console.log("Connected to MongoDB database.");
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api", routes_1.default);
const mainServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";
app.use((req, res, next) => {
    const error = new Error(`Path doesn't exist ${req.originalUrl}`);
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.error(error);
    res.send({
        status: false,
        message: config_1.default.app.ENV === "dev" ? error.message : "server error",
        error: config_1.default.app.ENV === "dev" ? error : "",
    });
    return;
});
mainServer.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map