"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const models_1 = __importDefault(require("./models"));
models_1.default.on('error', console.error.bind(console, "MongoDB connection error."));
models_1.default.on('close', function () { console.log("DB connection is close"); });
models_1.default.once("open", function () { console.log("Connected to MongoDB database."); });
app.use("/api", routes_1.default);
const mainServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT;
const HOST = process.env.HOST;
mainServer.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map